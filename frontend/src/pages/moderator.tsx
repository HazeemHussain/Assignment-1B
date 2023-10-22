import LoginForm from "@/components/userLogin/LoginForm";
import ModeratorView from "@/components/userLogin/ModeratorView";
import React, { useState } from 'react';


export default function ModeratorPage() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
  };

  return (
    <div className="container">
     

      {loggedIn ? (
        <ModeratorView/>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} /> // Pass the callback as a prop
      )}
    </div>
  );
}
