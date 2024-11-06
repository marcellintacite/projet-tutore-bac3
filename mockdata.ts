// mockData.ts
export const mockDeathCertificates = [
  {
    id: "1",
    declarationNumber: "12345",
    name: "Jean Dupont",
    deathDate: "2023-09-15",
    deathPlace: "Paris",
  },
  {
    id: "2",
    declarationNumber: "12346",
    name: "Marie Curie",
    deathDate: "2023-10-01",
    deathPlace: "Lyon",
  },
  {
    id: "3",
    declarationNumber: "12347",
    name: "Albert Camus",
    deathDate: "2023-11-20",
    deathPlace: "Marseille",
  },
  {
    id: "4",
    declarationNumber: "12348",
    name: "Simone de Beauvoir",
    deathDate: "2023-12-05",
    deathPlace: "Toulouse",
  },
  {
    id: "5",
    declarationNumber: "12349",
    name: "Victor Hugo",
    deathDate: "2024-01-10",
    deathPlace: "Bordeaux",
  },
];

// data.ts
export const fakeDeathData = {
  acte: {
    id: "12345",
    url_qrcode: "/path/to/qrcode.png",
  },
  province: { denom: "Sud-Kivu" },
  commune: {
    denom: "Kadutu",
    nom_bour: "Jean-Pierre Mukeba",
  },
  terriville: { denom: "Bukavu" },
  Certificat: {
    nom_defunt: "Kavira",
    prenom_defunt: "Marie",
    post_nom_defunt: "Mugisho",
    date_deces: "2023-10-10",
    lieu_deces: "Bukavu",
    cause_deces: "Maladie",
    nom_complet_tuteur: "Kavira Innocent",
  },
};
