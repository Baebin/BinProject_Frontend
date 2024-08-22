import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {accountManager} from "../../utility/AccountManager";

function LoginRedirectPage() {
    const {token, idx, name, permission} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        accountManager.setIdx(`${idx}`);
        accountManager.setName(`${name}`);
        accountManager.setToken(`${token}`);
        accountManager.setPermission(`${permission}`);

        navigate("/");

        // for Header Refresh
        window.location.reload();
    }, []);

    return (
        <div>
        </div>
    );
}

export default LoginRedirectPage;