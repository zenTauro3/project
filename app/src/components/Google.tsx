import { useEffect } from "react";
import Cookies from "js-cookie";
import google from "../services/google";

function Google() {
  const hash = window.location.hash.substring(1);
  const query = new URLSearchParams(hash);
  const accessToken = query.get("access_token");

  useEffect(() => {
    if (accessToken) {
      google(accessToken)
        .then(token => {
          Cookies.set("token", token);
          window.location.href = "http://localhost:5173/home"
        })
        .catch(() => window.location.href = "http://localhost:5173/login")
    } else {
      window.location.href = "http://localhost:5173/login"
    }

  }, []);

  return null
}

export default Google;
