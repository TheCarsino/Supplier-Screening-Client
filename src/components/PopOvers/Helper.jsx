import {
  faCircleInfo,
  faCircleQuestion,
  faMagnifyingGlassChart,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PropTypes from "prop-types";
import "./Helper.scss";

export default function Helper({ body, placement = "left", ...props }) {
  const listBody = (body) => {
    switch (body) {
      case "button-info":
        return (
          <div
            className="d-flex flex-column justify-content-start text-secondary"
            style={{ gap: "0.75rem" }}
          >
            <div
              className="d-flex flex-row buttons-table align-items-center"
              style={{ gap: "0.75rem" }}
            >
              <FontAwesomeIcon
                icon={faPencil}
                style={{
                  fontSize: "1rem",
                }}
              />
              <p className="text-primary">Button for Supplier modification</p>
            </div>
            <div
              className="d-flex flex-row buttons-table align-items-center"
              style={{ gap: "0.75rem" }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  fontSize: "1rem",
                }}
              />
              <p className="text-primary">Button for Supplier elimination</p>
            </div>
            <div
              className="d-flex flex-row buttons-table align-items-center"
              style={{ gap: "0.75rem" }}
            >
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{
                  fontSize: "1rem",
                }}
              />
              <p className="text-primary">Button for detailed information</p>
            </div>
            <div
              className="d-flex flex-row buttons-table align-items-center"
              style={{ gap: "0.75rem" }}
            >
              <FontAwesomeIcon
                icon={faMagnifyingGlassChart}
                style={{
                  fontSize: "1rem",
                }}
              />
              <p className="text-primary">
                Button for <i>Screening Process</i> for the current supplier
              </p>
            </div>
          </div>
        );
      default:
        return body;
    }
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>{listBody(body)}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger
      trigger={["hover", "focus"]}
      placement={placement}
      overlay={popover}
      {...props}
    >
      <div className="text-white">
        <FontAwesomeIcon
          icon={faCircleQuestion}
          style={{ fontSize: "1.25rem" }}
        />
      </div>
    </OverlayTrigger>
  );
}

/*USO DE HELPER PARA ESTABLECER CUADROS DE RESULTADOS FINALES 
    body = Mensaje que se encontraré en el cuerpo del helper
    placement = The direction where the popover will appear form the button
*/
Helper.propTypes = {
  body: PropTypes.string || PropTypes.node,
  placement: PropTypes.string,
  props: PropTypes.any,
};
