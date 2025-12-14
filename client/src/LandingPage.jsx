// import sweetHero from "./assets/sweet-landing.png";
// import { useEffect } from "react";

// function LandingPage({ onLogin, onRegister }) {
//   useEffect(() => {
//     const revealElements = document.querySelectorAll(".reveal");

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("active");
//           }
//         });
//       },
//       { threshold: 0.12 }
//     );

//     revealElements.forEach((el) => observer.observe(el));
//   }, []);

//   return (
//     <div className="landing-wrapper">
//       {/* HERO */}
//       <section className="landing" id="home">
//         <div className="landing-content reveal">
//           <div className="landing-text">
//             <h1>🍧Sweet Shop Manager</h1>
//             <p>
//               Manage inventory, track sales, and run your sweet shop smarter —
//               all in one place.
//             </p>

//             <div className="landing-actions">
//               <button onClick={onRegister}>Get Started</button>
//               <button className="outline" onClick={onLogin}>
//                 Login
//               </button>
//             </div>
//           </div>

//           <div className="landing-image gradient-glow curved">
//             <img src={sweetHero} alt="Sweet Shop Illustration" />
//           </div>
//         </div>
//       </section>

//       {/*  FEATURES  */}
//       <section className="landing-features soft-divider" id="features">
//         <h2 className="reveal">Why Sweet Shop Manager?</h2>

//         <div className="features-grid">
//           <div className="feature-card reveal">
//             <span className="feature-icon">📦</span>
//             <h3>Inventory Control</h3>
//             <p>Add, edit, and manage sweets with real-time stock updates.</p>
//           </div>

//           <div className="feature-card reveal">
//             <span className="feature-icon">💰</span>
//             <h3>Sales Tracking</h3>
//             <p>Record sales instantly and view detailed reports anytime.</p>
//           </div>

//           <div className="feature-card reveal">
//             <span className="feature-icon">👥</span>
//             <h3>Role-Based Access</h3>
//             <p>Admins manage everything, staff focus on selling.</p>
//           </div>
//         </div>
//       </section>

//       {/*  TESTIMONIALS  */}
//       <section className="landing-testimonials soft-divider" id="testimonials">
//         <h2 className="reveal">Loved by Sweet Shop Owners</h2>

//         <div className="testimonials-grid">
//           <div className="testimonial-card reveal">
//             <p>
//               “Stock tracking is effortless now. We never over-sell anymore.”
//             </p>
//             <h4>— Rajesh Gupta</h4>
//             <span>Gupta Sweets</span>
//           </div>

//           <div className="testimonial-card reveal">
//             <p>“Sales reports are instant. Perfect for daily decisions.”</p>
//             <h4>— Ananya Sharma</h4>
//             <span>Sharma Mithai</span>
//           </div>

//           <div className="testimonial-card reveal">
//             <p>“Very easy for staff to learn. Clean and fast UI.”</p>
//             <h4>— Mohit Verma</h4>
//             <span>Verma Sweets</span>
//           </div>
//         </div>
//       </section>

//       {/*  ADMIN vs STAFF  */}
//       <section className="landing-pricing soft-divider" id="roles">
//         <h2 className="reveal">Choose Your Role</h2>
//         <p className="reveal subtitle">
//           One system — different responsibilities.
//         </p>

//         <div className="pricing-grid">
//           <div className="pricing-card reveal">
//             <h3>👨‍🍳 Staff</h3>
//             <ul>
//               <li>✔ Make sales</li>
//               <li>✔ View sweets</li>
//               <li>✔ Auto stock deduction</li>
//               <li>✖ No price editing</li>
//               <li>✖ No reports</li>
//             </ul>
//             <span className="price-tag">Free</span>
//           </div>

//           <div className="pricing-card featured reveal">
//             <h3>👑 Admin</h3>
//             <ul>
//               <li>✔ Full inventory</li>
//               <li>✔ Edit price & stock</li>
//               <li>✔ Sales reports</li>
//               <li>✔ Staff control</li>
//             </ul>
//             <span className="price-tag">Owner Access</span>
//           </div>
//         </div>
//       </section>

//       {/*  CTA  */}
//       <section className="landing-cta reveal">
//         <h2>Ready to run your sweet shop smarter?</h2>
//         <p>Start managing inventory and sales today.</p>
//         <button onClick={onRegister}>Create Account</button>
//       </section>

//       <footer className="site-footer">
//         <div className="footer-content">
//           <h3>🍧Sweet Shop Manager</h3>

//           <p>
//             Built with ❤️ by <strong>Abir Chakraborty</strong>
//           </p>

//           <div className="footer-links">
//             <a href="mailto:chakrabortyabir4768@gmail.com">Email</a>
//             <a href="https://github.com/4768-Blueblooded" target="_blank">
//               GitHub
//             </a>
//             <a
//               href="https://linkedin.com/in/abir-chakraborty-53390926a/"
//               target="_blank"
//             >
//               LinkedIn
//             </a>
//             <div class="footer-signature">
//               <img src="/assets/abir.png" alt="Abir Chakraborty" />
//               <a
//                 href="https://drive.google.com/file/d/1jw3ZsBqdmnaTOTBuac2wZh9ttKRzzWQP/view?usp=sharing"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 Resume
//               </a>
//             </div>
//           </div>

//           <p className="footer-note">© 2025 Sweet Shop Management System</p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default LandingPage;

import sweetHero from "./assets/sweet-landing.png";
import abirAvatar from "./assets/abir.png";
import { useEffect } from "react";

function LandingPage({ onLogin, onRegister }) {
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div className="landing-wrapper">
      {/* HERO */}
      <section className="landing" id="home">
        <div className="landing-content reveal">
          <div className="landing-text">
            <h1>🍧Sweet Shop Manager</h1>
            <p>
              Manage inventory, track sales, and run your sweet shop smarter —
              all in one place.
            </p>

            <div className="landing-actions">
              <button onClick={onRegister}>Get Started</button>
              <button className="outline" onClick={onLogin}>
                Login
              </button>
            </div>
          </div>

          <div className="landing-image gradient-glow curved">
            <img src={sweetHero} alt="Sweet Shop Illustration" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-features soft-divider" id="features">
        <h2 className="reveal">Why Sweet Shop Manager?</h2>

        <div className="features-grid">
          <div className="feature-card reveal">
            <span className="feature-icon">📦</span>
            <h3>Inventory Control</h3>
            <p>Add, edit, and manage sweets with real-time stock updates.</p>
          </div>

          <div className="feature-card reveal">
            <span className="feature-icon">💰</span>
            <h3>Sales Tracking</h3>
            <p>Record sales instantly and view detailed reports anytime.</p>
          </div>

          <div className="feature-card reveal">
            <span className="feature-icon">👥</span>
            <h3>Role-Based Access</h3>
            <p>Admins manage everything, staff focus on selling.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="landing-testimonials soft-divider" id="testimonials">
        <h2 className="reveal">Loved by Sweet Shop Owners</h2>

        <div className="testimonials-grid">
          <div className="testimonial-card reveal">
            <p>
              “Stock tracking is effortless now. We never over-sell anymore.”
            </p>
            <h4>— Rajesh Gupta</h4>
            <span>Gupta Sweets</span>
          </div>

          <div className="testimonial-card reveal">
            <p>“Sales reports are instant. Perfect for daily decisions.”</p>
            <h4>— Ananya Sharma</h4>
            <span>Sharma Mithai</span>
          </div>

          <div className="testimonial-card reveal">
            <p>“Very easy for staff to learn. Clean and fast UI.”</p>
            <h4>— Mohit Verma</h4>
            <span>Verma Sweets</span>
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section className="landing-pricing soft-divider" id="roles">
        <h2 className="reveal">Choose Your Role</h2>
        <p className="reveal subtitle">
          One system — different responsibilities.
        </p>

        <div className="pricing-grid">
          <div className="pricing-card reveal">
            <h3>👨‍🍳 Staff</h3>
            <ul>
              <li>✔ Make sales</li>
              <li>✔ View sweets</li>
              <li>✔ Auto stock deduction</li>
              <li>✖ No price editing</li>
              <li>✖ No reports</li>
            </ul>
            <span className="price-tag">Free</span>
          </div>

          <div className="pricing-card featured reveal">
            <h3>👑 Admin</h3>
            <ul>
              <li>✔ Full inventory</li>
              <li>✔ Edit price & stock</li>
              <li>✔ Sales reports</li>
              <li>✔ Staff control</li>
            </ul>
            <span className="price-tag">Owner Access</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta reveal">
        <h2>Ready to run your sweet shop smarter?</h2>
        <p>Start managing inventory and sales today.</p>
        <button onClick={onRegister}>Create Account</button>
      </section>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-content">
          <h3>🍧Sweet Shop Manager</h3>

          <p>
            Built with ❤️ by <strong>Abir Chakraborty</strong>
          </p>

          <div className="footer-links">
            <a href="mailto:chakrabortyabir4768@gmail.com">Email</a>
            <a href="https://github.com/4768-Blueblooded" target="_blank">
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/abir-chakraborty-53390926a/"
              target="_blank"
            >
              LinkedIn
            </a>

            <a
              href="https://drive.google.com/file/d/1jw3ZsBqdmnaTOTBuac2wZh9ttKRzzWQP/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="resume-link"
            >
              <img src={abirAvatar} alt="Abir Chakraborty" />
              Resume
            </a>
          </div>

          <p className="footer-note">© 2025 Sweet Shop Management System</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
