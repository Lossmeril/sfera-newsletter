"use client";

import { Newsletter } from "@/types/newsletter";
import ElementSelector from "../ui/elementSelector";
import { useState } from "react";

export default function GlobalEditorForm({
  newsletter,
  onChange,
}: {
  newsletter: Newsletter;
  onChange: (patch: Partial<Newsletter>) => void;
}) {
  const [elements, setElements] = useState<
    { image: string; bgColor: string }[]
  >([
    { image: "", bgColor: "" },
    { image: "", bgColor: "" },
    { image: "", bgColor: "" },
    { image: "", bgColor: "" },
  ]);

  console.log("newsletter elements:", newsletter.elements);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4">
        {[0, 1, 2, 3].map((index) => (
          <ElementSelector
            key={index}
            label={`Prvek ${index + 1}`}
            imageUrl={elements[index].image}
            onSelect={(image) => {
              const newElements = [...elements];
              newElements[index] = { ...newElements[index], image };
              setElements(newElements);
              onChange({
                elements: newElements,
              });
            }}
            onColorSelect={(bgColor) => {
              const newElements = [...elements];
              newElements[index] = { ...newElements[index], bgColor };
              setElements(newElements);
              onChange({
                elements: newElements,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
}
