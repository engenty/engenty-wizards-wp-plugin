import { PageStep } from '@engenty-wizards/shared/definition';
import { RunView } from '@engenty-wizards/shared/run';
import { Values } from './fields';
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
    accept(stepId: string, edits?: Record<string, string | Record<string, unknown>>): Promise<boolean>;
    regenerate(stepId: string, target: string, note: string, items?: number[]): Promise<boolean>;
    back(): Promise<boolean>;
    retry(): Promise<boolean>;
    /** A finished result's text in the language the run is read in (a translated wizard). */
    translateResult?(stepId: string): Promise<boolean>;
}
export declare function initialValues(step: PageStep, view: RunView): Values;
/**
 * Tells the person when a step that took a while is done, or when it needs them (a sign-in, a
 * confirmation) — if they asked for it. A page in the background also marks its title.
 */
export declare function useDoneSignal(view: RunView | null): void;
export declare function RunnerBody({ run, compact, onRestart, onView, stickyProgress, studio, }: {
    run: RunSource;
    compact?: boolean;
    /** In the studio: a json step's data can be viewed, edited and its JSON Schema read. */
    studio?: boolean;
    onRestart?: () => void;
    onView?: (view: RunView | null) => void;
    /** In a box of its own (an AI app's widget): the progress stays on top while the page scrolls. */
    stickyProgress?: boolean;
}): import("react").JSX.Element;
