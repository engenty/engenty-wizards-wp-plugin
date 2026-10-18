import { Lang } from '@engenty-wizards/shared/definition';
import { RunNote } from '@engenty-wizards/shared/run';
import { RUNNER_TEXTS, RunnerKey } from '@engenty-wizards/shared/runner-texts';
import { TextTable } from '@engenty-wizards/shared/texts';
export type { Lang };
/**
 * What the runner says to the person running a wizard: its table lives in shared/runner-texts,
 * where the runtime reads it too (a language outside `LANGS` is translated from its English).
 */
export { RUNNER_TEXTS, type RunnerKey };
/** The language the runner speaks: set by the host (`configureRunner`, `setRunnerLang`). */
export declare let lang: Lang;
/**
 * A language outside `LANGS`, translated on request (`GET /api/public/texts/:lang`): its lines
 * win over `lang`'s, and what it lacks is said in English. Null: the runner speaks `lang`.
 */
export interface RunnerTable {
    lang: string;
    runner: TextTable;
    notes: TextTable;
}
export declare function setRunnerLang(next: Lang): void;
/** Speaks a translated language from its table, or `lang` again with null. */
export declare function setRunnerTable(next: RunnerTable | null): void;
/** The translated table in effect, for a host that shows the runner's words itself. */
export declare function runnerTable(): RunnerTable | null;
/** The language the person reads, by its code: the translated one, else `lang`. */
export declare function runnerLangCode(): string;
/** The language, for a component that must render again when it changes. */
export declare function useRunnerLang(): string;
/** What a run reports, in the language the person reads: its note where it has one. */
export declare function eventText(ev: {
    message: string;
    note?: RunNote | null;
}): string;
export declare function setChoiceLabels(next: Record<string, string> | null | undefined): void;
/** What a choice shows: its translated label, else its value. */
export declare function choiceLabel(value: string): string;
/** A string in the runner's language: its plural form by `{count}` or `{n}`, its gaps filled. */
export declare function t(key: RunnerKey, vars?: Record<string, string | number>): string;
