import toast from "react-hot-toast";

export const changeStep = (setStep: any, step: number) => {
  setStep(step);
};

type Input = {
  nom_enfant: string;
  post_nom_enfant: string;
  prenom_enfant: string;
  sexe_enfant: string;
  poid_enfant: number | string;
  nom_complet_pere: string;
  profession_pere: string;
  date_nais_pere: Date | string;
  lieu_nais_pere: string;
  nationalite_pere: string;
  nom_complet_mere: string;
  profession_mere: string;
  date_nais_mere: string;
  lieu_nais_mere: string;
  nationalite_mere: string;
  localite_parent: string;
  collectiv_parent: string;
};

export const testData = (data: Input) => {
  if (data.nom_enfant === "") {
    toast.error("Le nom de l'enfant est obligatoire");
    return false;
  }
  if (data.post_nom_enfant === "") {
    toast.error("Le post nom de l'enfant est obligatoire");
    return false;
  }
  if (data.prenom_enfant === "") {
    toast.error("Le prenom de l'enfant est obligatoire");
    return false;
  }
  if (data.sexe_enfant === "") {
    toast.error("Le sexe de l'enfant est obligatoire");
    return false;
  }
  if (data.poid_enfant === "") {
    toast.error("Le poids de l'enfant est obligatoire");
    return false;
  }
  if (data.nom_complet_pere === "") {
    toast.error("Le nom complet du père est obligatoire");
    return false;
  }
  if (data.profession_pere === "") {
    toast.error("La profession du père est obligatoire");
    return false;
  }
  if (data.date_nais_pere === "") {
    toast.error("La date de naissance du père est obligatoire");
    return false;
  }
  if (data.lieu_nais_pere === "") {
    toast.error("Le lieu de naissance du père est obligatoire");
    return false;
  }
  if (data.nationalite_pere === "") {
    toast.error("La nationalité du père est obligatoire");
    return false;
  }
  if (data.nom_complet_mere === "") {
    toast.error("Le nom complet de la mère est obligatoire");
    return false;
  }
  if (data.profession_mere === "") {
    toast.error("La profession de la mère est obligatoire");
    return false;
  }
  if (data.date_nais_mere === "") {
    toast.error("La date de naissance de la mère est obligatoire");
    return false;
  }
  if (data.lieu_nais_mere === "") {
    toast.error("Le lieu de naissance de la mère est obligatoire");
    return false;
  }
  if (data.nationalite_mere === "") {
    toast.error("La nationalité de la mère est obligatoire");
    return false;
  }

  if (data.localite_parent === "") {
    toast.error("La localité des parents est obligatoire");
    return false;
  }
  if (data.collectiv_parent === "") {
    toast.error("La collectivité des parents est obligatoire");
    return false;
  }
  return true;
};
