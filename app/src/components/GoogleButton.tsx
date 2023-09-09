import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import google from '../services/google';
import Cookies from 'js-cookie';

// Constantes para valores estáticos
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT;

const GoogleRegister: React.FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleGoogle = (event: any) => {
    google(event)
      .then(token => {
        Cookies.set("token", token);
        navigate("/home");
      })
      .catch(error => setMessage(error.response.data))
  }

  const initialize = () => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;

    document.head.appendChild(script);

    script.onload = () => {
      (window as any).google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        context: 'use',
        ux_mode: 'popup',
        callback: handleGoogle,
        nonce: '',
        itp_support: true,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        {
          type: 'standard',
          shape: 'rectangular',
          theme: 'outline',
          text: 'continue_with',
          size: 'medium',
          logo_alignment: 'left',
        }
      );
    };

    script.onerror = () => {
      console.error('Error al cargar el script de Google Sign-In.');
    };

    return () => {
      document.head.removeChild(script);
    };
  };

  useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div id="g_id_signin"></div>
      <p>{message}</p>
    </>
  )
};

export default GoogleRegister;
