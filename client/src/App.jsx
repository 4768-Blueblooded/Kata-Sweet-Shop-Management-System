import { useState, useEffect } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import { getUserFromToken } from "./auth";

function App() {
  const user = getUserFromToken();

  // landing | login | register
  const [screen, setScreen] = useState("landing");

  // If logged in → dashboard (no navbar)
  if (user) {
    return <Dashboard />;
  }

  return (
    <>
      {/* Navbar ONLY on landing page */}
      {screen === "landing" && (
        <Navbar
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
        />
      )}

      {/* Public Screens */}
      {screen === "landing" && (
        <LandingPage
          onLogin={() => setScreen("login")}
          onRegister={() => setScreen("register")}
        />
      )}

      {screen === "login" && <Login onSwitch={() => setScreen("register")} />}

      {screen === "register" && (
        <Register onSwitch={() => setScreen("login")} />
      )}
    </>
  );
}

export default App;
