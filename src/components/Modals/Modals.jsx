import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./Modals.scss";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Modals(props) {
  const {
    openModal = false,
    setOpenModal,
    size = "md",
    centered = true,
    bd_static = false,
    closeButton = false,
    title,
    body,
    footer,
    handleCancel = null,
    handleClose = null,
    handleConfirm = null,
  } = props;

  const handleHide = () => {
    if (handleClose != null) handleClose();
    setOpenModal(false);
  };

  return (
    <Modal
      show={openModal}
      onHide={handleHide}
      size={size}
      centered={centered}
      backdrop={bd_static ? "static" : true}
      keyboard={!bd_static}
    >
      <div className="main-popup">
        <div className="popup-header">
          {title && (
            <Modal.Header>
              {typeof title === "string" ? (
                <Modal.Title>
                  <div className="popup-title">
                    <h4 className="text-primary">
                      <b>{title}</b>
                    </h4>
                    {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    {!closeButton && (
                      <button
                        className="btn btn-outline-white text-dark"
                        style={{ marginTop: "-0.75rem" }}
                        onClick={() => {
                          handleHide();
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          style={{ fontSize: "1.25rem" }}
                        />
                      </button>
                    )}
                  </div>
                </Modal.Title>
              ) : (
                <Modal.Title>{title}</Modal.Title>
              )}
            </Modal.Header>
          )}
        </div>
        <div className="popup-body">
          {typeof body === "string" ? (
            <Modal.Body>
              <h6 className="text-primary">{body}</h6>
            </Modal.Body>
          ) : (
            <Modal.Body>{body}</Modal.Body>
          )}
        </div>
        {footer && (
          <div className="popup-footer">
            <Modal.Footer>
              {footer.length > 0 ? (
                <>
                  <div className="cancel-button">
                    {footer.length === 2 && (
                      <Button
                        style={{ minWidth: "150px" }}
                        variant="outline-primary"
                        onClick={
                          handleCancel
                            ? handleCancel
                            : () => setOpenModal(false)
                        }
                      >
                        {footer[1]}
                      </Button>
                    )}
                  </div>
                  <div className="accept-button">
                    {footer.length >= 1 && (
                      <Button
                        style={{ minWidth: "150px" }}
                        variant="primary"
                        onClick={
                          handleConfirm
                            ? handleConfirm
                            : () => setOpenModal(false)
                        }
                      >
                        {footer[0]}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                { footer }
              )}
            </Modal.Footer>
          </div>
        )}
      </div>
    </Modal>
  );
}
/* MANEJO DE MODALES EN EL SISTEMA -> CONOCIDOS COMO POPUP TAMBIÉN
  
    [openModal, setOpenModal] -> verifica si el modal está activado o no
    centered -> si el modal está centrado -> caso contrario se podrá mover
    size -> para el dialogClassName -> size en tamaño -> sm, xl, md, lg
    bd_static -> Si se coloca en true el modal se configurará para que no se pueda salir si se presiona fuera o por teclado
    closeButton -> si existirá un botón para cerrar el modal
    title -> el titulo que se adecua al Modal [Funciona como texto o un componente separado]
    {body} -> componente heredado del Modal como tal...
    {
      RECOMENDACIÓN-> HACER USO DEL DIV->MODAL-FOOTER O MODAL-BODY para la creación del body
    }
    {footer} -> componente heredado del modal que permite el manejo de un footer -> en modo simple se maneja como un arreglo... 
                ['titulo_boton_Aceptar', 'titulo_boton_Cancelar'] -> 1 :: ['titulo_boton_Aceptar'] 
    handleCancel -> funcion Asociada al botón de cancel
    handleConfirm -> funcion Asociada al botón de confirm
    handleCancel -> funcion Asociada al hide el Modal
  */
Modals.propTypes = {
  openModal: PropTypes.any.isRequired,
  setOpenModal: PropTypes.any.isRequired,
  size: PropTypes.string,
  centered: PropTypes.bool,
  bd_static: PropTypes.bool,
  closeButton: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  body: PropTypes.node.isRequired,
  footer: PropTypes.array,
  handleCancel: PropTypes.any,
  handleConfirm: PropTypes.any,
  handleClose: PropTypes.any,
};

export default Modals;
