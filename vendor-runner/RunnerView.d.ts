import { RunView } from '@engenty-wizards/shared/run';
/**
 * A run as the runner drives it: the view, and the commands a person can give. `useRun` in the
 * studio (a server-sent stream), `useLocalRun` in the WordPress plugin (one request per step).
 */
export interface RunSource {
    view: RunView | null;
    notFound: boolean;
    error: string | null;
    busy: boolean;
    fieldErrors: Record<string, string>;
    submitPage(stepId: string, values: Record<string, unknown>): Promise<boolean>;
    accept(stepId: string, edits?: Record<string, string>): Promise<boolean>;
    regenerate(stepId: string, target: string, note: string, items?: number[]): Promise<boolean>;
    back(): Promise<boolean>;
    retry(): Promise<boolean>;
}
export declare function RunnerBody({ run, compact, onRestart, onView, stickyProgress, }: {
    run: RunSource;
    compact?: boolean;
    onRestart?: () => void;
    onView?: (view: RunView | null) => void;
    /** In a box of its own (an AI app's widget): the progress stays on top while the page scrolls. */
    stickyProgress?: boolean;
}): import("react").JSX.Element;
