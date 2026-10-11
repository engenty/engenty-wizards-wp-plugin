import { ReactNode } from 'react';
/**
 * The wizard's browser, live: a picture from the run that changes as the page does. Watching,
 * it shows over the page what the wizard just did; driving, the person clicks, scrolls and
 * types in it — what they type goes into the page and no model reads it back.
 */
export declare function LiveBrowser({ runId, driving, caption, action, hint, className, onBroken, }: {
    runId: string;
    driving: boolean;
    /** What the wizard just did, over the page while watching. */
    caption?: string;
    /** A button in the corner: take over, hand back. */
    action?: ReactNode;
    /** A line over the controls while driving. */
    hint?: string;
    className?: string;
    /** The stream broke off: the run let the browser go. */
    onBroken?: () => void;
}): import("react").JSX.Element;
