'use client';

import { useEffect, useRef, useState } from 'react';
import { Move, Pause, Play, RotateCcw } from 'lucide-react';
import { ScrollTrigger } from '@/lib/gsap';
import styles from './DnaHelix.module.css';

const vertexSource = `
  attribute vec3 aPosition;
  attribute float aSize;
  attribute float aTone;
  uniform vec3 uRotation;
  uniform vec2 uResolution;
  uniform float uPixelRatio;
  varying float vTone;
  varying float vDepth;
  void main() {
    vec3 p = aPosition;
    vec3 c = cos(uRotation), s = sin(uRotation);
    p = vec3(p.x, p.y*c.x-p.z*s.x, p.y*s.x+p.z*c.x);
    p = vec3(p.x*c.y+p.z*s.y, p.y, -p.x*s.y+p.z*c.y);
    p = vec3(p.x*c.z-p.y*s.z, p.x*s.z+p.y*c.z, p.z);
    float perspective = 7.0 / (7.0 - p.z);
    float scale = min(uResolution.x / 3.7, uResolution.y / 5.9);
    gl_Position = vec4(p.xy * perspective * scale / uResolution * 2.0, -p.z / 10.0, 1.0);
    gl_PointSize = max(1.0, aSize * perspective * uPixelRatio * scale / 90.0);
    vTone = aTone;
    vDepth = clamp((p.z + 1.3) / 2.6, 0.0, 1.0);
  }
`;

const fragmentSource = `
  precision mediump float;
  uniform vec3 uBlue;
  uniform vec3 uSilver;
  uniform vec3 uInk;
  varying float vTone;
  varying float vDepth;
  void main() {
    vec2 p = gl_PointCoord * 2.0 - 1.0;
    float radius = dot(p, p);
    if (radius > 1.0) discard;
    vec3 color = vTone < 0.55 ? uBlue : (vTone < 0.9 ? uSilver : uInk);
    float light = 0.82 + 0.18 * sqrt(1.0 - radius);
    float alpha = (1.0 - smoothstep(0.35, 1.0, radius)) * mix(0.16, 0.6, vDepth);
    gl_FragColor = vec4(color * light, alpha);
  }
`;

// Seeded geometry stays identical across remounts. Each point occupies a real
// 3D tube around a backbone or a base pair, rather than a flat helix outline.
function makeParticles() {
  let seed = 42;
  const random = () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const points: number[] = [];
  const add = (x: number, y: number, z: number) => {
    const bead = random() > 0.975;
    points.push(x, y, z, bead ? 4 + random() * 4 : 0.65 + random() * 1.35, random());
  };
  for (let strand = 0; strand < 2; strand++) {
    for (let i = 0; i < 8500; i++) {
      const t = random();
      const angle = t * Math.PI * 4.4 + strand * Math.PI;
      const around = random() * Math.PI * 2;
      const radius = 0.145 * Math.sqrt(random());
      // Local normal/binormal of the helical backbone.
      const radial = 0.76 + Math.cos(around) * radius;
      const tangent = Math.sin(around) * radius;
      add(Math.cos(angle) * radial - Math.sin(angle) * tangent * 0.4,
        (t - 0.5) * 4.65 + tangent * 0.916,
        Math.sin(angle) * radial + Math.cos(angle) * tangent * 0.4);
    }
  }
  for (let rung = 0; rung < 12; rung++) {
    const t = (rung + 0.5) / 12;
    const angle = t * Math.PI * 4.4;
    for (let i = 0; i < 480; i++) {
      const along = (random() * 2 - 1) * 0.76;
      const around = random() * Math.PI * 2;
      const radius = 0.065 * Math.sqrt(random());
      add(Math.cos(angle) * along - Math.sin(angle) * Math.cos(around) * radius,
        (t - 0.5) * 4.65 + Math.sin(around) * radius,
        Math.sin(angle) * along + Math.cos(angle) * Math.cos(around) * radius);
    }
  }
  return new Float32Array(points);
}

function createRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' });
  if (!gl) return null;
  const shaders: WebGLShader[] = [];
  const program = gl.createProgram();
  const buffer = gl.createBuffer();
  const dispose = () => {
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    shaders.forEach(shader => gl.deleteShader(shader));
  };
  if (!program || !buffer) { dispose(); return null; }
  for (const [type, source] of [[gl.VERTEX_SHADER, vertexSource], [gl.FRAGMENT_SHADER, fragmentSource]] as const) {
    const shader = gl.createShader(type);
    if (!shader) { dispose(); return null; }
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  const points = makeParticles();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, points, gl.STATIC_DRAW);
  for (const [name, size, offset] of [['aPosition', 3, 0], ['aSize', 1, 12], ['aTone', 1, 16]] as const) {
    const location = gl.getAttribLocation(program, name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, size, gl.FLOAT, false, 20, offset);
  }
  gl.enable(gl.BLEND);
  // Additive colour so overlapping particles glow on the dark stage; alpha still
  // accumulates normally for the browser's premultiplied canvas composite.
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  const rotation = gl.getUniformLocation(program, 'uRotation');
  const resolution = gl.getUniformLocation(program, 'uResolution');
  const pixelRatio = gl.getUniformLocation(program, 'uPixelRatio');
  const palette = () => {
    const css = getComputedStyle(canvas);
    for (const [uniform, token] of [['uBlue', '--helix-a'], ['uSilver', '--helix-b'], ['uInk', '--helix-c']] as const) {
      const hex = css.getPropertyValue(token).trim().replace('#', '');
      const value = parseInt(hex, 16);
      gl.uniform3f(gl.getUniformLocation(program, uniform), (value >> 16 & 255) / 255, (value >> 8 & 255) / 255, (value & 255) / 255);
    }
  };
  palette();
  return {
    dispose, palette,
    draw(x: number, y: number) {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth, height = canvas.clientHeight;
      if (!width || !height) return;
      const w = Math.round(width * ratio), h = Math.round(height * ratio);
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
      gl.viewport(0, 0, w, h);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform3f(rotation, x, y, -0.15);
      gl.uniform2f(resolution, width, height);
      gl.uniform1f(pixelRatio, ratio);
      gl.drawArrays(gl.POINTS, 0, points.length / 5);
    },
  };
}

export default function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const motion = useRef({ x: 0.12, y: 0.35, hoverX: 0, hoverY: 0, dragging: false, lastX: 0, lastY: 0, pointerId: -1, paused: false });
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [contextVersion, setContextVersion] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = createRenderer(canvas);
    if (!renderer) return;
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduced = media.matches;
    let visible = true;
    let frame = 0;
    let previous = 0;
    let displayedX = motion.current.x, displayedY = motion.current.y;
    let dirty = true;
    let initialized = false;
    let contextLost = false;
    const draw = () => renderer.draw(displayedX, displayedY);
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || contextLost) return;
      if (!initialized) {
        initialized = true;
        setReady(true);
        setPaused(motion.current.paused);
      }
      const elapsed = previous ? Math.min((time - previous) / 1000, 0.05) : 0;
      previous = time;
      const state = motion.current;
      const animate = !state.paused;
      if (animate && !state.dragging) state.y += elapsed * 0.16;
      const targetX = state.x + (animate && !reduced ? state.hoverX : 0);
      const targetY = state.y + (animate && !reduced ? state.hoverY : 0);
      const moving = Math.abs(targetX - displayedX) + Math.abs(targetY - displayedY) > 0.0001;
      if (animate || moving || dirty) {
        displayedX += (targetX - displayedX) * (reduced ? 1 : 0.12);
        displayedY += (targetY - displayedY) * (reduced ? 1 : 0.12);
        draw();
        dirty = false;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => { if (!frame && visible && !document.hidden && !contextLost) { previous = 0; frame = requestAnimationFrame(tick); } };
    const stop = () => { cancelAnimationFrame(frame); frame = 0; };
    const resize = new ResizeObserver(() => { dirty = true; start(); });
    resize.observe(canvas);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) start(); else stop(); });
    intersection.observe(canvas);
    const visibility = () => { if (document.hidden) stop(); else start(); };
    // Scrolling the page turns the helix: each pixel scrolled adds a little rotation.
    // ScrollTrigger reports the position on the same tick as the smooth scroller.
    let lastScroll = 0;
    const spin = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onRefresh: self => { lastScroll = self.scroll(); },
      onUpdate: self => {
        const position = self.scroll();
        const delta = position - lastScroll;
        lastScroll = position;
        if (reduced || motion.current.paused || motion.current.dragging) return;
        motion.current.y += Math.max(-120, Math.min(120, delta)) * 0.0022;
      },
    });
    const preference = () => { reduced = media.matches; motion.current.paused = reduced; setPaused(reduced); dirty = true; };
    const theme = new MutationObserver(() => { renderer.palette(); dirty = true; });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] });
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; stop(); setReady(false); };
    const restored = () => setContextVersion(version => version + 1);
    canvas.addEventListener('webglcontextlost', lost);
    canvas.addEventListener('webglcontextrestored', restored);
    document.addEventListener('visibilitychange', visibility);
    media.addEventListener('change', preference);
    if (reduced) motion.current.paused = true;
    draw();
    start();
    return () => {
      stop(); resize.disconnect(); intersection.disconnect(); theme.disconnect(); renderer.dispose();
      document.removeEventListener('visibilitychange', visibility);
      spin.kill();
      media.removeEventListener('change', preference);
      canvas.removeEventListener('webglcontextlost', lost);
      canvas.removeEventListener('webglcontextrestored', restored);
    };
  }, [contextVersion]);

  const togglePause = () => { motion.current.paused = !motion.current.paused; setPaused(motion.current.paused); };
  const reset = () => { Object.assign(motion.current, { x: 0.12, y: 0.35, hoverX: 0, hoverY: 0 }); };

  return (
    <figure className={styles.figure} aria-label="Interactive three-dimensional DNA double helix">
      <div className={styles.stage}>
        {!ready && <svg className={styles.fallback} viewBox="0 0 320 480" role="img" aria-label="DNA double helix">
          {Array.from({ length: 13 }, (_, i) => {
            const y = 40 + i * 33.3, x = 160 + Math.sin(i / 12 * Math.PI * 4) * 70;
            return <line key={i} x1={x} y1={y} x2={320 - x} y2={y} />;
          })}
          {[0, Math.PI].map(phase => <polyline key={phase} points={Array.from({ length: 161 }, (_, i) => `${160 + Math.sin(i / 160 * Math.PI * 4 + phase) * 70},${40 + i * 2.5}`).join(' ')} />)}
        </svg>}
        <canvas ref={canvasRef} className={styles.canvas} tabIndex={ready ? 0 : -1}
          role="img" aria-label="Interactive 3D DNA. Drag or use arrow keys to rotate. Space to pause. Home to reset."
          aria-describedby="dna-instructions"
          onPointerDown={event => {
            if (!ready || !event.isPrimary || event.button !== 0) return;
            event.currentTarget.setPointerCapture(event.pointerId);
            Object.assign(motion.current, { dragging: true, lastX: event.clientX, lastY: event.clientY, pointerId: event.pointerId });
          }}
          onPointerMove={event => {
            const state = motion.current;
            if (state.dragging && event.pointerId === state.pointerId) {
              state.y += (event.clientX - state.lastX) * 0.008;
              state.x = Math.max(-0.65, Math.min(0.65, state.x + (event.clientY - state.lastY) * 0.005));
              state.lastX = event.clientX; state.lastY = event.clientY;
            } else if (event.pointerType === 'mouse') {
              const rect = event.currentTarget.getBoundingClientRect();
              state.hoverY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.3;
              state.hoverX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.16;
            }
          }}
          onPointerUp={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
          onLostPointerCapture={() => { motion.current.dragging = false; }}
          onPointerCancel={() => { motion.current.dragging = false; }}
          onPointerLeave={() => { motion.current.hoverX = 0; motion.current.hoverY = 0; }}
          onKeyDown={event => {
            if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' ', 'Home'].includes(event.key)) return;
            event.preventDefault();
            if (event.key === ' ') togglePause();
            if (event.key === 'Home') reset();
            if (event.key === 'ArrowLeft') motion.current.y -= 0.18;
            if (event.key === 'ArrowRight') motion.current.y += 0.18;
            if (event.key === 'ArrowUp') motion.current.x = Math.max(-0.65, motion.current.x - 0.12);
            if (event.key === 'ArrowDown') motion.current.x = Math.min(0.65, motion.current.x + 0.12);
          }} />
      </div>
      <figcaption className={styles.caption}>
        <span id="dna-instructions" className={styles.hint}><Move size={14} aria-hidden="true" />{ready ? 'Drag to explore' : 'The code of life'}</span>
        <div className={styles.controls}>
          <button type="button" onClick={togglePause} disabled={!ready} aria-label={paused ? 'Play DNA rotation' : 'Pause DNA rotation'} aria-pressed={paused}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
          <button type="button" onClick={reset} disabled={!ready} aria-label="Reset DNA view"><RotateCcw size={16} aria-hidden="true" /></button>
        </div>
      </figcaption>
    </figure>
  );
}
