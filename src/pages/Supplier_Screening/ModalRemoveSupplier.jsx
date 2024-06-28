import PropTypes from "prop-types";

export default function ModalRemoveSupplier({ selectedSupplier }) {
  return (
    <div className="modal-alert-body">
      <h5 className="text-primary">
        <b>Confirmation for the removal of the current supplier</b>
      </h5>
      {selectedSupplier != null && (
        <h6 className="text-dark">
          When a supplier is removed from the server, further screening analysis
          will no longer be possible. In this situation, the supplier{" "}
          <b>{selectedSupplier.razonSocial} </b>will not be available for future
          high-risk evaluations.
        </h6>
      )}
      <p className="text-secondary text-end">
        This action will not be reverted.
      </p>
    </div>
  );
}

ModalRemoveSupplier.propTypes = {
  selectedSupplier: PropTypes.any,
  setSelectedSupplier: PropTypes.any,
};
