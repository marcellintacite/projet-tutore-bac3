import Navbar from "@/components/dashboard/NavbarSearh";
import React from "react";

import TableReuse from "@/components/TableReuse";

type Props = {};

type Province = {
  id: number;
  denom: string;
};

type TerriVille = {
  id: number;
  denom: string;
  prov: number;
};

type Commune = {
  id: number;
  denom: string;
  nom_bour: string;
  user: number;
  prov: number;
  TerriVi: number;
};

type Acte = {
  id: number;
  numeros_volume: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  residence_principale: string;
  residence_temporaire: string;
  nationalite: string;
  etat_civile: string;
  conjoint_identite: string;
  nom_complet_pere: string;
  nom_complet_mere: string;
  date_enregistrement: string;
  langue_redaction: string;
  url_qrcode: string | null;
  cod_qr: string | null;
  cert_desc_id: number;
  commune: number;
};

type Hospital = {
  id: number;
  email: string;
  boite_postal: string;
  denom: string;
  numeros_id: string;
  user: number;
  prov: number;
  TerriVi: number;
};

type Certificat = {
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
  url_qrcode: string | null;
  cod_qr: string | null;
  hopital_id: number;
};

export type DeathCertificateData = {
  province: Province;
  terriville: TerriVille;
  commune: Commune;
  acte: Acte;
  hospital: Hospital;
  Certificat: Certificat;
};

export default function page({}: Props) {
  return (
    <main>
      <Navbar
        name="Certificat de naissance"
        path="/certificat-de-naissance"
        pageRoute="/dashboard/certificat-de-naissance/nouveau-certificat-naissance"
      />

      <div>
        <TableReuse />
      </div>
    </main>
  );
}
