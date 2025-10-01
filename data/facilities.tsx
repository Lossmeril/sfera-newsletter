export type facilityType = {
  id: number;
  name: string;
  nameEn: string;

  colorBg: string; // now storing the hex directly
};

export const dilnaTextilu: facilityType = {
  id: 1,
  name: "Dílna Textilu",
  nameEn: "Textiles Workshop",
  colorBg: "#ffcb04", // --textil
};

export const dilnaGrafiky: facilityType = {
  id: 2,
  name: "Dílna Grafiky",
  nameEn: "Graphics Workshop",
  colorBg: "#f7941d", // --grafika
};

export const dilnaDreva: facilityType = {
  id: 3,
  name: "Dílna Dřeva",
  nameEn: "Wood Workshop",
  colorBg: "#7e5228", // --drevo
};

export const dilnaKovu: facilityType = {
  id: 4,
  name: "Dílna Kovu/Elektra",
  nameEn: "Metal/Electric Workshop",
  colorBg: "#afca0b", // --kov
};

export const laboratorITVR: facilityType = {
  id: 5,
  name: "Laboratoř IT/VR",
  nameEn: "Computer Science/VR Lab",
  colorBg: "#83d0f5", // --it
};

export const laboratorFyziky: facilityType = {
  id: 6,
  name: "Laboratoř Fyziky",
  nameEn: "Physics Lab",
  colorBg: "#ec619f", // --fyzika
};

export const laboratorChemie: facilityType = {
  id: 7,
  name: "Laboratoř Chemie",
  nameEn: "Chemistry Lab",
  colorBg: "#6859a3", // --chemie
};

export const laboratorPrirodopisu: facilityType = {
  id: 8,
  name: "Laboratoř Přírodopisu",
  nameEn: "Biology Lab",
  colorBg: "#004f9f", // --prirodopis
};

export const sferickeHriste: facilityType = {
  id: 9,
  name: "Sférické Hřiště",
  nameEn: "Spherical Playground",
  colorBg: "#3fa535", // --hriste
};

export const scienceOnSphere: facilityType = {
  id: 10,
  name: "Sál Science on a Sphere",
  nameEn: "Science on a Sphere Room",
  colorBg: "#e74011", // --sos
};

export const primestskyTabor: facilityType = {
  id: 11,
  name: "Příměstský Tábor",
  nameEn: "Day Camp",
  colorBg: "#f37053", // --tabory
};

export const celaInstituce: facilityType = {
  id: 0,
  name: "Vzdělávací centrum SFÉRA",
  nameEn: "SFÉRA Educational Center",
  colorBg: "#000000", // --sfera
};

export const facilities: facilityType[] = [
  celaInstituce,
  dilnaTextilu,
  dilnaGrafiky,
  dilnaDreva,
  dilnaKovu,
  laboratorITVR,
  laboratorFyziky,
  laboratorChemie,
  laboratorPrirodopisu,
  sferickeHriste,
  scienceOnSphere,
  primestskyTabor,
];
