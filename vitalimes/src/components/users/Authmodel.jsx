import React from "react";

const Authmodal = ({ onGoogleLogin }) => {
  return (
    <>
      <div className="row g-0">

        <div className="col-12 p-4">

          <h3 className="fw-bold">Sign in to Vitalimes</h3>
          <p className="text-muted mb-4">
            Welcome back! Enter your email or phone number to continue.
          </p>

          {/* Email or Phone */}
          <div className="mb-3">
            <label className="form-label">Email or Phone Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter email or phone number"
            />
          </div>

          {/* Send OTP Button */}
          <button className="btn btn-success w-100 mb-3">Send OTP</button>

          <p className="text-center text-muted my-2">or</p>

          {/* Google Sign-In (Optional) */}
          <button
            className="btn btn-outline-dark w-100 mb-3"
            onClick={onGoogleLogin}
          >
            Continue with Google
          </button>

          <p className="text-center">
            Don’t have an account?{" "}
            <a href="#" className="text-success">Sign Up</a>
          </p>

        </div>
      </div>
    </>
  );
};

export default Authmodal;
