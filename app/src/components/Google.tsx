import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import google from "../services/google";

function Google() {
  const hash = window.location.hash.substring(1);
  const query = new URLSearchParams(hash);
  const accessToken = query.get("access_token");
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      google(accessToken)
        .then(token => {
          Cookies.set("token", token);
          navigate("/home");
        })
        .catch(error => {
          console.log(error.response.data)
          navigate("/login")
        })
    } else {
      navigate("/home");
    }

  }, []);

  return null
}

export default Google;
