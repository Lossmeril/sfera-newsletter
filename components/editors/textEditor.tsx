// components/editors/TextEditor.tsx
"use client";
import { Section } from "@/types/newsletter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TextEditorForm({
  section,
  onChange,
}: {
  section: Extract<Section, { type: "text" }>;
  onChange: (patch: Partial<Section>) => void;
}) {
  return (
    <div className="space-y-4">
      <Input
        value={section.heading}
        onChange={(e) => onChange({ heading: e.target.value })}
        placeholder="Nadpis"
      />
      <Textarea
        value={section.body}
        onChange={(e) => onChange({ body: e.target.value })}
        placeholder="Obsah..."
        rows={8}
      />
      <div className="flex gap-2">
        <Input
          placeholder="Text tlačítka"
          value={section.cta?.label || ""}
          onChange={(e) =>
            onChange({
              cta: {
                label: e.target.value,
                href: section.cta?.href ?? "",
              },
            })
          }
        />
        <Input
          placeholder="Odkaz"
          value={section.cta?.href || ""}
          onChange={(e) =>
            onChange({
              cta: {
                label: section.cta?.label ?? "",
                href: e.target.value,
              },
            })
          }
        />
      </div>
    </div>
  );
}
