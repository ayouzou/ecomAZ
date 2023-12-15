import * as jwt_decode from "jwt-decode";
import { User } from "../types/auth";
type JwtToken = string;

// If you want to specify the structure of the JWT payload, you can define an interface:
interface JwtPayload {
  sub: string; // Subject (typically a user ID)
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration (timestamp)
  // Add more properties as needed
}

// Combining the token and payload types:
type Jwt = {
  token: JwtToken;
  payload: JwtPayload;
};

export const decodeJWT = (cookieName?: string): User | null => {
  // console.log("coookiename", cookieName);
  const token = cookieName ? getCookie(cookieName) : getCookie("token");
  try {
    return jwt_decode(token);
  } catch (e) {
    return null;
  }
};

export function storeCookie(name: string, value: string) {
  // let's extract the days from the token value
  const decodedToken: JwtPayload = jwt_decode(value);
  let days = decodedToken.exp - decodedToken.iat;
  days = Math.floor(days / 60 / 60 / 24);
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = ";expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + ";path=/";
}
export function getCookie(cname: string) {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
export function deleteCookie(name: string) {
  document.cookie = name + "=; Max-Age=-99999999;";
}
