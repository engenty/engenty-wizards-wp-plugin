import { ValidationIssue, WizardDefinition } from '@engenty/wizards-shared/definition';
import { StandaloneFit, standaloneEntry } from '@engenty/wizards-shared/fit';
/**
 * The check a host runs on a `.wizard` package before it keeps it: the definition read, its
 * shape checked, and whether it runs on its own (packages/shared/src/fit.ts). The WordPress
 * plugin's import runs this in the browser; the studio computes the same on its server.
 */
export { PACKAGE_EXTENSION, PACKAGE_MIME } from '@engenty/wizards-shared/wizard-package';
export interface PackageFile {
    path: string;
    data: Uint8Array;
    mime: string;
}
export interface CheckedPackage {
    definition: WizardDefinition;
    files: PackageFile[];
    /** What the validator has to say: an issue with a step blocks the import. */
    issues: ValidationIssue[];
    fit: StandaloneFit;
}
export declare class PackageError extends Error {
    readonly issues: ValidationIssue[];
    constructor(message: string, issues?: ValidationIssue[]);
}
export declare function mimeOf(path: string): string;
/** Reads the package's bytes: the manifest and the workspace files under `files/`. */
export declare function readPackage(data: Uint8Array): {
    definition: unknown;
    files: PackageFile[];
};
/** The package checked: a definition this app reads, its workspace, and whether it runs on its own. */
export declare function checkPackage(data: Uint8Array): CheckedPackage;
export { type Need, type StepNeed, standaloneFit } from '@engenty/wizards-shared/fit';
export { type StandaloneFit, standaloneEntry };
