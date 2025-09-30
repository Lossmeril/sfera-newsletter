// components/TemplateRenderer.tsx
import { Newsletter, Section } from "@/types/newsletter";

export function renderHtml(newsletter: Newsletter) {
  const sectionsHtml = newsletter.sections.map(renderSection).join("\n");

  return `
  <!DOCTYPE html>
  <html>
    <head><meta charset="utf-8"/></head>
    <body>
      <h1>${newsletter.issueTitle}</h1>
      <p>${newsletter.issueDate}</p>
      ${sectionsHtml}
    </body>
  </html>`;
}

function renderSection(section: Section): string {
  switch (section.type) {
    case "text":
      return `<h2>${section.heading}</h2><div>${section.body}</div>`;
    case "workshops":
      return (
        `<h2>${section.heading}</h2>` +
        section.blocks
          .map(
            (b) =>
              `<div style="border:1px solid black">
                 <div style="background:${b.color};color:white">${b.title}</div>
                 ${b.workshops
                   .map(
                     (w) =>
                       `<div><h3>${w.title}</h3><p>${w.description}</p><p>${w.time}</p></div>`
                   )
                   .join("")}
               </div>`
          )
          .join("")
      );
    case "imageText":
      return `<h2>${section.heading}</h2>
        <img src="${section.imageUrl}" width="100%"/>
        <div>${section.body}</div>`;
    default:
      return "";
  }
}
