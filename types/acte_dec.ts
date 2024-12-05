export type ActeDecesData = {
  cert_desc_id: number;
  cod_qr: string | null;
  commune: number;
  conjoint_identite: string;
  date_enregistrement: string; // ISO 8601 date format
  etat_civile: string;
  id: number;
  langue_redaction: string;
  nationalite: string;
  nom_complet_mere: string;
  nom_complet_pere: string;
  nom_declarant: string;
  numeros_volume: string;
  profession_declarant: string;
  qualite_declarant: string;
  residence_principale: string;
  residence_temporaire: string;
  url_qrcode: string | null;
};
