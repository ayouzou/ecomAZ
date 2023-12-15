import { useContext } from "react";
import { SessionContext } from "../context/auth";
import { deleteCookie } from "../utils/auth";

export default function useAuth() {
  const authContext = useContext(SessionContext);

  return { auth: authContext, logout: () => deleteCookie("token") };
}
