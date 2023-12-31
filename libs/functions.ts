import toast from "react-hot-toast";
import axiosCon from "./Axios";
import { InputsDeces } from "@/types/dece";

export const getProvice = (setProvinces: any) => {
  axiosCon
    .get("/app/create_province")
    .then((res) => {
      setProvinces(res.data);
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec les provinces");
    });
};

type idtype = {
  id: number | 1;
};

export const getTerritoire = (setTerritoire: any, id: number | 1) => {
  axiosCon
    .get(`/app/get_territoire_par_province/${id}`)
    .then((res) => {
      setTerritoire(res.data);
      console.log(res);
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec les provinces");
      console.log(err);
    });
};

export const addDeces = (data: InputsDeces, show: boolean, setShow: any) => {
  console.log(data);
  setShow(true);
  const token = sessionStorage.getItem("access");
  console.log(data);
  axiosCon
    .post("/app/create_certi_desc/", {
      token,
      new_certidesc: data,
    })
    .then((res) => {
      toast.success("Deces ajouté avec succès");
      console.log(res);
      setShow(false);
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec l'ajout du deces");
      console.log(err);
      setShow(false);
    });
};

export const removeActeDeces = (id: number, token: string) => {
  axiosCon
    .delete("/app/create_certi_desc", {
      data: {
        token,
        cert_id: id,
      },
    })
    .then((res) => {
      toast.success("Deces supprimé avec succès");
      console.log(res);
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec la suppression du deces");
      console.log(err);
    });
};

// update
export const deleteDeces = (
  data: InputsDeces,
  id: string,
  token: string,
  setShow: any
) => {
  setShow(true);
  console.log(data);
  axiosCon
    .put("/app/create_certi_desc/", {
      token,
      certNaiss_id: id,
      cert_naiss: data,
    })
    .then((res) => {
      toast.success("Certificat de décès modifié avec succès");
      console.log(res);
      setShow(false);
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec l'ajout du deces");
      console.log(err);
      setShow(false);
    });
};
