// components/PreviewPane.tsx
"use client";

import { Newsletter } from "@/types/newsletter";
import { renderHtml } from "./templateRenderer";

export default function PreviewPane({
  newsletter,
}: {
  newsletter: Newsletter;
}) {
  const html = renderHtml(newsletter);
  return (
    <div className="p-2 bg-gray-50">
      <h2 className="font-bold mb-2">Náhled</h2>
      <iframe srcDoc={html} className="w-full h-[90vh] border" sandbox="" />
    </div>
  );
}
