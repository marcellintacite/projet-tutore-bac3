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
