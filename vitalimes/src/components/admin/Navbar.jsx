import React from "react";
import "./assets/css/theme.min.css";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-glass">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center w-100">
          {/* Left side: menu + search */}
          <div className="d-flex align-items-center">
            <a
              className="text-inherit d-block d-xl-none me-4"
              data-bs-toggle="offcanvas"
              href="#offcanvasExample"
              role="button"
              aria-controls="offcanvasExample"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-text-indent-right"
                viewBox="0 0 16 16"
              >
                <path d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm10.646 2.146a.5.5 0 0 1 .708.708L11.707 8l1.647 1.646a.5.5 0 0 1-.708.708l-2-2a.5.5 0 0 1 0-.708l2-2zM2 6.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
              </svg>
            </a>

            
          </div>

          {/* Right side: notifications + profile */}
          <div>
            <ul className="list-unstyled d-flex align-items-center mb-0 ms-5 ms-lg-0">
              {/* Notifications */}
              <li className="dropdown-center">
                <a
                  className="position-relative btn-icon btn-ghost-secondary btn rounded-circle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-bell fs-5"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger mt-2 ms-n2">
                    2
                    <span className="visually-hidden">unread messages</span>
                  </span>
                </a>

                {/* Dropdown menu */}
                <div className="dropdown-menu dropdown-menu-end dropdown-menu-lg p-0 border-0">
                  <div className="border-bottom p-5 d-flex justify-content-between align-items-center">
                    <div>
                      <h5 className="mb-1">Notifications</h5>
                      <p className="mb-0 small">You have 2 unread messages</p>
                    </div>
                    <a
                      href="#"
                      className="btn btn-ghost-secondary btn-icon rounded-circle"
                      data-bs-toggle="tooltip"
                      data-bs-placement="bottom"
                      data-bs-title="Mark all as read"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        fill="currentColor"
                        className="bi bi-check2-all text-success"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z" />
                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z" />
                      </svg>
                    </a>
                  </div>

                  {/* Notification list */}
                  <div data-simplebar style={{ height: "250px" }}>
                    <ul className="list-group list-group-flush notification-list-scroll fs-6">
                      <li className="list-group-item px-5 py-4 list-group-item-action active">
                        <a href="#!" className="text-muted">
                          <div className="d-flex">
                            <img
                              src="../assets/images/avatar/avatar-1.jpg"
                              alt=""
                              className="avatar avatar-md rounded-circle"
                            />
                            <div className="ms-4">
                              <p className="mb-1">
                                <span className="text-dark">
                                  Your order is placed
                                </span>{" "}
                                waiting for shipping
                              </p>
                              <span>
                                <i className="bi bi-clock text-muted"></i>
                                <small className="ms-2">1 minute ago</small>
                              </span>
                            </div>
                          </div>
                        </a>
                      </li>
                      {/* Add other list items here */}
                    </ul>
                  </div>

                  <div className="border-top px-5 py-4 text-center">
                    <a href="#!">View All</a>
                  </div>
                </div>
              </li>

              {/* Profile dropdown */}
              <li className="dropdown ms-4">
                <a href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                    src="../assets/images/avatar/avatar-1.jpg"
                    alt=""
                    className="avatar avatar-md rounded-circle"
                  />
                </a>

                <div className="dropdown-menu dropdown-menu-end p-0">
                  <div className="lh-1 px-5 py-4 border-bottom">
                    <h5 className="mb-1 h6">FreshCart Admin</h5>
                    <small>admindemo@email.com</small>
                  </div>

                  <ul className="list-unstyled px-2 py-3">
                    <li><a className="dropdown-item" href="#!">Home</a></li>
                    <li><a className="dropdown-item" href="#!">Profile</a></li>
                    <li><a className="dropdown-item" href="#!">Settings</a></li>
                  </ul>

                  <div className="border-top px-5 py-3">
                    <a href="#">Log Out</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
