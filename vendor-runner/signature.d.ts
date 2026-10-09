/** A signature drawn with the finger, a pen or the mouse; kept as a picture. */
export declare function SignatureField({ label, value, runId, onChange, }: {
    label: string;
    value: unknown;
    runId: string;
    onChange: (v: string | undefined) => void;
}): import("react").JSX.Element;
