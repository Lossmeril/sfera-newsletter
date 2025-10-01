// components/Sidebar.tsx
"use client";

import { Section } from "@/types/newsletter";
import { PiTextColumns } from "react-icons/pi";
import { CgCalendarDates } from "react-icons/cg";
import { FaRegImage } from "react-icons/fa6";

type Props = {
  sections: Section[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAdd: (type: Section["type"]) => void;
  moveSection: (id: string, direction: "up" | "down") => void;
  removeSection: (id: string) => void;
};

const AddButton = ({ text, icon }: { text: string; icon: React.ReactNode }) => (
  <div className="border p-4 rounded-md bg-gray-100 hover:bg-gray-200 aspect-square w-full flex flex-col gap-2 justify-center items-center text-center cursor-pointer leading-none text-xs text-gray-500">
    {icon}
    {text}
  </div>
);

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
      {sections.map((s, id) => (
        <div
          key={s.id}
          className="flex flex-col items-start rounded-lg overflow-hidden border"
        >
          <div
            key={s.id}
            className={`cursor-pointer p-1 w-full text-md flex flex-row flex-nowrap justify-start items-center ${
              s.id === selectedId
                ? "bg-[var(--grafika)] text-gray-100"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => onSelect(s.id)}
          >
            <strong>
              {s.type === "text" ? (
                <PiTextColumns size={20} />
              ) : s.type === "workshops" ? (
                <CgCalendarDates size={20} />
              ) : s.type === "imageText" ? (
                <FaRegImage size={20} />
              ) : (
                "Unknown"
              )}
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
        <div className="grid grid-cols-2 gap-2">
          <a onClick={() => onAdd("text")} className="">
            <AddButton
              text="Textová sekce"
              icon={<PiTextColumns size={40} />}
            />
          </a>
          <a onClick={() => onAdd("workshops")} className="">
            <AddButton
              text="Blok s víkendovkami"
              icon={<CgCalendarDates size={38} />}
            />
          </a>
          <a onClick={() => onAdd("imageText")} className="">
            <AddButton
              text="Blok s obrázkem a textem"
              icon={<FaRegImage size={32} />}
            />
          </a>
        </div>
      </div>
    </div>
  );
}
