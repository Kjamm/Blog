import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { Flip } from 'gsap/Flip';

// Registered once, here, so every client component imports the same configured instance.
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, ScrambleTextPlugin, Flip);

export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';

export { gsap, useGSAP, ScrollTrigger, SplitText, Flip };
