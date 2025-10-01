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
    <div className="p-2 overflow-hidden">
      <h2 className="font-bold mb-2">Náhled</h2>
      <iframe
        srcDoc={html}
        className="w-full h-[90vh] bg-gray-100  border border-gray-300 rounded-xl p-5"
        sandbox=""
      />
    </div>
  );
}
