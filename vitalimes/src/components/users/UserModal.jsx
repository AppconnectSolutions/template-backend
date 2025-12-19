import Authmodal from "./Authmodel";

export default function UserModal() {
  return (
    <div
      className="modal fade"
      id="userModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content p-4">

          {/* Close button */}
          <button
            type="button"
            className="btn-close ms-auto"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>

          {/* Sign In form */}
          <Authmodal />

        </div>
      </div>
    </div>
  );
}
