import { Format, Step } from '@engenty/wizards-shared/definition';
import { StepOutput } from '@engenty/wizards-shared/run';
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
export declare function HtmlFrame({ src, page, height, fit, flow, state, onState, }: {
    src: string;
    /** Layout width in CSS px; null = the frame's own width. */
    page: number | null;
    height: number;
    /** Scale up as well as down, so a fixed-size widget fills the width. */
    fit?: boolean;
    /**
     * A widget laid out as part of the page: as wide as the page, as tall as its content says
     * (`height` until it does), never scaled. It may keep a state and share text.
     */
    flow?: boolean;
    /** What the widget kept last time (`wizard.state`). */
    state?: Record<string, unknown>;
    onState?: (state: Record<string, unknown>) => void;
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
export declare function OutputView({ base, step, output, editable, draft, onDraft, picked, onPick, onSurfaceAction, onView, }: {
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
    /** Keeps what the person did in the view (ticks, a widget's state) with the run. */
    onView?: (state: Record<string, unknown>) => void;
}): import("react").JSX.Element | null;
/** A download format as a person reads it. */
export declare const FORMAT_LABEL: Record<Format, string>;
export declare function DownloadButtons({ base, stepId, formats, title, step, output, foot, }: {
    base: string;
    stepId: string;
    formats: Format[];
    /** Named in the share sheet. */
    title?: string;
    /** The step and its output: on a standalone host a written output's PDF is made here. */
    step?: Step;
    output?: StepOutput;
    /** The foot of a PDF made here: the wizard, the date. */
    foot?: string;
}): import("react").JSX.Element;
