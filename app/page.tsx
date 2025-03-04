"use client";
import React, { useEffect } from "react";
import Bouton from "@/components/Bouton";
import Input from "@/components/login/Input";
import Image from "next/image";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import ErrorInput from "@/components/login/Errors";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { setUser, setUserid } from "@/data/reducers/userReducer";

import { Toaster, toast } from "react-hot-toast";

import axiosCon from "@/libs/Axios";

type Inputs = {
  username: string;
  password: string;
};

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    if (sessionStorage.getItem("access")) {
      router.push("/dashboard");
    }
    console.log(sessionStorage.getItem("access"));
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const [show, setShow] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    setShow(true);
    const url = "/user/login_user";
    axiosCon
      .post(url, {
        username: data.username,
        password: data.password,
      })
      .then((res: any) => {
        // console.log(res);

        window.sessionStorage.setItem("access", res.data.access);

        axiosCon
          .get(`/user/get_user_id/${res.data.user_id}`)
          .then((rs) => {
            window.sessionStorage.setItem("username", rs.data.username);
            window.sessionStorage.setItem("user_type", res.data.user_type);
          })
          .catch((e) => {
            sessionStorage.clear();
            window.location.reload();
          });

        dispatch(
          setUser({
            username: data.username,
            isLogged: true,
            userRole: res.data.user_type,
            userId: res.data.user_id,
            token: res.data.access,
          })
        );
        setShow(false);
        router.push("/dashboard");
      })
      .catch((e: any) => {
        console.log(e);
        toast.error(e.response.data.message);
        dispatch(
          setUser({
            username: data.username,
            isLogged: true,
          })
        );
        setShow(false);
        // router.push("/dashboard");
        // setShow(false);
      });
    // setTimeout(() => {
    //   setShow(false);
    // }, 2000);
    // dispatch(
    //   setUser({
    //     ...data,
    //     isLogged: true,
    //   })
    // );
    // router.push("/dashboard");
  };

  return (
    <main className="flex flex-col md:flex-row pt-3 md:pt-0 items-center justify-center w-full min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex flex-col  items-center justify-center min-h-screen md:w-3/5 w-11/12">
        <div
          className="
        flex flex-col items-center justify-center w-full gap-7
        "
        >
          <Image
            src={require("@/public/assets/illustration/jpr.png")}
            alt="Logo"
            className="w-20 h-20"
          />
          <h1 className="text-2xl font-bold">Connexion</h1>
        </div>
        <form
          className="
        flex flex-col items-center justify-center w-full gap-7 md:px-10 mt-5
        "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className="
          flex flex-col justify-center w-full gap-2
        "
          >
            <Input
              label="Nom d'utilisateur"
              value=""
              placeholder="test234"
              otherprops={{
                ...register("username", {
                  required: "Ce champ est requis",
                  minLength: {
                    value: 4,
                    message:
                      "Le nom d'utilisateur doit contenir au moins 4 caractères",
                  },
                  maxLength: {
                    value: 16,
                    message:
                      "Le nom d'utilisateur doit contenir au plus 9 caractères",
                  },
                }),
              }}
            />
            {errors.username && (
              <ErrorInput
                errors={{
                  message: errors.username.message,
                  type: errors.username.type,
                }}
              />
            )}
          </div>
          <div
            className="
          flex flex-col justify-center w-full gap-2
        "
          >
            <Input
              label="Mot de passe"
              value=""
              placeholder="xxxxxxxx"
              type="password"
              otherprops={{
                ...register("password", {
                  required: "Ce champ est requis",
                  minLength: {
                    value: 3,
                    message:
                      "Le mot de passe doit contenir au moins 8 caractères",
                  },
                  maxLength: {
                    value: 15,
                    message:
                      "Le mot de passe doit contenir au plus 15 caractères",
                  },
                }),
              }}
            />
            {errors.password && (
              <ErrorInput
                errors={{
                  message: errors.password.message,
                  type: errors.password.type,
                }}
              />
            )}
          </div>
          <div className="flex flex-col  w-full"></div>
          <div className="flex justify-end w-full">
            <Link href="/restaurer" className="text-primary-200">
              {" "}
              Mot de passe oublié ?
            </Link>
          </div>
          <Bouton
            label="Se connecter"
            type="submit"
            onClick={() => console.log("test")}
            loading={show}
          />
        </form>
      </div>
      {/* <div
        className="
      hidden md:flex  items-center justify-center  flex-2 mt-5 md:mt-0   bg-[#FAFAFA] md:h-screen
      "
      >
        <Image
          src={require("@/public/assets/Illustration.png")}
          alt="Logo"
          className="w-1/2"
        />
      </div> */}
    </main>
  );
}
