import React from "react";

export default function NotificationSettings() {
  return (
    <div className="col-lg-9 col-md-8 col-12">
      <div className="py-6 p-md-6 p-lg-10">

        {/* Header */}
        <div className="mb-6">
          <h2 className="mb-0">Notification settings</h2>
        </div>

        {/* Email Notifications */}
        <div className="mb-10">
          <div className="border-bottom pb-3 mb-5">
            <h5 className="mb-0">Email Notifications</h5>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h6 className="mb-1">Weekly Notification</h6>
              <p className="mb-0">
                Various versions have evolved over the years, sometimes by accident, sometimes on purpose.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="weeklyNotification"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Account Summary</h6>
              <p className="mb-0 pe-12">
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas eu sollicitudin massa.
              </p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="accountSummary"
                defaultChecked
              />
            </div>
          </div>
        </div>

        {/* Order Updates */}
        <div className="mb-10">
          <div className="border-bottom pb-3 mb-5">
            <h5 className="mb-0">Order updates</h5>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-6">
            <div>
              <h6 className="mb-0">Text messages</h6>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="textMessages"
              />
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h6 className="mb-1">Call before checkout</h6>
              <p className="mb-0">We'll only call if there are pending changes</p>
            </div>
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="callBeforeCheckout"
                defaultChecked
              />
            </div>
          </div>
        </div>

        {/* Website Notifications */}
        <div className="mb-6">
          <div className="border-bottom pb-3 mb-5">
            <h5 className="mb-0">Website Notification</h5>
          </div>

          <div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="newFollower" defaultChecked />
              <label className="form-check-label" htmlFor="newFollower">New Follower</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="postLike" />
              <label className="form-check-label" htmlFor="postLike">Post Like</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="someonePosted" />
              <label className="form-check-label" htmlFor="someonePosted">Someone you followed posted</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="postCollection" />
              <label className="form-check-label" htmlFor="postCollection">Post added to collection</label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="orderDelivery" />
              <label className="form-check-label" htmlFor="orderDelivery">Order Delivery</label>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
