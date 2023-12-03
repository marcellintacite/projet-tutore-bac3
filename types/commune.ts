export type ActeNaissance = {
  id: number;
  numeros_volume: string;
  numeros_folio: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  date_enregistrement: string;
  langue_redaction: string;
  url_qrcode: string;
  cod_qr: string;
  certNais_id: number;
  commune: number;
};
export type ResponseActeNaissance = {
  province: {
    id: number;
    denom: string;
  };
  terriville: { id: string; denom: string; prov: number };
  commune: {
    id: number;
    denom: string;
    nom_bour: string;
    user: number;
    prov: number;
    TerriVi: number;
  };

  acte: {
    id: number;
    numeros_volume: string;
    numeros_folio: string;
    nom_declarant: string;
    qualite_declarant: string;
    profession_declarant: string;
    date_enregistrement: string;
    langue_redaction: string;
    url_qrcode: string;
    cod_qr: string;
    certNais_id: number;
    commune: number;
  };
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
    url_qrcode: string;
    cod_qr: string;
    hospital_id: number;
  };
};
