import React, { useContext } from 'react';
import { AuthContext } from "./Auth";

const Welcome = (props) => {
    const { currentUser } = useContext(AuthContext);
    const currentUserEmail = currentUser ? currentUser.email : "";

    return <h2 className="Login">{`Welcome ${currentUserEmail}`}</h2>
}

export default Welcome;