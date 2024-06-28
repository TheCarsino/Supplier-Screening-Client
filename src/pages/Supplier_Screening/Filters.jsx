import {
  faChevronDown,
  faChevronUp,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useState } from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/esm/Button";
import "./Supplier.scss";

export default function Filters({
  filters,
  countryCode,
  setFilters,
  applyFiltersSearch,
  setCurrentPage,
  setItemsPerPage,
}) {
  const [showFilters, setShowFilters] = useState(false);
  return (
    <section id="filters-group">
      <div id="button-group" className="button-group">
        <Form style={{ width: "100%" }}>
          <Row className="mb-3">
            <Form.Group
              as={Col}
              className="col-3"
              controlId="formGridTratamiento"
            >
              <Button
                className={`${showFilters && "active"} w-100`}
                variant="outline-primary"
                onClick={() => {
                  setShowFilters(!showFilters);
                }}
              >
                Show Filters and Sorting{" "}
                <FontAwesomeIcon
                  icon={showFilters ? faChevronUp : faChevronDown}
                  style={{
                    fontSize: "1rem",
                  }}
                />
              </Button>
            </Form.Group>
            <Form.Group as={Col} className="col-9" controlId="formGridSearch">
              <InputGroup>
                <Form.Control
                  placeholder="Search..."
                  aria-label="suppliers-search"
                  aria-describedby="basic-addon2"
                  value={filters.search}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      search: e.target.value,
                    })
                  }
                />
                <Button
                  variant="outline-primary"
                  type="submit"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                    setItemsPerPage(10);
                    applyFiltersSearch(filters);
                  }}
                >
                  Search{" "}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{
                      fontSize: "1rem",
                      transform: "scaleX(-1)",
                    }}
                  />
                </Button>
              </InputGroup>
            </Form.Group>
          </Row>
          <div
            className={`filters-section ${
              showFilters ? "filters-section" : "filters-section-hidden"
            }`}
          >
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-6"
                controlId="formFilterBusiness"
              >
                <Form.Label>Business Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Business Name..."
                  aria-label="filter-business"
                  value={filters.businessName}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      businessName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-6"
                controlId="formFilterCommercial"
              >
                <Form.Label>Commercial Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Commercial Name..."
                  aria-label="filter-commerce"
                  value={filters.commercialName}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      commercialName: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                className="col-2"
                controlId="formFilterCountry"
              >
                {countryCode != null && (
                  <>
                    <Form.Label>Select Country Code</Form.Label>
                    <Form.Select
                      placeholder="Country Code..."
                      aria-label="filter-country"
                      value={
                        filters.countryCode != null ? filters.countryCode : -1
                      }
                      onChange={(e) =>
                        setFilters({
                          ...filters,
                          countryCode: e.target.value,
                        })
                      }
                    >
                      <option key={`default`} value={-1}>
                        -
                      </option>
                      {countryCode.map((country) => (
                        <option
                          key={`country-${country.codigo}`}
                          value={country.codigo}
                        >
                          {`${country.codigo} - ${country.nombre} (#${country.codigoNum})`}
                        </option>
                      ))}
                    </Form.Select>
                  </>
                )}
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-2"
                controlId="formFilterBeforeDate"
              >
                <Form.Label>Before Modified Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Before Modified Date..."
                  aria-label="filter-befdate"
                  value={filters.beforeDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      beforeDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-2"
                controlId="formFilterAfterDate"
              >
                <Form.Label>After Modified Date</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="After Modified Date..."
                  aria-label="filter-afdate"
                  value={filters.afterDate}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      afterDate: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-2"
                controlId="formFilterCountry"
              >
                <Form.Label>Sort By...</Form.Label>
                <Form.Select
                  placeholder="Sort By..."
                  aria-label="filter-country"
                  value={
                    filters.sortBy == "" ? "Last Modification" : filters.sortBy
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sortBy: e.target.value,
                    })
                  }
                >
                  <option value="Id">Identifier</option>
                  <option value="Business Name">Business Name</option>
                  <option value="Commercial Name">Commercial Name</option>
                  <option value="Taxpayer ID">Taxpayer ID</option>
                  <option value="Phone">Phone</option>
                  <option value="Email">Email</option>
                  <option value="Website Domain">Website Domain</option>
                  <option value="Address">Address</option>
                  <option value="Country">Country</option>
                  <option value="Annual Turnover">Annual Turnover</option>
                  <option value="Last Modification">Last Modification</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-2"
                controlId="formFilterCountry"
              >
                <Form.Label>Order...</Form.Label>
                <Form.Select
                  placeholder="Order..."
                  aria-label="filter-country"
                  value={
                    filters.sortDirection == "" ? "asc" : filters.sortDirection
                  }
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      sortDirection: e.target.value,
                    })
                  }
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </Form.Select>
              </Form.Group>
              <Form.Group
                as={Col}
                className="col-2 d-flex flex-column justify-content-end"
                controlId="formFilterAfterDate"
              >
                <Button
                  type="submit"
                  className={`w-100 mt-auto`}
                  variant="outline-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(1);
                    setItemsPerPage(10);
                    applyFiltersSearch(filters);
                  }}
                >
                  Apply Filters{" "}
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    style={{
                      fontSize: "1rem",
                      transform: "scaleX(-1)",
                    }}
                  />
                </Button>
              </Form.Group>
            </Row>
          </div>
        </Form>
      </div>
    </section>
  );
}

Filters.propTypes = {
  filters: PropTypes.any,
  countryCode: PropTypes.any,
  setFilters: PropTypes.any,
  applyFiltersSearch: PropTypes.any,
  setCurrentPage: PropTypes.any,
  setItemsPerPage: PropTypes.any,
};
