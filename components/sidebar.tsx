// components/Sidebar.tsx
"use client";

import { Section } from "@/types/newsletter";
import { Button } from "@/components/ui/button";

type Props = {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (type: Section["type"]) => void;
};

export default function Sidebar({
  sections,
  selectedId,
  onSelect,
  onAdd,
}: Props) {
  return (
    <div className="border-r p-2 space-y-2">
      <h2 className="font-bold mb-2">Sekce</h2>
      {sections.map((s) => (
        <div
          key={s.id}
          className={`cursor-pointer p-2 rounded ${
            s.id === selectedId ? "bg-black text-white" : "hover:bg-gray-100"
          }`}
          onClick={() => onSelect(s.id)}
        >
          {s.type} – {s.heading}
        </div>
      ))}

      <div className="pt-4 space-y-2">
        <Button variant="outline" size="sm" onClick={() => onAdd("text")}>
          + Text
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("workshops")}>
          + Víkendovky
        </Button>
        <Button variant="outline" size="sm" onClick={() => onAdd("imageText")}>
          + Obrázek+Text
        </Button>
      </div>
    </div>
  );
}
