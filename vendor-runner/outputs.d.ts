import { Format, Step } from '@engenty-wizards/shared/definition';
import { StepOutput } from '@engenty-wizards/shared/run';
import { SurfaceAction } from './surface';
export declare function Markdown({ text, className }: {
    text: string;
    className?: string;
}): import("react").JSX.Element;
/**
 * Generated HTML in a sandboxed frame: scripts run (scrubbers, tabs, animations) but in an opaque
 * origin with no network. The frame is mounted only once its HTML is there — Chrome paints a
 * sandboxed frame whose content changes after mount blank. `page` is the layout width; the frame
 * is scaled to fit.
 */
export declare function HtmlFrame({ src, page, height, fit, }: {
    src: string;
    /** Layout width in CSS px; null = the frame's own width. */
    page: number | null;
    height: number;
    /** Scale up as well as down, so a fixed-size widget fills the width. */
    fit?: boolean;
}): import("react").JSX.Element;
/**
 * The EU's label on media a model made or changed: the round "AI" alone, and on hover, on focus
 * and on a tap the long form — "AI GENERATED" or "AI MODIFIED". It lies over the picture in the
 * interface and is not part of the file; the file says the same in its metadata.
 */
export declare function AiBadge({ ai, className, }: {
    ai: "generated" | "edited" | undefined;
    /** Where on the media it sits; default: bottom left. "static" sets it into the text flow. */
    className?: string;
}): import("react").JSX.Element | null;
/** One step's result: the right preview for what it produced. */
export declare function OutputView({ base, step, output, editable, draft, onDraft, picked, onPick, onSurfaceAction, }: {
    /** `/api/runs/<id>` or `/api/shares/<token>` — where the output's files are served. */
    base: string;
    step: Step;
    output: StepOutput | null;
    editable?: boolean;
    draft?: string;
    onDraft?: (text: string) => void;
    /** Several results: the ones picked to be made again (from 0), and the tap that picks one. */
    picked?: number[];
    onPick?: (index: number) => void;
    /** A surface's buttons: "regenerate" where the review allows it. */
    onSurfaceAction?: (a: SurfaceAction) => void;
}): import("react").JSX.Element | null;
/** A download format as a person reads it. */
export declare const FORMAT_LABEL: Record<Format, string>;
export declare function DownloadButtons({ base, stepId, formats, title, }: {
    base: string;
    stepId: string;
    formats: Format[];
    /** Named in the share sheet. */
    title?: string;
}): import("react").JSX.Element;
