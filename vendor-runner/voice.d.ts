import { AudioValue } from '@engenty/wizards-shared/definition';
/**
 * A voice note: recorded here with the microphone, or — where the browser cannot record — an
 * audio file from the phone's recorder. The recording is kept as an upload; what is said in it
 * is written down on the server before the next step reads it.
 */
export declare function VoiceField({ value, runId, onChange, onBusy, }: {
    value: unknown;
    runId: string;
    onChange: (v: AudioValue | undefined) => void;
    onBusy?: (busy: boolean) => void;
}): import("react").JSX.Element;
