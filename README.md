# 📰 Sférický newsletter builder

Tento projekt je interní nástroj pro tvorbu a rozesílání newsletterů organizace [**SFÉRA Pardubice**](https://sferapardubice.eu).  
Poskytuje webové rozhraní, ve kterém lze sestavovat newslettery z připravených sekcí (text, obrázek+text, víkendovky), spravovat obsah a ihned zobrazit náhled výsledného e-mailu v šabloně.

---

## ✨ Funkce

- 📑 **Sekce newsletteru**
  - Textová sekce s nadpisem, obsahem a tlačítkem (CTA).
  - Sekce **Víkendovky** s možností přidávat bloky (např. dílny) a do nich jednotlivé workshopy.
  - Obrázek + textová sekce s možností přidat tlačítko.
- 🖋️ **Editor** pro úpravu obsahu sekcí (React + shadcn/ui komponenty).
- 👀 **Živý náhled** newsletteru v reálné HTML e-mailové šabloně.
- 📤 (Plán) možnost odeslat newsletter přes **Office 365 (OAuth)** na vybraný mailing list.
- 💾 (Plán) ukládání draftů a historie bez databáze (např. do JSON souborů na serveru nebo Git repozitáře).

---

## 🛠 Použitý stack

- [Next.js (App Router)](https://nextjs.org/) – frontendová aplikace
- [React](https://react.dev/) – komponentový systém
- [Tailwind CSS](https://tailwindcss.com/) – stylování
- [shadcn/ui](https://ui.shadcn.com/) – UI komponenty
- [uuid](https://www.npmjs.com/package/uuid) – generování ID

---

## 📌 Plánovaný vývoj
- [ ] Změna názvu, data newsletteru
- [ ] Změna grafických prvků
- [ ] Možnost vkládání data akcí
- [ ] EmDash copy button
- [ ] Validace dat a časů podle grafického manuálu
- [ ] Validace data akcí oproti současnému času
- [ ] Export do JSON formátu a jeho načtení
- [ ] Napojení na OAuth Office 365
- [ ] Načítání maillistu z .csv
