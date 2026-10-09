import { ShownList } from '@engenty-wizards/shared/run';
import { ConnectionView } from '@engenty-wizards/shared/store';
/** The person connects an account (their mailbox) to the wizard, or sees which one is connected. */
export declare function ConnectionField({ runId, connection, }: {
    runId: string;
    connection: ConnectionView | undefined;
}): import("react").JSX.Element | null;
/** One of the wizard's stored lists: read, or edited in place by the person it belongs to. */
export declare function ListTable({ runId, list, editable, }: {
    runId: string;
    list: ShownList;
    editable?: boolean;
}): import("react").JSX.Element;
/**
 * A list the person goes through row by row: the rows on the left, the row's kept file and its
 * cells on the right, and the answers of the list's status column as buttons. An answer saves
 * and moves on to the next open row.
 */
export declare function ListCheck({ runId, list }: {
    runId: string;
    list: ShownList;
}): import("react").JSX.Element;
export declare function ListDownloads({ runId, list }: {
    runId: string;
    list: ShownList;
}): import("react").JSX.Element;
/** Everything the wizard keeps for this person between runs, and the way to delete it. */
export declare function StoreButton({ runId }: {
    runId: string;
}): import("react").JSX.Element;
