

import React from "react";
import "./About.css";

export default function About() {
  const base = "";

  return (
    <div className="about-wrapper">

      {/* ---------------------------------------------------------------- */}
      {/* HERO SECTION */}
      {/* ---------------------------------------------------------------- */}
      <section className="hero-banner" style={{
          backgroundImage: `url(/assets/images/about_banner.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "450px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: "60px",
          color: "white",
          textAlign: "left",
          position: "relative",
        }}>
        <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(1px)",
          }} />
        <div style={{ position: "relative", maxWidth: "550px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: "800", marginBottom: "15px" }}>Do You Want To Know Us?</h1>
          <p style={{ fontSize: "20px", lineHeight: "1.6", fontWeight: "400" }}>
            Pure. Natural. Sustainable. From farms to your home — Vitalimes is
            committed to delivering premium lemon-based health products crafted
            with care, purity, and honesty.
          </p>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
{/* ABOUT VITALIME INTRO SECTION */}
{/* ---------------------------------------------------------------- */}
          {/* ---------------------------------------------------------------- */}
{/* ABOUT VITALIME – LEFT CONTENT / RIGHT IMAGE */}
{/* ---------------------------------------------------------------- */}
<section className="about-vitalime-section">
  <div className="container">
    <div className="row align-items-stretch g-5 about-vitalime-row">

      {/* LEFT CONTENT */}
      <div className="col-lg-6 d-flex">
        <div className="about-vitalime-content">
          <h2 className="about-vitalime-title">About Vitalime</h2>

          <p>
            <strong>Vitalime Agrotech Private Limited</strong> was founded with a
            strong vision to improve the welfare of Indian farmers while delivering
            pure, natural, and sustainable products to consumers.
          </p>

          <p>
            Established in <strong>2021 by Mr. S. Kandasamy</strong>, the company
            was created to strengthen the local socio-economic fabric by motivating
            farmers to adopt value-driven lemon cultivation and achieve long-term
            economic stability.
          </p>

          <p className="about-vitalime-highlight">
            Today, Vitalime actively supports over <strong>250 local farmers</strong>
            engaged in lemon farming across <strong>500 acres</strong> in Villiseri
            village, ensuring regular income, assured procurement, and fair value
            for their hard work.
          </p>

          <p>
            We transform the fruits of their dedication into high-quality,
            value-added lemon products for domestic and global markets.
          </p>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="col-lg-6 d-flex text-center">
        <img
          src="/assets/images/about.png"
          alt="About Vitalime"
          className="about-vitalime-image"
        />
      </div>

    </div>
  </div>
</section>
   {/* ---------------------------------------------------------------- */}
{/* STATS SECTION */}
{/* ---------------------------------------------------------------- */}
<section className="stats-fullwidth-section">
  <div className="stats-grid">

    <div className="stat-box">
      <h2>60M+</h2>
      <p>Happy Customers</p>
    </div>

    <div className="stat-box">
      <h2>105M+</h2>
      <p>Grocery Products</p>
    </div>

    <div className="stat-box">
      <h2>80K+</h2>
      <p>Active Salesman</p>
    </div>

    <div className="stat-box">
      <h2>60K+</h2>
      <p>Store Worldwide</p>
    </div>

  </div>
</section>






      {/* ---------------------------------------------------------------- */}
      {/* VISION, MISSION & COMMITMENT SECTION */}
      {/* ---------------------------------------------------------------- */}
      <section className="vmc-section">
  <div className="container">
    <div className="row g-4">

      {/* Vision */}
      <div className="col-lg-4 col-md-12">
        <div className="vmc-card">
          <img
            src="/assets/images/About/vission.png"
            alt="Our Vision"
            className="vmc-icon"
          />
          <h3 className="vmc-title">Our Vision</h3>
          <p className="vmc-text">
            To become a leading producer of 100% natural, chemical-free,
            preservative-free lemon-based value-added products that offer a
            powerful alternative to synthetic products.
          </p>
          <ul className="vmc-list">
            <li>Eco-friendly and sustainable manufacturing</li>
            <li>Empowering farmers with stable livelihoods</li>
            <li>Preserving nature while delivering safe products</li>
          </ul>
          <p className="vmc-quote">
            “We bring originality to the synthetic world.”
          </p>
        </div>
      </div>

      {/* Mission */}
      <div className="col-lg-4 col-md-12">
        <div className="vmc-card">
          <img
            src="/assets/images/About/mission.png"
            alt="Our Mission"
            className="vmc-icon"
          />
          <h3 className="vmc-title">Our Mission</h3>
          <p className="vmc-text">
            To deliver complete customer satisfaction by maintaining the
            highest standards in quality, safety, consistency, and service.
          </p>
          <ul className="vmc-list">
            <li>Direct sourcing from farmers</li>
            <li>Natural, chemical-free production processes</li>
            <li>Strict quality control at every stage</li>
            <li>Reliable after-sales support</li>
            <li>Continuous improvement and innovation</li>
          </ul>
        </div>
      </div>

      {/* Commitment */}
      <div className="col-lg-4 col-md-12">
        <div className="vmc-card">
          <img
            src="/assets/images/About/commit.png"
            alt="Our Commitment"
            className="vmc-icon"
          />
          <h3 className="vmc-title">Our Commitment</h3>
          <ul className="vmc-list">
            <li>100% natural ingredients, zero chemicals</li>
            <li>Fair and transparent farmer partnerships</li>
            <li>Zero-waste lemon utilization</li>
            <li>Eco-friendly processing and packaging</li>
            <li>Safe, effective, and trustworthy products</li>
          </ul>
          <p className="vmc-text">
            Choosing Vitalime means choosing health, farmer empowerment,
            and environmental responsibility.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>


      {/* ---------------------------------------------------------------- */}
      {/* ABOUT DESTINATION SECTION */}
      {/* ---------------------------------------------------------------- */}
<section className="product-portfolio-section">
  <div className="container">

    <div className="portfolio-header">
      <h2>Our Natural Product Portfolio</h2>
      <p>
        Our carefully crafted lemon-based product range reflects purity,
        sustainability, and value-added innovation.
      </p>
    </div>

    <div className="portfolio-grid">

      <div className="portfolio-card">Lemon Powder</div>
      <div className="portfolio-card">Lemon Sarsaparilla (Nannari) Juice Powder</div>
      <div className="portfolio-card">Lemon Juice Mix</div>
      <div className="portfolio-card">Lemon Sarsaparilla (Nannari) Juice Mix</div>
      <div className="portfolio-card">Black Lemon Dry</div>
      <div className="portfolio-card">Black Lemon Powder</div>
      <div className="portfolio-card">Lemon Peel Dry</div>
      <div className="portfolio-card">Lemon Peel Powder</div>
      <div className="portfolio-card">Lemon Essential Oil</div>
      <div className="portfolio-card">Lemon Seed Oil</div>
      <div className="portfolio-card">Lemon Seed Powder</div>

    </div>

  </div>
</section>



      {/* ---------------------------------------------------------------- */}
      {/* FOUNDER SECTION */}
      {/* ---------------------------------------------------------------- */}
      <section className="founder-section container">
        <div className="row align-items-center">

          <div className="col-lg-5 text-center">
            <img
              src={`/assets/images/founder.jpeg`}
              alt="Vitalimes Founder"
              className="founder-photo"
            />
          </div>

          <div className="col-lg-7">
            <h2 className="founder-title">Meet Our Founder</h2>

            <h3 className="founder-name">Mr. S. Kandasamy</h3>

            <p className="founder-quote">
              “Bringing farm-fresh purity to every Indian household.”
            </p>

            <p className="founder-desc">
              With a strong vision rooted in sustainability and farmer empowerment,
              Mr. Kandasamy established <b>Vitalimes</b> to deliver premium,
              chemical-free lemon products sourced directly from Villiseri farmers.
              His mission is to uplift families, promote natural wellness, and
              provide truly pure lemon-based products to the world.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* WHY CHOOSE US */}
      {/* ---------------------------------------------------------------- */}
      <section className="why-choose-section container text-center">
        <h2>Why You Choose Us?</h2>
        <p className="why-sub">
          We bring the best of nature with unmatched purity and trust.
        </p>

        <div className="row g-4 mt-4">

          <div className="col-md-4">
            <div className="choose-card">
              <img src={`/assets/icons/farm_2.png`} className="choose-icon" alt="Pure & Organic" />
              <h4>Pure & Organic</h4>
              <p>100% natural lemon products — free from chemicals.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="choose-card">
              <img src={`/assets/icons/factory_2.png`} className="choose-icon" alt="Hygienic Processing" />
              <h4>Hygienic Processing</h4>
              <p>Our modern facility ensures safety & purity.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="choose-card">
              <img src={`/assets/icons/kitchen.png`} className="choose-icon" alt="Farm to Home" />
              <h4>Farm-to-Home</h4>
              <p>Direct sourcing from farmers ensures freshness.</p>
            </div>
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* CUSTOMER FEEDBACK */}
      {/* ---------------------------------------------------------------- */}
      <section className="testimonial-section container">
        <h2 className="text-center">Customer Feedback</h2>

        <div className="row g-4 mt-4">

          <div className="col-md-4">
            <div className="testimonial-card shadow-sm">
              <img src={`/assets/images/person_1.jpg`} className="test-photo" />
              <h5>Andrew D. Smith</h5>
              <p className="role">Customer</p>
              <p className="feedback">
                “Vitalimes lemon powder is the best! Pure, flavorful and fresh.”
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial-card shadow-sm">
              <img src={`/assets/images/person_2.jpg`} className="test-photo" />
              <h5>Maria Steven</h5>
              <p className="role">Customer</p>
              <p className="feedback">
                “Authentic lemon products and great customer service.”
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="testimonial-card shadow-sm">
              <img src={`/assets/images/person_4.jpg`} className="test-photo" />
              <h5>Jonathan Lee</h5>66
              <p className="role">Customer</p>
              <p className="feedback">
                “Perfect for daily use. Hygienic and trustworthy brand.”
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
