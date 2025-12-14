import React from "react";

function Navbar({ onLogin, onRegister, toggleTheme, theme }) {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar">
      {/* LOGO = HOME */}
      <div
        className="navbar-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ cursor: "pointer" }}
      >
        🍧 Sweet Shop Manager
      </div>

      {/* LINKS */}
      <div className="navbar-links">
        <button onClick={() => scrollToSection("features")}>Features</button>
        <button onClick={() => scrollToSection("roles")}>Roles</button>
        <button onClick={() => scrollToSection("testimonials")}>
          Testimonials
        </button>
      </div>

      {/* ACTIONS */}
      <div className="navbar-actions">
        <button className="outline" onClick={onLogin}>
          Login
        </button>

        <button onClick={onRegister}>Get Started</button>
      </div>
    </nav>
  );
}

export default Navbar;
