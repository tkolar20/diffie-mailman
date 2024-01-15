import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
//import { DiffieHellman } from "./dh";
import cry from "crypto-browserify";
import Cookies from "js-cookie";
import { Buffer } from "buffer";
import forge from "node-forge";
import dh from "./dh";
import { Key } from "./key";
window.Buffer = window.Buffer || Buffer;
//import { createHash } from "node:crypto";

export default function Auth() {
  const [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (authMode === "signin") {
        console.log("Logging in!");
        var response = await fetch("http://localhost:4000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((data) => data.json())
          .then((dataJSON) => {
            console.log(dataJSON.Email);
            document.cookie = `attributes=${JSON.stringify({
              key: "email",
              email: dataJSON.Email,
            })}; path=/`;
            console.log("Socket");
            const socket = new WebSocket("ws://localhost:4000");
            socket.addEventListener("open", () => {
              socket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if ("prime" in data) {
                  const clientDH = dh.createDiffieHellman( data.prime, 'base64', data.generator, 'base64' );
                    const publicKey = clientDH.generateKeys();
                    socket.send( JSON.stringify( { "publickey": publicKey.toString( 'base64' ), "email":dataJSON.Email } ) );
                    console.log( JSON.stringify( { "publickey": publicKey.toString( 'base64' ) } ) );
                    console.log( "Server public key:" + data.publickey );
                    const secret = clientDH.computeSecret( data.publickey );
                    const realSecret = secret.toString( 'base64' );
                    console.log( realSecret );
                  
                    var md = forge.md.sha256.create();
                    md.update(realSecret);
                    console.log(console.log("AesKey:" + md.digest().toHex()));
                    const aesKey = md.digest();
                    Key.aeskey = aesKey;
                    console.log(Key.aeskey);
                    socket.close();
            navigate("/mail");
                }})});
          });
      } else {
        console.log("Registering");
        response = await fetch("http://localhost:4000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        })
          .then((data) => data.json())
          .then((dataJSON) => {
            console.log(dataJSON.Email);
            document.cookie = `attributes=${JSON.stringify({
              key: "email",
              email: dataJSON.Email,
            })}; path=/`;
            console.log("Socket");
            const socket = new WebSocket("ws://localhost:4000");
            socket.addEventListener("open", () => {
              socket.addEventListener("message", (event) => {
                const data = JSON.parse(event.data);
                console.log(data);
                if ("prime" in data) {
                  const clientDH = dh.createDiffieHellman( data.prime, 'base64', data.generator, 'base64' );
                    const publicKey = clientDH.generateKeys();
                    socket.send( JSON.stringify( { "publickey": publicKey.toString( 'base64' ), "email":dataJSON.Email } ) );
                    console.log( JSON.stringify( { "publickey": publicKey.toString( 'base64' ) } ) );
                    console.log( "Server public key:" + data.publickey );
                    const secret = clientDH.computeSecret( data.publickey );
                    const realSecret = secret.toString( 'base64' );
                    console.log( realSecret );
                  
                    var md = forge.md.sha256.create();
                    md.update(realSecret);
                    console.log(console.log("AesKey:" + md.digest().toHex()));
                    const aesKey = md.digest();
                    Key.aeskey = aesKey;
                    socket.close();
                 navigate("/mail");
                }
              });
            });
          });
      }

      if (200) {
        // Successful request
        console.log("Data successfully sent!");

        // Reset the form fields
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        // Handle error response
        console.error(
          "Failed to send data. Server returned:"
          // response.status,
          // response.statusText
        );
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <div className="d-flex flex-column align-items-center">
            <img
              src="/logo/Diffe-Mailman-Empty.png"
              alt="Diffe-Mailman Logo"
              style={{ width: "128px", height: "128px", marginBottom: "15px" }}
            />
            <h3 className="Auth-form-title">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </h3>
          </div>
          <div className="text-center">
            {authMode === "signin" ? (
              <>
                Not registered yet?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already registered?{" "}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </>
            )}
          </div>
          {authMode === "signup" && (
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="e.g johndoe123"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
