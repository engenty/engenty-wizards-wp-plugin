import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
/**
 * A written output as a PDF, made in the browser. A host whose server writes no PDF (the
 * WordPress plugin: PHP, no Chromium) still hands the visitor the file the result step
 * promised: pdfmake lays it out from a content tree — a Markdown text through marked's tokens,
 * a structured output as the result page shows it (label, value, list, table) — with Roboto
 * bundled, so German, Czech or Polish read as written. The library and its fonts weigh about
 * 1.5 MB and are loaded on the first click only; the content tree itself is small and pure.
 */
export interface Written {
    /** The step's title: the document's heading and the file's name. */
    title: string;
    /** A Markdown or plain text. */
    text?: string;
    /** A structured output; its keys are named by `label`. */
    json?: unknown;
    /** What a key of the structured output is called (the step's output fields). */
    label?: (key: string) => string;
    /** The line at the foot of every page: the wizard, the date. */
    foot?: string;
}
/** A Markdown text as content. */
export declare function markdownContent(text: string): Content[];
/** A structured output as the result page shows it: each key with its label, then its value. */
export declare function jsonContent(json: unknown, label?: (key: string) => string): Content[];
/** The document: A4, the title first, the body, a foot with the page number. */
export declare function pdfDocument(written: Written): TDocumentDefinitions;
/** The fonts in pdfmake's own file: Roboto in four cuts. */
export declare const ROBOTO: {
    Roboto: {
        normal: string;
        bold: string;
        italics: string;
        bolditalics: string;
    };
};
/** A title as a file name: what no file system refuses. */
export declare function fileName(title: string): string;
/** The written output as a PDF file. */
export declare function writePdf(written: Written): Promise<File>;
