"use client";

import { Newsletter } from "@/types/newsletter";
import { Input } from "@/components/ui/input";

export default function GlobalEditorForm({
  newsletter,
  onChange,
}: {
  newsletter: Newsletter;
  onChange: (patch: Partial<Newsletter>) => void;
}) {
  return <div className="space-y-4"></div>;
}
