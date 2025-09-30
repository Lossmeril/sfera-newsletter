// components/editors/WorkshopsEditor.tsx
"use client";

import { Section } from "@/types/newsletter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { v4 as uuid } from "uuid";

type WorkshopsSection = Extract<Section, { type: "workshops" }>;

export default function WorkshopsEditorForm({
  section,
  onChange,
}: {
  section: WorkshopsSection;
  onChange: (patch: Partial<Section>) => void;
}) {
  const updateBlock = (
    blockId: string,
    patch: Partial<WorkshopsSection["blocks"][0]>
  ) => {
    onChange({
      blocks: section.blocks.map((b) =>
        b.id === blockId ? { ...b, ...patch } : b
      ),
    });
  };

  const addBlock = () => {
    const newBlock = {
      id: uuid(),
      title: "Nový blok",
      color: "#000000",
      workshops: [],
    };
    onChange({ blocks: [...section.blocks, newBlock] });
  };

  const removeBlock = (blockId: string) => {
    onChange({ blocks: section.blocks.filter((b) => b.id !== blockId) });
  };

  const addWorkshop = (blockId: string) => {
    const newWorkshop = {
      id: uuid(),
      title: "Nový workshop",
      description: "",
      time: "",
    };
    updateBlock(blockId, {
      workshops: [
        ...(section.blocks.find((b) => b.id === blockId)?.workshops ?? []),
        newWorkshop,
      ],
    });
  };

  const updateWorkshop = (
    blockId: string,
    workshopId: string,
    patch: Partial<WorkshopsSection["blocks"][0]["workshops"][0]>
  ) => {
    const block = section.blocks.find((b) => b.id === blockId);
    if (!block) return;
    const updated = block.workshops.map((w) =>
      w.id === workshopId ? { ...w, ...patch } : w
    );
    updateBlock(blockId, { workshops: updated });
  };

  const removeWorkshop = (blockId: string, workshopId: string) => {
    const block = section.blocks.find((b) => b.id === blockId);
    if (!block) return;
    updateBlock(blockId, {
      workshops: block.workshops.filter((w) => w.id !== workshopId),
    });
  };

  return (
    <div className="space-y-4">
      <Input
        value={section.heading}
        onChange={(e) => onChange({ heading: e.target.value })}
        placeholder="Nadpis sekce (např. Víkendovky)"
      />

      {section.blocks.map((block) => (
        <div key={block.id} className="border rounded p-3 space-y-2">
          <div className="flex justify-between items-center">
            <Input
              value={block.title}
              onChange={(e) => updateBlock(block.id, { title: e.target.value })}
              placeholder="Název bloku (např. Dílna Grafiky)"
            />
            <input
              type="color"
              value={block.color}
              onChange={(e) => updateBlock(block.id, { color: e.target.value })}
              className="ml-2 w-10 h-10 border rounded"
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeBlock(block.id)}
            >
              Smazat blok
            </Button>
          </div>

          {/* Workshops inside block */}
          {block.workshops.map((w) => (
            <div key={w.id} className="border rounded p-2 space-y-1 bg-gray-50">
              <Input
                value={w.title}
                onChange={(e) =>
                  updateWorkshop(block.id, w.id, { title: e.target.value })
                }
                placeholder="Název workshopu"
              />
              <Textarea
                value={w.description}
                rows={3}
                onChange={(e) =>
                  updateWorkshop(block.id, w.id, {
                    description: e.target.value,
                  })
                }
                placeholder="Popis"
              />
              <Input
                value={w.time}
                onChange={(e) =>
                  updateWorkshop(block.id, w.id, { time: e.target.value })
                }
                placeholder="Čas (např. 10:00–11:30)"
              />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeWorkshop(block.id, w.id)}
              >
                Odebrat workshop
              </Button>
            </div>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => addWorkshop(block.id)}
          >
            + Přidat workshop
          </Button>
        </div>
      ))}

      <Button onClick={addBlock}>+ Přidat blok</Button>

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
