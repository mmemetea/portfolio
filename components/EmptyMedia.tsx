import { ImageOff } from "lucide-react";

/** The one "no media yet" treatment — a quiet tinted field with icon and
 *  label in secondary ink. Legible by design: on an evidence-first site the
 *  "receipt pending" state must be as readable as the evidence itself. */
export default function EmptyMedia({ label = "No images yet" }: { label?: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
      <ImageOff className="h-5 w-5 text-secondary" aria-hidden="true" />
      <p className="text-xs font-medium text-secondary">{label}</p>
    </div>
  );
}
