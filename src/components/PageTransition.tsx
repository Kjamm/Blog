import { ViewTransition } from 'react';

/**
 * Wraps a page so route changes cross-fade with a short rise.
 * Must be the outermost element a page returns: a wrapping DOM node would
 * suppress the enter/exit animation.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <ViewTransition enter="page-in" exit="page-out" default="none">
            {children}
        </ViewTransition>
    );
}
