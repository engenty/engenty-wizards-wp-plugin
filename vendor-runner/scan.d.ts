interface ScanProps {
    open: boolean;
    onClose: () => void;
    onResult: (text: string) => void;
}
/** Reads a QR code or barcode with the camera — or from a photo, when there is no camera. */
export declare function ScanDialog(props: ScanProps): import("react").JSX.Element;
export {};
