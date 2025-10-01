// components/NewsletterEditor.tsx
"use client";

import { useState } from "react";
import { Newsletter, Section } from "@/types/newsletter";
import Sidebar from "./sidebar";
import SectionEditor from "./sectionEditor";
import PreviewPane from "./previewPane";
import { v4 as uuid } from "uuid";

const initialNewsletter: Newsletter = {
  id: uuid(),
  subject: "Nový newsletter",
  issueTitle: "Sférický newsletter",
  issueDate: "Říjen 2025",
  sections: [],
};

export default function NewsletterEditor() {
  const [newsletter, setNewsletter] = useState<Newsletter>(initialNewsletter);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const addSection = (type: Section["type"]) => {
    const newSection: Section =
      type === "text"
        ? { id: uuid(), type, heading: "Nová sekce", body: "" }
        : type === "workshops"
        ? { id: uuid(), type, heading: "Víkendovky", workshops: [] }
        : {
            id: uuid(),
            type,
            heading: "Obrázek + text",
            imageUrl: "",
            body: "",
          };
    setNewsletter({
      ...newsletter,
      sections: [...newsletter.sections, newSection],
    });
    setSelectedId(newSection.id);
  };

  const updateSection = (id: string, patch: Partial<Section>) => {
    setNewsletter({
      ...newsletter,
      sections: newsletter.sections.map((s) => {
        if (s.id !== id) return s;
        // Narrow the type of patch to match the section type
        switch (s.type) {
          case "text":
            return { ...s, ...(patch as Partial<typeof s>) };
          case "workshops":
            return { ...s, ...(patch as Partial<typeof s>) };
          case "imageText":
            return { ...s, ...(patch as Partial<typeof s>) };
          // Add other section types as needed
          default:
            return s;
        }
      }),
    });
  };

  return (
    <div className="grid grid-cols-[250px_1fr_1fr] h-screen">
      <Sidebar
        sections={newsletter.sections}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={addSection}
      />
      <div className="p-4 overflow-y-auto border-r">
        {selectedId ? (
          <SectionEditor
            section={newsletter.sections.find((s) => s.id === selectedId)!}
            onChange={(patch) => updateSection(selectedId, patch)}
          />
        ) : (
          <p className="text-gray-500">
            V newsletteru zatím není žádná sekce. Přidejte nějakou, abyste ji
            mohli upravovat :)
          </p>
        )}
      </div>
      <PreviewPane newsletter={newsletter} />
    </div>
  );
}
