import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

export default function ModalDetailSupplier({ selectedSupplier }) {
  return (
    <Form style={{ width: "100%" }}>
      {selectedSupplier != null && (
        <div className="supplier-details">
          <h5 className="text-secondary">
            <b>{"Supplier's Information"}</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-12"
                controlId="formGridBusiness"
              >
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert business name..."
                  value={selectedSupplier.razonSocial}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridTaxID"
              >
                <Form.Label>Taxpayer ID Code</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert Taxpayer identification code..."
                  value={selectedSupplier.identificacionTributaria}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridCommercial"
              >
                <Form.Label>Commercial Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert commercial name..."
                  value={selectedSupplier.nombreComercial}
                  readOnly
                />
              </Form.Group>
            </Row>
          </div>
          <h5 className="text-secondary">
            <b>{"Supplier's Contact Information"}</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridPhone"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Insert telephone number..."
                  value={selectedSupplier.numeroTelefonico}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridEmail"
              >
                <Form.Label>Email Domain</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@com"
                  value={selectedSupplier.correoElectronico}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridEmail"
              >
                <Form.Label>Country Code</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedSupplier.paisCodigo}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridAddress"
              >
                <Form.Label>Physical Address</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Insert address..."
                  value={selectedSupplier.direccionFisica}
                  readOnly
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-9"
                controlId="formGridWebsite"
              >
                <Form.Label>Website Domain</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Insert website domain..."
                  value={selectedSupplier.sitioWeb}
                  readOnly
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-md-3"
                controlId="formGridTurnover"
              >
                <Form.Label>Annual Turnover</Form.Label>
                <Form.Control
                  type="text"
                  pattern="^\d*\.?\d*$"
                  placeholder="$ 0.00"
                  value={selectedSupplier.facturacionAnual}
                  readOnly
                />
              </Form.Group>
            </Row>
          </div>
        </div>
      )}
    </Form>
  );
}

ModalDetailSupplier.propTypes = {
  selectedSupplier: PropTypes.any,
};
