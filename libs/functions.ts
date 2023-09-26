import toast from "react-hot-toast";
import axiosCon from "./Axios";

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
    })
    .catch((err) => {
      toast.error("Il y a une erreur avec les provinces");
    });
};
