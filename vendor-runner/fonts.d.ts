import { RunFontFace } from '@engenty/wizards-shared/run';
/**
 * Loads a brand font, once, from `url`: our copy of its file, or the space's website (the file,
 * or a stylesheet that holds it). When the website does not answer, does not allow other sites
 * to use the font, or has no font of that name, `fallback` loads the shipped font of its kind:
 * the page's font stack names it right after the brand font.
 */
export declare function loadBrandFace(face: RunFontFace, url: string, fallback: () => void): void;
