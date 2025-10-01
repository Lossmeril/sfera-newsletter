"use client";

import { Section } from "@/types/newsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid } from "uuid";
import { facilities } from "@/data/facilities";

type WorkshopsSection = Extract<Section, { type: "workshops" }>;

export default function WorkshopsEditorForm({
  section,
  onChange,
}: {
  section: WorkshopsSection;
  onChange: (patch: Partial<Section>) => void;
}) {
  const updateWorkshop = (
    workshopId: string,
    patch: Partial<WorkshopsSection["workshops"][0]>
  ) => {
    onChange({
      workshops: section.workshops.map((w) =>
        w.id === workshopId ? { ...w, ...patch } : w
      ),
    });
  };

  const addWorkshop = () => {
    const newWorkshop = {
      id: uuid(),
      place: facilities[0],
      title: "Nový workshop",
      description: "",
      time: "",
    };
    onChange({ workshops: [...section.workshops, newWorkshop] });
  };

  const removeWorkshop = (workshopId: string) => {
    onChange({
      workshops: section.workshops.filter((w) => w.id !== workshopId),
    });
  };

  return (
    <div className="space-y-4">
      {/* Section heading */}
      <Input
        value={section.heading}
        onChange={(e) => onChange({ heading: e.target.value })}
        placeholder="Nadpis sekce (např. Víkendovky)"
      />

      {/* Workshops */}
      {section.workshops.map((workshop) => (
        <div key={workshop.id} className="border rounded p-3 space-y-2">
          <div className="flex justify-between items-center gap-2">
            <Input
              value={workshop.title}
              onChange={(e) =>
                updateWorkshop(workshop.id, { title: e.target.value })
              }
              placeholder="Název workshopu"
            />

            <a
              className="bg-[var(--sos)] text-white px-4 py-2 rounded-md hover:bg-red-700 cursor-pointer text-sm font-bold"
              onClick={() => removeWorkshop(workshop.id)}
            >
              <div>Smazat</div>
            </a>
          </div>

          <div className="w-full">
            <select
              onChange={(e) =>
                updateWorkshop(workshop.id, {
                  place: facilities[parseInt(e.target.value)],
                })
              }
              className={`border-1 px-3 py-2 mb-2 rounded-md w-full text-sm`}
            >
              {facilities.map((facility, index) => (
                <option value={index} key={facility.name}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <Textarea
            value={workshop.description}
            rows={3}
            onChange={(e) =>
              updateWorkshop(workshop.id, { description: e.target.value })
            }
            placeholder="Popis"
          />
          <Input
            value={workshop.time}
            onChange={(e) =>
              updateWorkshop(workshop.id, { time: e.target.value })
            }
            placeholder="Čas (např. 10:00–11:30)"
          />
        </div>
      ))}

      <Button onClick={addWorkshop}>+ Přidat workshop</Button>

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
