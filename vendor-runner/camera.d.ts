import { ReactNode } from 'react';
/**
 * A photo as small as a reader needs it: phone pictures are several megabytes, which is slow to
 * upload and more than a vision model takes.
 */
export declare function shrinkImage(file: File, max?: number): Promise<File>;
export declare function stamp(): string;
export type Facing = "environment" | "user";
/** Why there is no picture: the person (or the browser) said no, there is no camera, or it is in use. */
export type CameraError = "denied" | "missing" | "busy";
/**
 * The device's camera as a live picture, for as long as `active`. The browser asks for the
 * camera when this starts — callers open it from the person's tap. With `audio` the microphone
 * is asked for too; a refused microphone still gives a silent picture.
 */
export declare function useCameraStream(active: boolean, facing: Facing, audio?: boolean): {
    video: import('react').RefObject<HTMLVideoElement | null>;
    stream: MediaStream | null;
    error: CameraError | null;
    cameras: number;
    torchable: boolean;
    torch: boolean;
    setTorch: (on: boolean) => Promise<void>;
    mirrored: boolean;
};
/** The camera or the scanner: the whole screen on a phone, a centred sheet on a desk. */
export declare function MediaSheet({ open, onClose, label, children, }: {
    open: boolean;
    onClose: () => void;
    label: string;
    children: ReactNode;
}): import("react").JSX.Element;
export declare function SheetButton({ label, onClick, active, children, }: {
    label: string;
    onClick: () => void;
    active?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
/** The top row of a media sheet: close, what this is, and the camera's switches. */
export declare function SheetBar({ title, onClose, camera, onFlip, }: {
    title: string;
    onClose: () => void;
    camera: ReturnType<typeof useCameraStream>;
    onFlip: () => void;
}): import("react").JSX.Element;
/** The live picture with what to say while there is none: the browser is asking, or it said no. */
export declare function CameraStage({ camera, asking, children, actions, }: {
    camera: ReturnType<typeof useCameraStream>;
    /** One sentence shown while the browser asks for the camera. */
    asking: string;
    children?: ReactNode;
    /** Ways on when there is no camera. */
    actions?: ReactNode;
}): import("react").JSX.Element;
/** Whether this browser can record a clip itself; otherwise the phone's camera app does it. */
export declare const canRecordClips: boolean;
/**
 * Takes pictures with the device's camera: one, or several in a row (the pages of a document),
 * and short clips when the field takes video. Front and back camera, and the torch where the
 * device has one.
 */
export declare function CameraDialog({ open, multiple, video: allowVideo, onClose, onCapture, onNative, }: {
    open: boolean;
    multiple: boolean;
    /** Also record clips of up to half a minute. */
    video?: boolean;
    onClose: () => void;
    onCapture: (file: File) => Promise<void> | void;
    /** Opens the phone's own camera app instead — the way on when the browser has no camera for us. */
    onNative?: () => void;
}): import("react").JSX.Element;
export declare function SheetAction({ onClick, quiet, children, }: {
    onClick: () => void;
    quiet?: boolean;
    children: ReactNode;
}): import("react").JSX.Element;
