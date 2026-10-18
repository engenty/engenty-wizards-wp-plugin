import { AgentStep } from '@engenty-wizards/shared/definition';
import { StepOutput } from '@engenty-wizards/shared/run';
import { ObjectShape } from '@engenty-wizards/shared/shape';
import { ReactNode } from 'react';
export type DataMode = "view" | "edit" | "json";
type Entry = Record<string, unknown>;
/**
 * The data of one step: a bar with the parts to jump to and Ansicht · Bearbeiten · JSON, then
 * the parts. `mode` and `onMode` hold the bar's choice from outside where given.
 */
export declare function DataEditor({ shape, value, onChange, mode: held, onMode, modes, start, }: {
    shape: ObjectShape;
    value: Entry;
    onChange?: (next: Entry) => void;
    mode?: DataMode;
    onMode?: (mode: DataMode) => void;
    /** The modes offered; without `onChange` there is no edit. */
    modes?: DataMode[];
    /** The mode it opens in. */
    start?: DataMode;
}): import("react").JSX.Element;
/** A ⋮ menu of a step's output: a few entries for whoever builds or keeps the wizard. */
export declare function DataMenu({ items, }: {
    items: {
        label: string;
        icon: ReactNode;
        onClick: () => void;
    }[];
}): import("react").JSX.Element;
/** The JSON Schema (draft 2020-12) a json step's data has: shown, copied or downloaded. */
export declare function JsonSchemaDialog({ shape, title, open, onClose, }: {
    shape: ObjectShape;
    title: string;
    open: boolean;
    onClose: () => void;
}): import("react").JSX.Element;
/** A json step whose data can be edited by its shape: not one run per entry, not a tool's answer. */
export declare function editableData(step: {
    type: string;
}): step is AgentStep;
/**
 * A json step's output in the studio: its ⋮ menu (the data to view and edit, the JSON Schema)
 * goes into the header, the data takes the place of the view while it is open. Saved edits go
 * to the run like a review's do, checked against the step's schema.
 */
export declare function StudioData({ runId, step, output, header, children, }: {
    runId: string;
    step: AgentStep;
    output: StepOutput;
    header: (menu: ReactNode) => ReactNode;
    children: ReactNode;
}): import("react").JSX.Element;
export {};
