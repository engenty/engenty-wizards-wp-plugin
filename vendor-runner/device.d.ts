/** A finger as the main pointer: a phone or a tablet. */
export declare const isTouch: boolean;
/** The camera, the microphone and the position only exist on https (and localhost). */
export declare const canUseMedia: boolean;
/**
 * Keeps `--kb` on the root: how much of the page the on-screen keyboard covers. iOS lays the
 * keyboard over the page without resizing it, so a bar stuck to the bottom would hide behind it.
 */
export declare function useKeyboardInset(): void;
/**
 * Keeps the screen on while `active` — a phone that dims and locks mid-step freezes the page.
 * The lock ends whenever the page is hidden and is taken again when the person comes back.
 */
export declare function useWakeLock(active: boolean): boolean;
/**
 * `off` — not asked for. `on` — a notification when the page is in the background, a sound and a
 * buzz when it is open. `quiet` — asked for, but the browser shows no notifications for this
 * page (blocked, or a phone browser without them): only sound and buzz while the page is open.
 */
export type NotifyState = "off" | "on" | "quiet";
export declare function useNotifyState(): NotifyState;
/** Whether the browser has blocked notifications for this page (the person can undo it there). */
export declare function notificationsBlocked(): boolean;
/**
 * The person asks to be told. Called from their tap: the browser's permission question and the
 * sound both need one.
 */
export declare function enableNotify(): Promise<NotifyState>;
export declare function disableNotify(): void;
/** Tells the person, in whatever way they agreed to and the device has. A no-op otherwise. */
export declare function signalPerson(message: {
    title: string;
    body: string;
    tag: string;
}): Promise<void>;
/** A share sheet that takes files: phones, and desktop Safari and Chrome. */
export declare function canShareFiles(): boolean;
