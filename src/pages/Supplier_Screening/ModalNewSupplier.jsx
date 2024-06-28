import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";

export default function ModalNewSupplier({
  newSupplier,
  setNewSupplier,
  countryList,
}) {
  const handleInputTurnOver = (e) => {
    const { value } = e.target;
    // Allow only numbers and a single decimal point
    if (/^[0-9]*\.?[0-9]*$/.test(value)) {
      setNewSupplier({
        ...newSupplier,
        FacturacionAnual: value,
      });
    }
  };

  return (
    <Form style={{ width: "100%" }}>
      {newSupplier != null && countryList != null && (
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
                  value={newSupplier.RazonSocial}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      RazonSocial: e.target.value,
                    });
                  }}
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
                  value={newSupplier.IdentificacionTributaria}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      IdentificacionTributaria: e.target.value,
                    });
                  }}
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
                  value={newSupplier.NombreComercial}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      NombreComercial: e.target.value,
                    });
                  }}
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
                  value={newSupplier.NumeroTelefonico}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      NumeroTelefonico: e.target.value,
                    });
                  }}
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
                  value={newSupplier.CorreoElectronico}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      CorreoElectronico: e.target.value,
                    });
                  }}
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
                <Form.Select
                  placeholder=""
                  aria-label="filter-country"
                  value={
                    newSupplier.PaisCodigo != null ? newSupplier.PaisCodigo : -1
                  }
                  onChange={(e) =>
                    setNewSupplier({
                      ...newSupplier,
                      PaisCodigo: e.target.value,
                    })
                  }
                >
                  <option key={`default`} value={-1}>
                    -
                  </option>
                  {countryList.map((country) => (
                    <option
                      key={`country-${country.codigo}`}
                      value={country.codigo}
                    >
                      {`${country.codigo} - ${country.nombre} (#${country.codigoNum})`}
                    </option>
                  ))}
                </Form.Select>
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
                  value={newSupplier.DireccionFisica}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      DireccionFisica: e.target.value,
                    });
                  }}
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
                  value={newSupplier.SitioWeb}
                  onChange={(e) => {
                    setNewSupplier({
                      ...newSupplier,
                      SitioWeb: e.target.value,
                    });
                  }}
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
                  value={newSupplier.FacturacionAnual}
                  onChange={(e) => handleInputTurnOver(e)}
                />
              </Form.Group>
            </Row>
          </div>
        </div>
      )}
    </Form>
  );
}

ModalNewSupplier.propTypes = {
  newSupplier: PropTypes.any,
  setNewSupplier: PropTypes.any,
  countryList: PropTypes.any,
};
