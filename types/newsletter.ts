import { facilityType } from "@/data/facilities";

// types/newsletter.ts
export type Newsletter = {
  id: string;
  subject: string;
  issueTitle: string;
  issueDate: string;
  elements: { elementSet: facilityType; elementNo: number; bgColor: string }[];
  sections: Section[];
};

export type Section =
  | {
      id: string;
      type: "text";
      heading: string;
      body: string;
      cta?: { label: string; href: string };
    }
  | {
      id: string;
      type: "workshops";
      heading: string;
      workshops: Array<{
        id: string;
        place: facilityType;

        title: string;
        description: string;
        time: string;
      }>;
      cta?: { label: string; href: string };
    }
  | {
      id: string;
      type: "imageText";
      heading: string;
      imageUrl: string;
      body: string;
      cta?: { label: string; href: string };
    };
