import { LocationValue } from '@engenty/wizards-shared/definition';
/**
 * Where the person is: the device's position on their tap, with how exact it is, and an address
 * line they can correct — or type alone, when the device gives no position.
 */
export declare function LocationField({ value, runId, placeholder, onChange, onBusy, }: {
    value: unknown;
    runId: string;
    placeholder?: string;
    onChange: (v: LocationValue | undefined) => void;
    onBusy?: (busy: boolean) => void;
}): import("react").JSX.Element;
