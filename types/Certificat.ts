export type ResponseCertificat = {
  province: { id: number; denom: string };
  terriville: { id: number; denom: string; prov: number };
  hospital: {
    id: number;
    email: string;
    boite_postal: string;
    denom: string;
    numeros_id: string;
    user: number;
    prov: number;
    TerriVi: number;
  };
  Certificat: {
    id: number;
    nom_medecin: string;
    nom_enfant: string;
    post_nom_enfant: string;
    prenom_enfant: string;
    sexe_enfant: string;
    poid_enfant: number;
    date_nais_enfant: string;
    date_deliv_cert: string;
    nom_complet_pere: string;
    profession_pere: string;
    date_nais_pere: string;
    lieu_nais_pere: string;
    nationalite_pere: string;
    nom_complet_mere: string;
    profession_mere: string;
    date_nais_mere: string;
    lieu_nais_mere: string;
    nationalite_mere: string;
    localite_parent: string;
    collectiv_parent: string;
    url_qrcode?: string;
    cod_qr?: string;
    hospital_id: number;
  };
};

export type ResponseCertificatDeces = {
  province: { id: number; denom: string };
  terriville: { id: number; denom: string; prov: number };
  hospital: {
    id: number;
    email: string;
    boite_postal: string;
    denom: string;
    numeros_id: string;
    user: number;
    prov: number;
    TerriVi: number;
  };
  Certificat: {
    id: number;
    medecin_traitant: string;
    nom_defunt: string;
    post_nom_defunt: string;
    prenom_defunt: string;
    sexe_defunt: string;
    lieu_naissance: string;
    date_naissance_defunt: string;
    profession_defunt: string;
    cause_desc: string;
    date_desc: string;
    date_deliv_cert: string;
    url_qrcode?: string;
    cod_qr?: string;
    hospital_id: number;
  };
};
