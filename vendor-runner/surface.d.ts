import { Surface } from '@engenty-wizards/shared/surface';
/**
 * A surface drawn with the runner's own components: the catalog in shared/surface.ts, nothing
 * else. Unknown components render nothing; a prop that is not there shows empty.
 */
export type SurfaceAction = {
    action: "regenerate" | "open";
    target?: unknown;
};
export declare function SurfaceView({ surface, assetUrl, onAction, }: {
    surface: Surface;
    assetUrl: (id: string) => string;
    onAction?: (a: SurfaceAction) => void;
}): import("react").JSX.Element;
