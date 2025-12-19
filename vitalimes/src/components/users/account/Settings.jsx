import React from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <>
      {/* Inline CSS for proper widths */}
      <style>{`
        .settings-input {
          width: 100%;
          max-width: 360px; /* SAME as your screenshot */
        }
      `}</style>

      <div className="col-lg-9 col-md-8 col-12">
        <div className="py-6 p-md-6 p-lg-10">

          {/* Page Header */}
          <div className="mb-6">
            <h2 className="mb-0">Account Setting</h2>
          </div>

          {/* Account Details Section */}
          <div>
            <h5 className="mb-4">Account details</h5>

            <div className="row">
              <div className="col-lg-5">

                <form>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control settings-input" placeholder="jitu chauhan" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control settings-input" placeholder="example@gmail.com" />
                  </div>

                  <div className="mb-5">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control settings-input" placeholder="Phone number" />
                  </div>

                  <button type="button" className="btn btn-success">
                    Save Details
                  </button>
                </form>

              </div>
            </div>
          </div>

          <hr className="my-10" />

          {/* Password Section */}
          <div className="pe-lg-14">
            <h5 className="mb-4">Password</h5>

            <form className="row">

              <div className="mb-3 col-lg-6">
                <label className="form-label">New Password</label>
                <input type="password" className="form-control settings-input" placeholder="**********" />
              </div>

              <div className="mb-3 col-lg-6">
                <label className="form-label">Current Password</label>
                <input type="password" className="form-control settings-input" placeholder="**********" />
              </div>

              <div className="col-12">
                <p className="mb-4">
                  Can’t remember your current password?{" "}
                  <Link to="/reset-password">Reset your password.</Link>
                </p>

                <button type="button" className="btn btn-success">
                  Save Password
                </button>
              </div>

            </form>
          </div>

          <hr className="my-10" />

          {/* Delete Account Section */}
          <div>
            <h5 className="mb-4">Delete Account</h5>

            <p className="mb-2">Would you like to delete your account?</p>
            <p className="mb-5">
              This account contains 12 orders. Deleting your account will remove all associated order details.
            </p>

            <button className="btn btn-outline-danger">
              I want to delete my account
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
