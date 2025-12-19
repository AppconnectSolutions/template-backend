import React, { useState } from 'react';
import './Contact.css';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
    // TODO: add API call to submit form
  };

  return (
    <div className="contact-page">

      {/* Banner */}
      <section
        className="contact-hero"
        style={{ backgroundImage: 'url(/assets/images/about_banner.png)' }}
      >
        <div className="overlay" />
        <div className="container hero-content text-white">
          <h1>Ask Us Question</h1>
          <p className="lead">Contact us for all your questions and opinions — we will respond shortly.</p>
        </div>
      </section>

      <div className="container mt-5">
        <div className="row g-4 stores-map-row">

          {/* Left: Store Cards */}
          <div className="col-lg-5 d-flex flex-column gap-3">
            <div className="store-card p-4 mb-0">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-wrap bg-light rounded-circle p-3">
                  <img src="/assets/icons/farm_2.png" alt="pin" className="store-icon" />
                </div>
                <div>
                  <h5>Vitalimes  Store</h5>
                  <p className="mb-1 small text-muted">Vitalime Agrotech Private Limited, Kovilpatti - 628503, India</p>
                </div>
              </div>
            </div>

            <div className="store-card p-4 mb-0">
              <div className="d-flex align-items-center gap-3">
                <div className="icon-wrap bg-light rounded-circle p-3">
                  <img src="/assets/icons/farm_2.png" alt="pin" className="store-icon" />
                </div>
                <div>
                  <h5>Connect with Us</h5>
                  <p className="mb-1 small text-muted"> </p>
                 <p className="mb-0"> contact@vitalimes.com</p>

                  <p className="mb-0"><strong> We look forward to hearing from you through the above details!</strong></p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Map */}
          <div className="col-lg-7 d-flex">
            <div className="map-wrapper rounded flex-fill">
              <iframe
                title="store-map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2939.0970219895995!2d77.87131631531202!3d9.175872531502776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba56de67984d0f3%3A0xafff89db08c3b3d6!2sVitalimes%20Agrotech%20Private%20Limited!5e0!3m2!1sen!2sin!4v1677775841823!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '320px' }}
                allowFullScreen=""
                loading="lazy"
              />
              <div className="map-hint">Use ctrl + scroll to zoom the map</div>
            </div>
          </div>

        </div>

        {/* Form panel */}
        <div className="contact-panel rounded mt-5 p-4">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h3>Fill Up The Form If You Have Any Question</h3>
              <form onSubmit={handleSubmit} className="mt-3">
                <div className="row g-3">
                  <div className="col-md-6">
                    <input className="form-control" name="name" placeholder="name*" required value={formData.name} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <input className="form-control" name="email" placeholder="Email*" type="email" required value={formData.email} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-12">
                    <select className="form-select" name="category" value={formData.category} onChange={handleInputChange}>
                      <option value="">All Categories</option>
                      <option value="orders">Orders</option>
                      <option value="products">Products</option>
                      <option value="support">Support</option>
                    </select>
                  </div>
                  <div className="col-md-12">
                    <textarea className="form-control" rows="5" name="message" placeholder="Write Message Here" value={formData.message} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-12">
                    <button className="btn btn-success">Send Message</button>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-5 d-flex align-items-center justify-content-center">
              <img src="/assets/images/About/about_1.png" alt="contact" className="img-fluid rounded shadow-sm contact-side-image" />
            </div>
          </div>
        </div>

        {/* Feature strip */}
        <div className="features-strip rounded mt-4 p-4 text-white">
          <div className="feature-item">
            <div className="feature-icon-wrap">
              <img src="/assets/icons/farm_2.png" className="feature-icon" alt="Best Prices" />
            </div>
            <div>
              <div className="fw-bold">Best Prices & Offers</div>
              <div className="small">We prepared special discounts you on grocery products.</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <img src="/assets/icons/kitchen.png" className="feature-icon" alt="Return Policy" />
            </div>
            <div>
              <div className="fw-bold">100% Return Policy</div>
              <div className="small">We prepared special discounts you on grocery products.</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <img src="/assets/icons/factory_2.png" className="feature-icon" alt="Support" />
            </div>
            <div>
              <div className="fw-bold">Support 24/7</div>
              <div className="small">We prepared special discounts you on grocery products.</div>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon-wrap">
              <img src="/assets/icons/kitchen.png" className="feature-icon" alt="Daily Deal" />
            </div>
            <div>
              <div className="fw-bold">Great Offer Daily Deal</div>
              <div className="small">We prepared special discounts you on grocery products.</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
