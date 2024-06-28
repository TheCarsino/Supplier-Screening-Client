import PropTypes from "prop-types";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { getScreeningSuppliers } from "../../services/supplier.services";
import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faMagnifyingGlassChart,
} from "@fortawesome/free-solid-svg-icons";
import ListTableBox from "../../components/ListTable/ListTableBox";
import { errorCasesScreen } from "../../hooks/errorCases";

export default function ModalScreeningSupplier({
  selectedSupplier,
  setShowAlert,
}) {
  async function retrieveScreeningSuppliers(body) {
    const data = await getScreeningSuppliers(body);

    return data;
  }

  const [selectedDatabases, setSelectedDatabases] = useState([]);
  const [screeningSupplier, setScreeningSupplier] = useState(null);
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const handleCheckboxChange = (value) => {
    const index = selectedDatabases.indexOf(value);
    if (index === -1) {
      setSelectedDatabases([...selectedDatabases, value]);
    } else {
      setSelectedDatabases(selectedDatabases.filter((item) => item !== value));
    }
  };

  const handleScreeningProcess = (selectedSupplier, selectedDatabases) => {
    const screeningBody = {
      name: selectedSupplier.razonSocial,
      offshoreLeaks: selectedDatabases.some((item) => item == "offshoreLeaks"),
      worldBank: selectedDatabases.some((item) => item == "worldBankDebarred"),
      OFACSanctions: selectedDatabases.some((item) => item == "OFACSanctions"),
    };
    setIsLoadingScreen(true);
    retrieveScreeningSuppliers(screeningBody).then((screeningList) => {
      let offshoreList = [],
        worldbankList = [],
        ofacList = [];
      if (
        screeningList != null &&
        screeningList?.error == null &&
        screeningList.detailDataBases != null
      ) {
        for (let item of screeningList.hitRiskData) {
          switch (item.source) {
            case "offshore-leak":
              offshoreList.push(item);
              continue;
            case "world-bank":
              worldbankList.push(item);
              continue;
            case "ofac-sanction":
              ofacList.push(item);
              continue;
            default:
              continue;
          }
        }
        const highRiskList = {
          offshoreLeaks: offshoreList.length > 0 ? offshoreList : null,
          worldBank: worldbankList.length > 0 ? worldbankList : null,
          ofacSanction: ofacList.length > 0 ? ofacList : null,
        };
        setScreeningSupplier({
          list: highRiskList,
          totalHits: screeningList.totalHits,
        });
        setShowAlert({
          message: errorCasesScreen(screeningList.detailDataBases),
        });

        setTimeout(() => setShowAlert(null), 5000);
      } else {
        setShowAlert({
          variant: "danger",
          message: "The server is not in function at the moment.",
        });

        setTimeout(() => setShowAlert(null), 5000);
      }
      setIsLoadingScreen(false);
    });
  };

  const fillScreening = (screeningList) => {
    let listScreening = [];

    for (const screenItem of screeningList) {
      let supplierAttributes = [];
      for (const key in screenItem)
        if (key != "source")
          supplierAttributes.push({ content: screenItem[key] });

      listScreening.push(supplierAttributes);
    }
    return listScreening;
  };

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
            <b>{"Supplier's Screening High Risk"}</b>
          </h5>
          <div className="container-form-controls">
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-md-12 d-flex justify-content-around"
                controlId="formCheckboxGroup"
              >
                <Form.Label>Select Database:</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Offshore Leaks"
                  id="checkbox1"
                  onChange={() => handleCheckboxChange("offshoreLeaks")}
                  checked={selectedDatabases.includes("offshoreLeaks")}
                />
                <Form.Check
                  type="checkbox"
                  label="World Bank Debarred"
                  id="checkbox2"
                  onChange={() => handleCheckboxChange("worldBankDebarred")}
                  checked={selectedDatabases.includes("worldBankDebarred")}
                />
                <Form.Check
                  type="checkbox"
                  label="OFAC Sanctions"
                  id="checkbox3"
                  onChange={() => handleCheckboxChange("OFACSanctions")}
                  checked={selectedDatabases.includes("OFACSanctions")}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-12 d-flex flex-column justify-content-end"
                controlId="formFilterAfterDate"
              >
                <Button
                  type="submit"
                  className={`w-100 mt-auto`}
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScreeningProcess(selectedSupplier, selectedDatabases);
                  }}
                  disabled={
                    selectedDatabases == null || selectedDatabases?.length <= 0
                  }
                >
                  {!isLoadingScreen ? (
                    <p>
                      Initiate Crossed Screening Process{" "}
                      <FontAwesomeIcon
                        icon={faMagnifyingGlassChart}
                        style={{
                          fontSize: "1.5rem",
                          transform: "scaleX(-1)",
                        }}
                      />
                    </p>
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Spinner
                        animation="border"
                        style={{ height: "24px", width: "24px" }}
                      />
                    </div>
                  )}
                </Button>
              </Form.Group>
            </Row>
            {isLoadingScreen && (
              <h4 className="text-secondary d-flex align-items-center justify-content-end">
                The process may take some time...
              </h4>
            )}
          </div>

          {screeningSupplier != null ? (
            <div>
              <div className="screening-header d-flex align-items-center justify-content-end">
                <h5
                  className={
                    screeningSupplier.totalHits > 0
                      ? "text-warning"
                      : "text-primary"
                  }
                >
                  Total Number of Hits: {screeningSupplier.totalHits}
                </h5>
              </div>
              <div className="screening-header">
                <h5 className="text-primary">
                  <b>OffShore Leaks List</b>
                </h5>
              </div>
              <div className="list-screening">
                {screeningSupplier.list.offshoreLeaks != null &&
                screeningSupplier.list.offshoreLeaks.length > 0 ? (
                  <ListTableBox
                    header={[
                      "Entity Name",
                      "Jurisdiction",
                      "Linked To",
                      "Data From",
                    ]}
                    width={["480px", "160px", "340px", "240px"]}
                    listItems={fillScreening(
                      screeningSupplier.list.offshoreLeaks
                    )}
                    style="custom-style"
                    maxHeight="320px"
                    overrideColor="override-gray"
                    noPadding={false}
                    hasPagination={false}
                  />
                ) : (
                  <div className="no-suppliers">
                    <p className="text-primary text-center">
                      No results provided from OffShore Leaks Database.
                    </p>
                  </div>
                )}
              </div>
              <div className="screening-header">
                <h5 className="text-primary">
                  <b>World Bank Debarred List</b>
                </h5>
              </div>
              <div className="list-screening">
                {screeningSupplier.list.worldBank != null &&
                screeningSupplier.list.worldBank.length > 0 ? (
                  <ListTableBox
                    header={[
                      "Firm Name",
                      "Address",
                      "Country",
                      "From Date",
                      "To Date",
                      "Agreement",
                    ]}
                    width={[
                      "480px",
                      "480px",
                      "240px",
                      "160px",
                      "160px",
                      "240px",
                    ]}
                    listItems={fillScreening(screeningSupplier.list.worldBank)}
                    style="custom-style"
                    maxHeight="320px"
                    overrideColor="override-gray"
                    noPadding={false}
                    hasPagination={false}
                  />
                ) : (
                  <div className="no-suppliers">
                    <p className="text-primary text-center">
                      No results provided from World Bank Debarred Database.
                    </p>
                  </div>
                )}
              </div>

              <div className="screening-header">
                <h5 className="text-primary">
                  <b>OFAC Sanctions List</b>
                </h5>
              </div>
              <div className="list-screening">
                {screeningSupplier.list.ofacSanction != null &&
                screeningSupplier.list.ofacSanction.length > 0 ? (
                  <ListTableBox
                    header={[
                      "Name",
                      "Address",
                      "Type",
                      "Programs",
                      "List",
                      "Score",
                    ]}
                    width={[
                      "480px",
                      "480px",
                      "160px",
                      "240px",
                      "120px",
                      "120px",
                    ]}
                    listItems={fillScreening(
                      screeningSupplier.list.ofacSanction
                    )}
                    style="custom-style"
                    maxHeight="320px"
                    overrideColor="override-gray"
                    noPadding={false}
                    hasPagination={false}
                  />
                ) : (
                  <div className="no-suppliers">
                    <p className="text-primary text-center">
                      No results provided from OFAC Sanctions Database.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="no-suppliers">
              <p className="text-primary text-center">
                Select the databases for the cross screening process.
              </p>
            </div>
          )}
        </div>
      )}
    </Form>
  );
}

ModalScreeningSupplier.propTypes = {
  selectedSupplier: PropTypes.any,
  setShowAlert: PropTypes.any,
};
