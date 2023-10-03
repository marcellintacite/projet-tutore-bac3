import { removeUser } from "@/data/reducers/userReducer";
const paramType = {
  navigation: (navigation: any) => navigation.navigate("/"),
  dispatch: (dispatch: any) => dispatch(removeUser()),
};

export default function deconnexion({ navigation, dispatch }: any) {
  console.log(navigation);
  dispatch(removeUser());
  window.sessionStorage.removeItem("access");
  console.log("test");
  navigation.push("/");
}

export const deconnexionUser = ({ dispatch, router }: any) => {
  dispatch(removeUser());
  sessionStorage.clear();
  router.push("/");
};
