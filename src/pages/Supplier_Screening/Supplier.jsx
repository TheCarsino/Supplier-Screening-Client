import NavBar from "../../components/NavBar/NavBar";

import {
  faCircleInfo,
  faMagnifyingGlassChart,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import MainContainer from "../../components/Main/MainContainer";

import { Spinner } from "react-bootstrap";
import TimedAlert from "../../components/Alerts/TimedAlert";
import ListTableBox from "../../components/ListTable/ListTableBox";
import Modals from "../../components/Modals/Modals";
import errorCases from "../../hooks/errorCases";
import { convertDateFormat } from "../../hooks/formatDate";
import { getCountriesList } from "../../services/country.services";
import Helper from "../../components/PopOvers/Helper";
import {
  createSupplier,
  deleteSupplier,
  getSuppliersSearch,
  updateSupplier,
} from "../../services/supplier.services";
import Filters from "./Filters";
import ModalDetailSupplier from "./ModalDetailSupplier";
import ModalEditSupplier from "./ModalEditSupplier";
import ModalNewSupplier from "./ModalNewSupplier";
import ModalRemoveSupplier from "./ModalRemoveSupplier";
import ModalScreeningSupplier from "./ModalScreeningSupplier";
import "./Supplier.scss";
export default function Supplier() {
  async function retrieveSuppliers(filters, page, size) {
    if (filters?.countryCode == "-1") filters.countryCode = null;

    const bodyParams = {
      sortBy: filters.sortBy,
      sortDirection: filters.sortDirection,
      search: filters.search,
      businessName: filters.businessName,
      commercialName: filters.commercialName,
      countryCode: filters.countryCode,
      beforeDate: filters.beforeDate,
      afterDate: filters.afterDate,
      pageNumber: page,
      pageSize: size,
    };

    const data = await getSuppliersSearch(bodyParams);

    return data;
  }
  async function retrieveCreateSupplier(body) {
    if (body?.PaisCodigo == "-1") body.PaisCodigo = null;
    if (body?.FacturacionAnual == null || body?.FacturacionAnual == "")
      body.FacturacionAnual = 0;
    if (body?.NumeroTelefonico == "") body.NumeroTelefonico = null;
    if (body?.CorreoElectronico == "") body.CorreoElectronico = null;
    if (body?.SitioWeb == "") body.SitioWeb = null;
    const data = await createSupplier(body);

    return data;
  }

  async function retrieveEditSupplier(id, body) {
    if (body?.PaisCodigo == "-1") body.PaisCodigo = null;
    if (body?.FacturacionAnual == null || body?.FacturacionAnual == "")
      body.FacturacionAnual = 0;
    if (body?.NumeroTelefonico == "") body.NumeroTelefonico = null;
    if (body?.CorreoElectronico == "") body.CorreoElectronico = null;
    if (body?.SitioWeb == "") body.SitioWeb = null;
    const data = await updateSupplier(id, body);

    return data;
  }

  async function retrieveDeleteSupplier(id) {
    const data = await deleteSupplier(id);

    return data;
  }
  async function retrieveCountries() {
    const data = await getCountriesList();

    return data;
  }

  const [countryCode, setCountryCode] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    sortBy: "",
    sortDirection: "asc",
    search: "",
    businessName: "",
    commercialName: "",
    countryCode: "",
    beforeDate: "",
    afterDate: "",
  });
  const [newSupplier, setNewSupplier] = useState(null);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  const [openNewSupplier, setOpenNewSupplier] = useState(false);
  const [openEditSupplier, setOpenEditSupplier] = useState(false);
  const [openDetailSupplier, setOpenDetailSupplier] = useState(false);
  const [openRemoveSupplier, setOpenRemoveSupplier] = useState(false);
  const [openScreeningSupplier, setOpenScreeningSupplier] = useState(false);

  const applyFiltersSearch = (filters, page = 1, size = 10) => {
    let bodyFilter = {
      sortBy: filters.sortBy,
      sortDirection: filters.sortDirection,
      search: filters.search,
      businessName: filters.businessName,
      commercialName: filters.commercialName,
      countryCode: filters.countryCode,
      beforeDate: convertDateFormat(filters.beforeDate),
      afterDate: convertDateFormat(filters.afterDate),
    };
    setIsLoading(true);
    retrieveSuppliers(bodyFilter, page, size).then((suppliersList) => {
      setSuppliers(suppliersList.data);
      setIsLastPage(suppliersList.totalPages === suppliersList.pageNumber);
      setIsLoading(false);
    });
  };

  const handleCreateSupplier = (
    newSupplier,
    setNewSupplier,
    setSuppliers,
    setOpenNewSupplier
  ) => {
    retrieveCreateSupplier(newSupplier).then((response) => {
      if (response?.status == 201) {
        setNewSupplier(null);
        retrieveSuppliers(filters, 1, 10).then((suppliers) => {
          setSuppliers(suppliers.data);
        });
        setShowAlert({ message: response.message });

        setTimeout(() => setShowAlert(null), 5000);
        setOpenNewSupplier(false);
      } else {
        setShowAlert({ variant: "danger", message: errorCases(response) });

        setTimeout(() => setShowAlert(null), 5000);
      }
    });
  };

  const handleEditSupplier = (
    selectedSupplier,
    setSelectedSupplier,
    setSuppliers,
    setOpenEditSupplier
  ) => {
    retrieveEditSupplier(selectedSupplier.Id, selectedSupplier).then(
      (response) => {
        if (response?.status == 201) {
          setSelectedSupplier(null);
          retrieveSuppliers(filters, 1, 10).then((suppliers) => {
            setSuppliers(suppliers.data);
          });
          setShowAlert({ message: response.message });

          setTimeout(() => setShowAlert(null), 5000);
          setOpenEditSupplier(false);
        } else {
          setShowAlert({ variant: "danger", message: errorCases(response) });

          setTimeout(() => setShowAlert(null), 5000);
        }
      }
    );
  };

  const handleRemoveSupplier = (
    selectedSupplier,
    setSelectedSupplier,
    setSuppliers,
    setOpenEditSupplier
  ) => {
    retrieveDeleteSupplier(selectedSupplier.id).then((response) => {
      if (response?.status == 200) {
        setSelectedSupplier(null);
        retrieveSuppliers(filters, 1, 10).then((suppliers) => {
          setSuppliers(suppliers.data);
        });
        setShowAlert({ message: response.message });

        setTimeout(() => setShowAlert(null), 5000);
        setOpenEditSupplier(false);
      } else {
        setShowAlert({ variant: "danger", message: errorCases(response) });

        setTimeout(() => setShowAlert(null), 5000);
      }
    });
  };

  useEffect(() => {
    setIsLoading(true);
    retrieveSuppliers(filters, 1, 10).then((suppliersList) => {
      setSuppliers(suppliersList.data);
      retrieveCountries().then((country) => {
        setCountryCode(country);
      });
      setIsLastPage(suppliersList.totalPages === suppliersList.pageNumber);
      setIsLoading(false);
    });
  }, []);

  const handlePaginationChange = (page, size) => {
    applyFiltersSearch(filters, page, size);
  };

  const fillSuppliers = (suppliers) => {
    let listSupplier = [];

    for (const supplier of suppliers) {
      let supplierAttributes = [];
      for (const key in supplier) {
        if (key != "pais" && key != "activo") {
          supplierAttributes.push({ content: supplier[key] });
        }
      }
      supplierAttributes.push({
        content: (
          <div className="buttons-group-table">
            <div className="buttons-table">
              <Button
                onClick={() => {
                  setSelectedSupplier({
                    Id: supplier.id,
                    RazonSocial: supplier.razonSocial,
                    NombreComercial: supplier.nombreComercial,
                    IdentificacionTributaria: supplier.identificacionTributaria,
                    NumeroTelefonico:
                      supplier.numeroTelefonico == null
                        ? ""
                        : supplier.numeroTelefonico,
                    CorreoElectronico:
                      supplier.correoElectronico == null
                        ? ""
                        : supplier.correoElectronico,
                    SitioWeb:
                      supplier.sitioWeb == null ? "" : supplier.sitioWeb,
                    DireccionFisica: supplier.direccionFisica,
                    PaisCodigo: supplier.paisCodigo,
                    FacturacionAnual: supplier.facturacionAnual,
                  });
                  setOpenEditSupplier(true);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faPencil}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </div>
            <div className="buttons-table">
              <Button
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setOpenRemoveSupplier(true);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </div>
            <div className="buttons-table">
              <Button
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setOpenDetailSupplier(true);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </div>
            <div className="buttons-table">
              <Button
                onClick={() => {
                  setSelectedSupplier(supplier);
                  setOpenScreeningSupplier(true);
                }}
                variant="outline-secondary"
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlassChart}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </div>
          </div>
        ),
      });
      listSupplier.push(supplierAttributes);
    }
    return listSupplier;
  };

  return (
    <>
      {showAlert != null && (
        <TimedAlert variant={showAlert.variant} message={showAlert.message} />
      )}
      <div className="app-navbar">
        <NavBar />
      </div>
      <div className="app-component bg-white">
        <MainContainer title="Suppliers Screening Process">
          <Filters
            filters={filters}
            countryCode={countryCode}
            setFilters={setFilters}
            applyFiltersSearch={applyFiltersSearch}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={setItemsPerPage}
          ></Filters>
          <section id="list-supplier">
            <div className="supplier-header">
              <h4 className="text-primary">
                <b>Suppliers List</b>
              </h4>
              <Button
                size="md"
                variant="primary"
                onClick={() => {
                  setNewSupplier({
                    RazonSocial: "",
                    NombreComercial: "",
                    IdentificacionTributaria: "",
                    NumeroTelefonico: "",
                    CorreoElectronico: "",
                    SitioWeb: "",
                    DireccionFisica: "",
                    PaisCodigo: null,
                    FacturacionAnual: 0.0,
                  });
                  setOpenNewSupplier(true);
                }}
              >
                Create New Supplier
              </Button>
            </div>
            {suppliers != null && !isLoading && suppliers.length > 0 ? (
              <ListTableBox
                header={[
                  "#",
                  "Business Name",
                  "Commercial Name",
                  "Taxpayer ID",
                  "Phone",
                  "Email",
                  "Website Domain",
                  "Address",
                  "Country",
                  "Annual Turnover",
                  "Last Modification",
                  <div
                    key="helper"
                    style={{ width: "156px", gap: "10px" }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <Helper body="button-info"></Helper>
                    <h6 className="text-white">
                      <b>Actions</b>
                    </h6>
                  </div>,
                ]}
                width={[
                  "45px",
                  "240px",
                  "240px",
                  "120px",
                  "120px",
                  "240px",
                  "240px",
                  "240px",
                  "90px",
                  "160px",
                  "180px",
                  "180px",
                ]}
                listItems={fillSuppliers(suppliers)}
                style="custom-style"
                maxHeight="482px"
                overrideColor="override-gray"
                noPadding={false}
                handlePaginationChange={handlePaginationChange}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setDisabledPagination={isLastPage}
              />
            ) : suppliers != null && !isLoading && suppliers.length <= 0 ? (
              <div className="no-suppliers">
                <p className="text-primary text-center">
                  The list for suppliers does not contain any relevant results
                  in the search.
                </p>
              </div>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" variant="primary" size="lg" />
              </div>
            )}
          </section>
        </MainContainer>
      </div>
      <Modals
        openModal={openNewSupplier}
        setOpenModal={setOpenNewSupplier}
        title="Register a New Supplier"
        footer={["Save Changes", "Close"]}
        size="lg"
        body={
          <ModalNewSupplier
            newSupplier={newSupplier}
            setNewSupplier={setNewSupplier}
            countryList={countryCode}
          />
        }
        handleConfirm={() => {
          handleCreateSupplier(
            newSupplier,
            setNewSupplier,
            setSuppliers,
            setOpenNewSupplier
          );
        }}
        handleCancel={() => {
          setOpenNewSupplier(false);
          setNewSupplier(null);
        }}
        handleClose={() => {
          setOpenNewSupplier(false);
          setNewSupplier(null);
        }}
      />
      <Modals
        openModal={openEditSupplier}
        setOpenModal={setOpenEditSupplier}
        title={`Edit Supplier with Tax ID: ${selectedSupplier?.IdentificacionTributaria}`}
        footer={["Save Changes", "Close"]}
        size="lg"
        body={
          <ModalEditSupplier
            selectedSupplier={selectedSupplier}
            setSelectedSupplier={setSelectedSupplier}
            countryList={countryCode}
          />
        }
        handleConfirm={() => {
          handleEditSupplier(
            selectedSupplier,
            setSelectedSupplier,
            setSuppliers,
            setOpenEditSupplier
          );
        }}
        handleCancel={() => {
          setOpenEditSupplier(false);
          setSelectedSupplier(null);
        }}
        handleClose={() => {
          setOpenEditSupplier(false);
          setSelectedSupplier(null);
        }}
      />
      <Modals
        openModal={openRemoveSupplier}
        setOpenModal={setOpenRemoveSupplier}
        title={`Remove the Supplier with Tax ID: ${selectedSupplier?.identificacionTributaria}`}
        footer={["Confirm", "Close"]}
        size="lg"
        body={<ModalRemoveSupplier selectedSupplier={selectedSupplier} />}
        handleConfirm={() => {
          handleRemoveSupplier(
            selectedSupplier,
            setSelectedSupplier,
            setSuppliers,
            setOpenRemoveSupplier
          );
        }}
        handleCancel={() => {
          setOpenRemoveSupplier(false);
          setSelectedSupplier(null);
        }}
        handleClose={() => {
          setOpenRemoveSupplier(false);
          setSelectedSupplier(null);
        }}
      />
      <Modals
        openModal={openDetailSupplier}
        setOpenModal={setOpenDetailSupplier}
        title={`Detail for the Supplier with Tax ID: ${selectedSupplier?.identificacionTributaria}`}
        size="lg"
        body={<ModalDetailSupplier selectedSupplier={selectedSupplier} />}
        handleClose={() => {
          setOpenDetailSupplier(false);
          setSelectedSupplier(null);
        }}
      />
      <Modals
        openModal={openScreeningSupplier}
        setOpenModal={setOpenScreeningSupplier}
        title={`Screening Process for the Supplier with Tax ID: ${selectedSupplier?.identificacionTributaria}`}
        size="xl"
        body={
          <ModalScreeningSupplier
            selectedSupplier={selectedSupplier}
            setShowAlert={setShowAlert}
          />
        }
        handleClose={() => {
          setOpenScreeningSupplier(false);
          setSelectedSupplier(null);
        }}
      />
    </>
  );
}
