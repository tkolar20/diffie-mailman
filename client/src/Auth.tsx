import React, { useState } from "react";

export default function Auth() {
  const [authMode, setAuthMode] = useState("signin");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    var response: Response;
    try {
      if (authMode === "signin") {
        console.log("Logging in!");
        response = await fetch("localhost:4000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        console.log(response);
      } else {
        console.log("Registering");
        response = await fetch("localhost:4000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });
        console.log(response);
      }

      if (response.ok) {
        // Successful request
        console.log("Data successfully sent!");

        // Reset the form fields
        setUsername("");
        setEmail("");
        setPassword("");
      } else {
        // Handle error response
        console.error(
          "Failed to send data. Server returned:",
          response.status,
          response.statusText
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
