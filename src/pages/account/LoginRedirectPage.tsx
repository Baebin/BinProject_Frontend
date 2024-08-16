import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {accountManager} from "../../utility/AccountManager";

function LoginRedirectPage() {
    const {token, name, permission} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
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