/** Tags render snake_case site-wide: lowercase, and any run of characters
 *  outside [a-z0-9+.#] becomes a single underscore. Tech-significant
 *  symbols stay — "C++" stays "c++", ".NET" stays ".net" — so names keep
 *  their meaning; everything else ("CAD/CAM (CATIA, Onshape)") collapses
 *  cleanly ("cad_cam_catia_onshape"). */
export function snakeCaseTag(tag: string): string {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9+.#]+/g, "_")
    .replace(/^_+|_+$/g, "");
}
