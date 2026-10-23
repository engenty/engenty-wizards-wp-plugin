import { Surface } from '@engenty/wizards-shared/surface';
/**
 * A surface drawn with the runner's own components: the catalog in shared/surface.ts, nothing
 * else. Unknown components render nothing; a prop that is not there shows empty.
 */
export type SurfaceAction = {
    action: "regenerate" | "open";
    target?: unknown;
};
/** What the person did in a view that is kept with the run: a checklist's ticks, by component id. */
export type SurfaceState = Record<string, unknown>;
export declare function SurfaceView({ surface, assetUrl, onAction, initial, onState, }: {
    surface: Surface;
    assetUrl: (id: string) => string;
    onAction?: (a: SurfaceAction) => void;
    /** What the person did in the view last time (kept with the run). */
    initial?: SurfaceState;
    /** Keeps what the person did; without it, it lasts as long as the page. */
    onState?: (next: SurfaceState) => void;
}): import("react").JSX.Element;
