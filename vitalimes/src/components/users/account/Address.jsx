import React from "react";

export default function Address() {
  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="py-6 p-md-6 p-lg-10">

        {/* Top heading + button */}
        <div className="d-flex align-items-center justify-content-between mb-6">
          <h2 className="mb-0">Address</h2>

          <a
            href="#"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#addAddressModal"
          >
            Add a new address
          </a>
        </div>

        <div className="row">

          {/* Home Address */}
          <div className="col-xl-5 col-lg-6 col-xxl-4 col-12 mb-4">
            <div className="card">
              <div className="card-body p-6">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressRadio"
                    id="homeRadio"
                    defaultChecked
                  />
                  <label
                    className="form-check-label text-dark fw-semibold"
                    htmlFor="homeRadio"
                  >
                    Home
                  </label>
                </div>

                <p className="mb-6">
                  Jitu Chauhan<br />
                  4450 North Avenue Oakland,<br />
                  Nebraska, United States,<br />
                  402-776-1106
                </p>

                <a href="#" className="btn btn-info btn-sm">
                  Default address
                </a>

                <div className="mt-4">
                  <a href="#" className="text-inherit">Edit</a>
                  <a
                    href="#"
                    className="text-danger ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Office Address */}
          <div className="col-xl-5 col-lg-6 col-xxl-4 col-12 mb-4">
            <div className="card">
              <div className="card-body p-6">
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="addressRadio"
                    id="officeRadio"
                  />
                  <label
                    className="form-check-label text-dark fw-semibold"
                    htmlFor="officeRadio"
                  >
                    Office
                  </label>
                </div>

                <p className="mb-6">
                  Nitu Chauhan<br />
                  3853 Coal Road<br />
                  Tannersville, Pennsylvania, 18372, United States<br />
                  402-776-1106
                </p>

                <a href="#" className="link-primary">Set as Default</a>

                <div className="mt-4">
                  <a href="#" className="text-inherit">Edit</a>
                  <a
                    href="#"
                    className="text-danger ms-3"
                    data-bs-toggle="modal"
                    data-bs-target="#deleteModal"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
