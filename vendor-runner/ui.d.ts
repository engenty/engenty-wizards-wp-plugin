import { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
export declare function cn(...parts: (string | false | null | undefined)[]): string;
type Variant = "primary" | "secondary" | "ghost" | "quiet" | "danger";
export declare const Button: import('react').ForwardRefExoticComponent<ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: Variant;
    size?: "sm" | "md" | "lg";
    busy?: boolean;
} & import('react').RefAttributes<HTMLButtonElement>>;
export declare function IconButton({ label, className, children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & {
    label: string;
}): import("react").JSX.Element;
export declare const Input: import('react').ForwardRefExoticComponent<InputHTMLAttributes<HTMLInputElement> & import('react').RefAttributes<HTMLInputElement>>;
/** The native colour picker as a swatch; its chip sits concentric in the frame. */
export declare function Swatch(props: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">): import("react").JSX.Element;
/** A textarea that grows with its content. */
export declare const Textarea: import('react').ForwardRefExoticComponent<TextareaHTMLAttributes<HTMLTextAreaElement> & {
    minRows?: number;
    maxRows?: number;
} & import('react').RefAttributes<HTMLTextAreaElement>>;
export declare function Select({ value, onChange, options, className, placeholder, }: {
    value: string;
    onChange: (v: string) => void;
    options: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
    className?: string;
    placeholder?: string;
}): import("react").JSX.Element;
/** Pills for a handful of options — calmer than a dropdown. */
export declare function Segmented({ value, onChange, options, multi, disabled, label, }: {
    value: string | string[];
    onChange: (v: any) => void;
    options: string[];
    multi?: boolean;
    /** Options shown but not to be picked. */
    disabled?: string[];
    /** What an option shows; default: the option itself. */
    label?: (option: string) => string;
}): import("react").JSX.Element;
/**
 * A row of tabs as one button group, in the look of the theme switch: a thumb slides to the
 * pick and takes its width. The tabs' panels are the caller's.
 */
export declare function Tabs<T extends string>({ value, onChange, options, label, }: {
    value: T;
    onChange: (next: T) => void;
    options: {
        id: T;
        label: string;
    }[];
    /** The group's name for a screen reader. */
    label?: string;
}): import("react").JSX.Element;
export declare function Switch({ checked, onChange, label, disabled, }: {
    checked: boolean;
    onChange: (v: boolean) => void;
    label?: string;
    disabled?: boolean;
}): import("react").JSX.Element;
export declare function Label({ children, hint, required, }: {
    children: ReactNode;
    hint?: ReactNode;
    required?: boolean;
}): import("react").JSX.Element;
export declare function Spinner({ className }: {
    className?: string;
}): import("react").JSX.Element;
export declare function Card({ className, children, ...rest }: {
    className?: string;
    children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>): import("react").JSX.Element;
/** `icon`: in place of the live dot. `title`: what the chip means, on hover. */
export declare function Chip({ children, tone, icon, title, }: {
    children: ReactNode;
    tone?: "neutral" | "live" | "warn" | "ember";
    icon?: ReactNode;
    title?: string;
}): import("react").JSX.Element;
/**
 * A centred modal on the native <dialog>; on a phone it fills the screen, with no gutter. Its
 * height does not jump while it is open: a dialog
 * with tabs, folds or lists (`height="tall"`) stands at a height taken from the window and
 * scrolls inside; any other keeps the tallest height it has had, so switching to a shorter tab
 * or folding a section leaves it where it is.
 */
export declare function Dialog({ open, onClose, title, children, wide, bare, height, }: {
    open: boolean;
    onClose: () => void;
    title?: ReactNode;
    children: ReactNode;
    /** `"page"`: room for a document. */
    wide?: boolean | "page";
    /**
     * The children are the panel: the dialog itself draws no card, clips nothing (a close button
     * may sit on the panel's edge) and fills the screen of a phone.
     */
    bare?: boolean;
    /** `"tall"`: as tall as the window allows (up to 56 rem), whatever is in it. */
    height?: "auto" | "tall";
}): import("react").JSX.Element;
export declare function Empty({ children }: {
    children: ReactNode;
}): import("react").JSX.Element;
/** A sentence of the server with its web addresses as links, named by their host. */
export declare function LinkedText({ text }: {
    text: string;
}): (string | import("react").JSX.Element)[];
export {};
