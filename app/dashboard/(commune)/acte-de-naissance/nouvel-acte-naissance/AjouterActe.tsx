"use client";
import CustomInput from "@/app/dashboard/(hopital)/certificat-de-naissance/components/Input";
import { base_url } from "@/data/url";
import axiosCon from "@/libs/Axios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

type InputesActe = {
  numeros_volume: string;
  numeros_folio: string;
  nom_declarant: string;
  qualite_declarant: string;
  profession_declarant: string;
  date_enregistrement: string;
  langue_redaction: string;
  certNais_id: string;
};

const getCertificates = async () => {
  const token = sessionStorage.getItem("access");
  const res = await axiosCon.get(`${base_url}/app/get_cert_nais_non_acte`);
  return res.data;
};

export default function AjouterActe() {
  const { data: certificates, isLoading } = useQuery({
    queryKey: ["certificat"],
    queryFn: getCertificates,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCertificates, setFilteredCertificates] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const router = useRouter();
  const [isLoad, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InputesActe>();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    if (certificates) {
      const results = certificates.filter((cert: any) =>
        `${cert.nom_enfant} ${cert.prenom_enfant}`.toLowerCase().includes(query)
      );
      setFilteredCertificates(results);
    }
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    reset({
      certNais_id: user.id,
      numeros_volume: "",
      numeros_folio: "",
      nom_declarant: "",
      qualite_declarant: "",
      profession_declarant: "",
      date_enregistrement: "",
      langue_redaction: "",
    });
  };

  const onSubmit = (data: InputesActe) => {
    const token = sessionStorage.getItem("access");
    if (!token) return window.location.reload();
    axiosCon
      .post("/app/create_actenaiss", {
        token,
        new_actenaiss: {
          ...data,
          commune: selectedUser?.hospital_id,
        },
      })
      .then(() => {
        toast.success("Acte de naissance ajouté avec succès");
        reset();
        setSelectedUser(null);
        router.push("/dashboard/(hopital)/acte-de-naissance");
      })
      .catch(() => {
        toast.error("Erreur lors de l'ajout de l'acte de naissance");
      });
  };

  return (
    <div className="mx-6 mt-3 bg-white p-7 m-auto">
      {!selectedUser ? (
        <div>
          <h3 className="text-lg font-bold mb-4">Chercher un certificat</h3>
          <input
            type="text"
            placeholder="Rechercher par nom ou prénom"
            className="input input-bordered w-full mb-4"
            value={searchQuery}
            onChange={handleSearch}
          />
          {isLoading ? (
            <p>Chargement...</p>
          ) : filteredCertificates.length > 0 ? (
            <div>
              {filteredCertificates.map((cert: any) => (
                <div
                  key={cert.id}
                  className="cursor-pointer border p-2 mb-2 hover:bg-gray-100"
                  onClick={() => handleUserSelect(cert)}
                >
                  <p>
                    <strong>{cert.nom_enfant}</strong> {cert.prenom_enfant}
                  </p>
                  <p>{cert.nom_complet_pere}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Pas de certificat avec ce nom.</p>
          )}
        </div>
      ) : (
        <div className="md:flex justify-center">
          <div className="flex-1 md:w-4/5 w-full">
            <p>
              Veuillez compléter tout les champs pour {selectedUser.nom_enfant}
            </p>
            <form
              className="form-control mt-5 md:w-3/4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <CustomInput
                register={register}
                name="numeros_volume"
                label="Numéro de volume du registre"
                placeholder="Xv5"
                type="text"
              />
              <CustomInput
                register={register}
                name="numeros_folio"
                label="Numéro de folio du registre"
                placeholder="Xve"
                type="text"
              />
              <CustomInput
                register={register}
                name="nom_declarant"
                label="Nom du déclarant"
                placeholder="Bora Sila"
                type="text"
              />
              <CustomInput
                register={register}
                name="qualite_declarant"
                label="Qualité du déclarant"
                placeholder="Père"
                type="text"
              />
              <CustomInput
                register={register}
                name="profession_declarant"
                label="Profession du déclarant"
                placeholder="Ingénieur"
                type="text"
              />
              <CustomInput
                register={register}
                name="date_enregistrement"
                label="Date d'enregistrement"
                placeholder="2021-09-09"
                type="date"
              />
              <CustomInput
                register={register}
                name="langue_redaction"
                label="Langue de rédaction"
                placeholder="Français"
                type="text"
              />
              <input
                type="hidden"
                {...register("certNais_id")}
                value={selectedUser.id}
              />
              <button className="btn btn-primary mt-5" type="submit">
                {isLoad ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Ajouter"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
