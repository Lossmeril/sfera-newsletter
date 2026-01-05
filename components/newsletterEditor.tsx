// components/NewsletterEditor.tsx
"use client";

import { useState } from "react";
import { Newsletter, Section } from "@/types/newsletter";
import Sidebar from "./sidebar";
import SectionEditor from "./sectionEditor";
import PreviewPane from "./previewPane";
import { v4 as uuid } from "uuid";
import GlobalEditorForm from "./editors/globalEditor";

const initialNewsletter: Newsletter = {
  id: uuid(),
  subject: "Nový newsletter",
  issueTitle: "Sférický newsletter",
  issueDate: "Říjen 2025",
  sections: [],
  elements: [
    {
      image: "https://branding.sferagrafika.eu/assets/SOS_motiv1_high.png",
      bgColor: "#fac5aa",
    },
    {
      image:
        "https://branding.sferagrafika.eu/assets/Přírodopis_motiv3_high.png",
      bgColor: "#fffa9e",
    },
    {
      image: "https://branding.sferagrafika.eu/assets/Hřiště_motiv2_high.png",
      bgColor: "#e1eebf",
    },
    {
      image: "https://branding.sferagrafika.eu/assets/Fyzika_motiv5_high.png",
      bgColor: "",
    },
    { image: "", bgColor: "" },
    { image: "", bgColor: "" },
    { image: "", bgColor: "" },
  ],
};

export default function NewsletterEditor() {
  const [newsletter, setNewsletter] = useState<Newsletter>(initialNewsletter);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDownload = () => {
    const json = JSON.stringify(newsletter, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${newsletter.issueTitle}.sferanewsletter`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Upload & validate
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Quick validation by extension
    if (!file.name.endsWith(".sferanewsletter")) {
      alert("Neplatný soubor. Očekáván soubor s příponou .sferanewsletter");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = JSON.parse(e.target?.result as string);
        setNewsletter(json);
      } catch (err) {
        console.error("Neplatný soubor", err);
        alert("Soubor není platný.");
      }
    };
    reader.readAsText(file);
  };

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

  const removeSection = (id: string) => {
    setNewsletter({
      ...newsletter,
      sections: newsletter.sections.filter((s) => s.id !== id),
    });
    if (selectedId === id) {
      setSelectedId(null);
    }
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const index = newsletter.sections.findIndex((s) => s.id === id);
    if (index === -1) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newsletter.sections.length) return;

    const newSections = [...newsletter.sections];
    const [movedSection] = newSections.splice(index, 1);
    newSections.splice(newIndex, 0, movedSection);

    setNewsletter({ ...newsletter, sections: newSections });
  };

  return (
    <div className="grid grid-cols-[250px_1fr_1fr] h-screen">
      <Sidebar
        sections={newsletter.sections}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onAdd={addSection}
        moveSection={moveSection}
        removeSection={removeSection}
        newsletter={newsletter}
        onChange={(patch) => setNewsletter((prev) => ({ ...prev, ...patch }))}
        onDownload={handleDownload}
        onUpload={handleUpload}
      />
      <div className="px-4 py-2 overflow-y-auto border-r">
        <h2 className="font-bold mb-2">Editovat sekci</h2>
        {selectedId ? (
          <SectionEditor
            section={newsletter.sections.find((s) => s.id === selectedId)!}
            onChange={(patch) => updateSection(selectedId, patch)}
          />
        ) : (
          <GlobalEditorForm
            newsletter={newsletter}
            onChange={(patch) =>
              setNewsletter((prev) => ({ ...prev, ...patch }))
            }
          />
        )}
      </div>
      <PreviewPane newsletter={newsletter} />
    </div>
  );
}
