import React, { useEffect } from 'react';
import google from "../services/google";
import Cookies from 'js-cookie';

// Constantes para valores estáticos
const GOOGLE_CLIENT_ID = '64303496614-qts46aqj3g3pqj7hg3jpnkd9ovm9q4cf.apps.googleusercontent.com';

const GoogleLogin: React.FC = () => {
    const handleGoogle = (event: any) => {
        google(event)
            .then(token => Cookies.set("token", token))
            .catch(error => console.log(error))
    }

    const initialize = () => {
        const script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.async = true;

        document.head.appendChild(script);

        script.onload = () => {
            (window as any).google.accounts.id.initialize({
                client_id: GOOGLE_CLIENT_ID,
                context: 'signin',
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
                    size: 'large',
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
        <div>
            <div id="g_id_signin"></div>
        </div>
    );
};

export default GoogleLogin;
