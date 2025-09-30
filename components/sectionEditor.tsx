// components/SectionEditor.tsx
import { Section } from "@/types/newsletter";
import TextEditorForm from "./editors/textEditor";
import WorkshopsEditorForm from "./editors/workshopsEditor";
import ImageTextEditorForm from "./editors/imageTextEditor";

type Props = {
  section: Section;
  onChange: (patch: Partial<Section>) => void;
};

export default function SectionEditor({ section, onChange }: Props) {
  switch (section.type) {
    case "text":
      return <TextEditorForm section={section} onChange={onChange} />;
    case "workshops":
      return <WorkshopsEditorForm section={section} onChange={onChange} />;
    case "imageText":
      return <ImageTextEditorForm section={section} onChange={onChange} />;
    default:
      return null;
  }
}
