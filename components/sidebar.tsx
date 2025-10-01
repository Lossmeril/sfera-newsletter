// components/Sidebar.tsx
"use client";

import { Section } from "@/types/newsletter";
import { Button } from "@/components/ui/button";

type Props = {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (type: Section["type"]) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  removeSection: (id: string) => void;
};

export default function Sidebar({
  sections,
  selectedId,
  onSelect,
  onAdd,
  moveSection,
  removeSection,
}: Props) {
  return (
    <div className="border-r p-2 space-y-2">
      <h2 className="font-bold mb-2">Sekce</h2>
      {sections.map((s) => (
        <div
          key={s.id}
          className="flex flex-col items-start rounded-lg overflow-hidden border"
        >
          <div
            key={s.id}
            className={`cursor-pointer p-1 w-full ${
              s.id === selectedId
                ? "bg-black text-gray-100"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onSelect(s.id)}
          >
            <strong>
              {(() => {
                switch (s.type) {
                  case "text":
                    return "Text";
                  case "workshops":
                    return "Víkendovky";
                  case "imageText":
                    return "Obrázek + text";
                  default:
                    return "";
                }
              })()}
            </strong>
            : {s.heading}
          </div>
          <div className="grid grid-cols-3 space-x-1 w-full bg-gray-200 gap-1 p-1">
            <a onClick={() => moveSection(s.id, "up")}>
              <div className="w-full bg-gray-300 hover:bg-gray-400 transition rounded-2xl font-bold grid place-items-center cursor-pointer">
                &uarr;
              </div>
            </a>
            <a onClick={() => moveSection(s.id, "down")}>
              <div className="w-full bg-gray-300 hover:bg-gray-400 transition rounded-2xl font-bold grid place-items-center cursor-pointer">
                &darr;
              </div>
            </a>
            <a onClick={() => removeSection(s.id)}>
              <div className="w-full bg-gray-300 hover:bg-red-400 transition rounded-2xl font-bold grid place-items-center cursor-pointer">
                &times;
              </div>
            </a>
          </div>
        </div>
      ))}

      <div className="flex flex-col pt-4 space-y-2">
        <h2 className="font-bold mb-2">Přidat novou sekci</h2>
        <Button variant="outline" size="sm" onClick={() => onAdd("text")}>
          Textový blok
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("workshops")}>
          Víkendovky
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("imageText")}>
          Blok s obrázkem a textem
        </Button>
      </div>
    </div>
  );
}
