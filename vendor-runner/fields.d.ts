import { Field } from '@engenty-wizards/shared/definition';
import { ClosedChoice, RunView } from '@engenty-wizards/shared/run';
export type Values = Record<string, unknown>;
/**
 * What the keyboard should offer for a short text: a label that asks for a phone number gets the
 * number pad, a name gets the person's own from autofill. Guessed from the field's id and label.
 */
export declare function textHints(field: Field): React.InputHTMLAttributes<HTMLInputElement>;
export declare function FieldInput({ field, value, values, runId, view, onChange, onBusy, error, closed, }: {
    field: Field;
    value: unknown;
    values: Values;
    runId: string;
    /** Answers that lead to a step this app has no model for: shown, not to be picked. */
    closed?: ClosedChoice;
    /** The run as the server sees it: connections, stored lists and card choices come from there. */
    view?: Pick<RunView, "connections" | "lists" | "cards">;
    onChange: (v: unknown) => void;
    /** The field is uploading or recording: the page waits with going on. */
    onBusy?: (busy: boolean) => void;
    error?: string;
}): import("react").JSX.Element;
