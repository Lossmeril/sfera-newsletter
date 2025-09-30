"use client";

import { Section } from "@/types/newsletter";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ImageTextSection = Extract<Section, { type: "imageText" }>;

export default function ImageTextEditorForm({
  section,
  onChange,
}: {
  section: ImageTextSection;
  onChange: (patch: Partial<Section>) => void;
}) {
  return (
    <div className="space-y-4">
      {/* Nadpis */}
      <Input
        value={section.heading}
        onChange={(e) => onChange({ heading: e.target.value })}
        placeholder="Nadpis sekce"
      />

      {/* Obrázek */}
      <Input
        value={section.imageUrl}
        onChange={(e) => onChange({ imageUrl: e.target.value })}
        placeholder="URL obrázku"
      />

      {/* Text */}
      <Textarea
        value={section.body}
        rows={6}
        onChange={(e) => onChange({ body: e.target.value })}
        placeholder="Obsah (HTML nebo prostý text)"
      />

      {/* CTA */}
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
