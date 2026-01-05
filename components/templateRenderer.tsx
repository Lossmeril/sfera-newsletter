import { facilityType } from "@/data/facilities";
import { Newsletter, Section } from "@/types/newsletter";

export function renderHtml(newsletter: Newsletter) {
  const sectionsHtml = newsletter.sections.map(renderSectionRow).join("\n");

  return `
  
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${newsletter.subject}</title>
    <style>
      @font-face {
        font-family: "Youth";
        src: url("https://www.sferapardubice.eu/front-module/assets/Youth-Regular.419075ca.woff2")
          format("woff2");
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: "Youth";
        src: url("https://www.sferapardubice.eu/front-module/assets/Youth-Bold.6e879d9a.woff2")
          format("woff2");
        font-weight: bold;
        font-style: normal;
      }
    </style>
  </head>
  <body style="margin:0;padding:0;font-family:'Youth',Helvetica,Arial,sans-serif;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" align="center"
      style="border-collapse:collapse;background:#ffffff;border:1px solid #000000;">

       <!-- Top strip -->
      <tr>
        <td
          width="5%"
          style="
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
          "
        ></td>
        <td
          height="40"
          style="
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
          "
        ></td>
        <td
          width="5%"
          style="
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
          "
        ></td>
      </tr>

      <tr>
        <td
          width="5%"
          style="
            border-right: 1px solid #000000;
            border-bottom: 1px solid #000000;
          "
        ></td>
        <td
          width="90%"
          height="40"
          style="
            border-bottom: 1px solid #000000;
            border-right: 1px solid #000000;
            padding: 15px;
          "
        >
          <img
            src="https://www.sferapardubice.eu/front-module/logo.svg"
            alt="Company Logo"
            width="150"
            style="display: block; margin: 0 auto"
          />
        </td>
        <td width="5%" style="border-bottom: 1px solid #000000"></td>
      </tr>
      
      <!-- Header -->
      <tr>
        <td width="5%" style="border-right:1px solid #000000;"></td>
        <td width="90%" style="border-right:1px solid #000000;text-align:center;padding:20px 0 0;">
          <h1 style="margin:0;font-size:40px;letter-spacing:-1px;">${newsletter.issueTitle}</h1>
          <p style="margin:0;font-size:16px;letter-spacing:-0.5px;">${newsletter.issueDate}</p>
          <div style=";width:100%;display:grid;grid-template-columns:repeat(4,1fr);margin-top:20px;">
            <div style="background-color:${newsletter.elements[0].bgColor};width:100%;aspect-ratio:1/1;border-top:1px solid #000000;overflow:hidden;"><img src="${newsletter.elements[0].image}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>
            <div style="background-color:${newsletter.elements[1].bgColor};width:100%;aspect-ratio:1/1;border-top:1px solid #000000;border-left:1px solid #000000;overflow:hidden;"><img src="${newsletter.elements[1].image}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>
            <div style="background-color:${newsletter.elements[2].bgColor};width:100%;aspect-ratio:1/1;border-top:1px solid #000000;border-left:1px solid #000000;overflow:hidden;"><img src="${newsletter.elements[2].image}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>
            <div style="background-color:${newsletter.elements[3].bgColor};width:calc(100% - 1px);aspect-ratio:1/1;border-top:1px solid #000000;border-left:1px solid #000000;overflow:hidden;"><img src="${newsletter.elements[3].image}" alt="" style="width:100%;height:100%;object-fit:cover;" /></div>
          </div>
        </td>
        <td width="5%"></td>
      </tr>

      ${sectionsHtml}

      <!-- Footer -->
      <tr>
        <td width="5%" style="border-right:1px solid #000000;"></td>
        <td width="90%" style="border-right:1px solid #000000;text-align:center;font-size:12px;padding:10px;color:#333;">
          www.sferapardubice.eu
        </td>
        <td width="5%"></td>
      </tr>

    </table>
  </body>
</html>`;
}

/** Wraps each section in a 3-column row */
function renderSectionRow(section: Section): string {
  return `
  <tr>
    <td width="5%" style="border-right:1px solid #000000;border-top:1px solid #000000;border-bottom:1px solid #000000;"></td>
    <td width="90%" style="border-right:1px solid #000000;border-top:1px solid #000000;border-bottom:1px solid #000000;">
      ${renderSection(section)}
    </td>
    <td width="5%" style="border-top:1px solid #000000;border-bottom:1px solid #000000;"></td>
  </tr>`;
}

/** Section renderers */
function renderSection(section: Section): string {
  switch (section.type) {
    case "text":
      return `
        <div style="width:100%;">
          <h2 style="text-align:center;font-size:24px;margin:0;${
            section.body || section.cta?.href
              ? `border-bottom:1px solid #000000;`
              : ""
          }padding:5px 20px;">
            <b>${section.heading}</b>
          </h2>${
            section.body || section.cta?.href
              ? `
          <div style="margin:15px 30px;font-size:12px;text-align:justify;">
            ${section.body}
          </div>`
              : ""
          }
          ${renderCta(section.cta)}
        </div>`;
    case "workshops":
      return renderWorkshops(section);
    case "imageText":
      return `
        <div style="width:100%;">
          <h2 style="text-align:center;font-size:24px;margin:0;border-bottom:1px solid #000000;padding:5px 20px;">
            <b>${section.heading}</b>
          </h2>
          <div style="width:100%;height:200px;border-bottom:1px solid #000000;overflow:hidden;">
            <img src="${
              section.imageUrl
                ? section.imageUrl
                : "https://placehold.co/600x400?text=Obrázek+nenahrán"
            }" alt="" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div style="margin:15px 30px;font-size:12px;text-align:justify;">
            ${section.body}
          </div>
          ${renderCta(section.cta)}
        </div>`;
    default:
      return "";
  }
}

/** Workshops renderer (2-column grid, husk for odd numbers) */
function renderWorkshops(section: Extract<Section, { type: "workshops" }>) {
  const workshops = section.workshops;
  const rows: string[] = [];

  for (let i = 0; i < workshops.length; i += 2) {
    const left = renderWorkshopBlock(workshops[i]);
    const right = workshops[i + 1]
      ? renderWorkshopBlock(workshops[i + 1], true)
      : renderEmptyWorkshopBlock();
    rows.push(`
      <div style="display:grid;grid-template-columns:repeat(2,1fr);width:100%; ${
        i >= workshops.length - 2 && section.cta?.href
          ? "border-bottom:1px solid #000000;"
          : ""
      }">
        <div style="border-right:1px solid #000000;width:100%;">
          ${left}
        </div>
        <div style="border-right:1px solid #000000;width:100%;">
          ${right}
        </div>
      </div>`);
  }

  return `
    <div style="width:100%;">
      <h2 style="text-align:center;font-size:24px;margin:0;padding:5px 20px;">
        <b>${section.heading}</b>
      </h2>
      ${rows.join("\n")}
      ${renderCta(section.cta)}
    </div>`;
}

function renderWorkshopBlock(
  block: {
    id: string;
    place: facilityType;
    title: string;
    description: string;
    time: string;
  },
  isRight = false
) {
  return `
    <div style="width:100%;border-top:1px solid #000000">
      <div style="font-size:12px;width:100%;border-bottom:1px solid #000000;background-color:${
        block.place.colorBg
      };color:white;text-align:center;${
    isRight ? "border-left:1px solid #000000;width:calc(100% - 1px);" : ""
  }">
        ${block.place.name}
      </div>

        <div style="padding:15px;">
          <h3 style="font-size:14px;margin:0;">${block.title}</h3>
          <p style="font-size:11px;">${block.description}</p>
          <p style="font-size:11px;">${block.time}</p>
        </div>
      </div>`;
}

function renderEmptyWorkshopBlock() {
  return `<div style="width:100%;min-height:100px;border-top:1px solid #000000">
            <div style="font-size:12px;width:100%;border-bottom:1px solid #000000;border-left:1px solid #000000;background-color:transparent;color:white;text-align:center;">
               &nbsp;
            </div>
          </div>`;
}

/** CTA button */
function renderCta(cta?: { label?: string; href?: string }) {
  if (!cta?.label || !cta?.href) return "";
  return `
    <a href="${cta.href}" style="color:#ffffff;text-decoration:none;font-size:16px;">
      <div style="padding:12px 24px;background-color:#000000;max-width:fit-content;margin:20px auto 45px auto;">
        ${cta.label}
      </div>
    </a>`;
}
