import { userType } from "./data/user";

export type storeType = {
  user: userType;
  theme: "light" | "dark" | "cupcake";
};
