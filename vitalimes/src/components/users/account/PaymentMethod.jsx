import React from "react";

export default function PaymentMethods() {
  const payments = [
    {
      id: 1,
      type: "Visa",
      last4: "1234",
      expiry: "10/2023",
      img: "/assets/images/svg-graphics/visa.svg",
      disabled: true,
    },
    {
      id: 2,
      type: "Mastercard",
      last4: "1234",
      expiry: "03/2026",
      img: "/assets/images/svg-graphics/mastercard.svg",
      disabled: false,
    },
    {
      id: 3,
      type: "Discover",
      last4: "1234",
      expiry: "07/2020",
      img: "/assets/images/svg-graphics/discover.svg",
      expired: true,
      disabled: false,
    },
    {
      id: 4,
      type: "American Express",
      last4: "1234",
      expiry: "12/2021",
      img: "/assets/images/svg-graphics/americanexpress.svg",
      disabled: false,
    },
    {
      id: 5,
      type: "Paypal Express",
      last4: "1234",
      expiry: "10/2021",
      img: "/assets/images/svg-graphics/paypal.svg",
      disabled: false,
    },
  ];

  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="py-6 p-md-6 p-lg-10">

        {/* Header */}
        <div className="d-flex justify-content-between mb-6 align-items-center">
          <h2 className="mb-0">Payment Methods</h2>
          <button
            type="button"
            className="btn btn-outline-primary"
            data-bs-toggle="modal"
            data-bs-target="#paymentModal"
          >
            Add Payment
          </button>
        </div>

        {/* Payment List */}
        <ul className="list-group list-group-flush">
          {payments.map((payment) => (
            <li key={payment.id} className="list-group-item py-5 px-0">
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <img src={payment.img} alt={payment.type} className="me-3" />
                  <div className="ms-4">
                    <h5 className="mb-0 h6">
                      {payment.type} ending in {payment.last4}
                    </h5>
                    <p className="mb-0 small">
                      Expires in {payment.expiry}{" "}
                      {payment.expired && (
                        <span className="badge bg-warning text-dark">
                          This card is expired.
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    className={`btn btn-outline-gray-400 btn-sm ${
                      payment.disabled ? "disabled" : "text-muted"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
