import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [twitterUser, setTwitterUser] = useState(null);
  const [twitterId, setTwitterId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    const id = params.get("id");

    if (user && id) {
      setTwitterUser(user);
      setTwitterId(id);

      // Clear query params from URL for a cleaner look
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h1>Sign in with Twitter</h1>
      {!twitterUser ? (
        <a href="http://localhost:5000/auth/twitter">
          <button className="twitter-button">Login with Twitter</button>
        </a>
      ) : (
        <p>Welcome, @{twitterUser} (ID: {twitterId})!</p>
      )}
    </div>
  );
}

export default Login;
