import React, { useState } from 'react';
import firebase from '../firebase.js';
import SnapshotFirebase from '../components/SnapshotFirebase'
import Welcome from './Welcome'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authenticated, setAuthenticated] = useState(true);
    // const [authenticated, setAuthenticated] = useState(false);

    // const register = () => {
    //     firebase
    //         .auth()
    //         .createUserWithEmailAndPassword(email, password)
    //         .then(() => {
    //             resetInput();
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    const login = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                resetInput();
                setAuthenticated(true);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const logOut = () => {
        firebase.auth().signOut();
        setAuthenticated(false);
    };

    const resetInput = () => {
        setEmail("");
        setPassword("");
    };
    
    if (authenticated) {
      return (
        <div className="postLogged">
          <div id="welcome-logout-container">
            <div id="welcome">
              <Welcome />
            </div>
            <button id="logout" onClick={logOut}>Log Out</button>
          </div>
          <SnapshotFirebase />
        </div>
      )
    }
    return (
        <><div className="preLogged">
            <div className="centerLogin">
            <div id="welcome">
              <Welcome />
            </div>
              <h1>Login</h1>
              <div className="inputBox">
                {/* <h3>Login/Register</h3> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
                {/* <button onClick={register}>Register</button> */}
                <button className="logBtn" onClick={login}>Login</button>
                <button className="logBtn" onClick={logOut}>Log Out</button>
              </div>
            </div>
          </div>
        </>
      );
};
export default Login;