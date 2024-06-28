import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Form, FormGroup, Pagination, Table } from "react-bootstrap";
import "./ListTableBox.scss";

function ListTableBox({
  header,
  width,
  listItems,
  style,
  overrideColor = "override-white",
  noPadding = false,
  maxHeight = "100%",
  hasPagination = true,
  handlePaginationChange,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  setItemsPerPage,
  setDisabledPagination = false,
}) {
  const listBoxRef = useRef(null); // Ref to the list-box element
  const [contentExceedsWidth, setContentExceedsWidth] = useState(false);
  const [contentExceedsHeight, setContentExceedsHeight] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (listBoxRef.current) {
        const contentWidth = listBoxRef.current.scrollWidth;
        const containerWidth = listBoxRef.current.clientWidth;
        const contentHeight = listBoxRef.current.scrollHeight;
        const containerHeight = listBoxRef.current.clientHeight;
        setContentExceedsWidth(contentWidth > containerWidth);
        setContentExceedsHeight(contentHeight > containerHeight);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow); // Recheck on resize

    return () => window.removeEventListener("resize", checkOverflow); // Cleanup
  }, []);

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); //Reset
    handlePaginationChange(1, newItemsPerPage);
  };

  const handlePageChange = (size) => {
    setCurrentPage(size);
    handlePaginationChange(size, itemsPerPage);
  };

  return (
    <>
      <Table
        striped
        bordered
        hover
        responsive="sm"
        className={`list-box ${style} ${overrideColor} ${
          contentExceedsWidth ? "overflow-x" : ""
        }
        ${contentExceedsHeight ? "overflow-y" : ""}`}
        ref={listBoxRef}
        style={{ maxHeight: maxHeight }}
      >
        <thead>
          <tr className="listitem-box">
            {header.map((heading, index) => (
              <th
                key={index}
                className="header-box"
                style={{ width: width[index] }}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {listItems.map((item, index) => (
            <tr key={index} className="listitem-box">
              {item.map((cell, cellIndex) => (
                <td
                  key={`${index}-${cellIndex}`}
                  style={{ width: width[cellIndex] }}
                  className={`cell-box ${overrideColor} ${
                    cell.cellColor != null && cell.cellColor
                  } ${noPadding && "override-noPadding"}`}
                >
                  {cell.content}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
      {hasPagination && (
        <section id="pagination" className="d-flex justify-content-between">
          <Pagination>
            <Pagination.Prev
              onClick={() => {
                handlePageChange(currentPage - 1);
              }}
              disabled={currentPage === 1}
            >
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={{
                  fontSize: "1rem",
                }}
              />{" "}
              Prev Page
            </Pagination.Prev>
            <Pagination.Next
              onClick={() => {
                handlePageChange(currentPage + 1);
              }}
              disabled={setDisabledPagination}
            >
              Next Page{" "}
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{
                  fontSize: "1rem",
                }}
              />
            </Pagination.Next>
          </Pagination>
          <Form>
            <FormGroup id="itemsPerPage">
              <Form.Select
                as="select"
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(e)}
              >
                <option value={5}>Items: 5</option>
                <option value={10}>Items: 10</option>
                <option value={20}>Items: 20</option>
                <option value={50}>Items: 50</option>
              </Form.Select>
            </FormGroup>
          </Form>
        </section>
      )}
    </>
  );
}

/*
  LIST TABLE VALUES ARE THE FOLLOWING
  header: Of the current listtable to define columns
  accordionItems: Array of objects that defines the header, and body of each accordion item.
    {
      key: String defined to identify the id of the list item
      content: Node Body of the current object
      cellColor: colors that overrides the current background color of the cell
    }
  color: Background color of the accordion
  overrideColor: colors that overrides the current background color
  width: width that occupies the accordion
  noPadding: if we want the listitem-box to have no padding
  maxHeight: define the max Height
*/

ListTableBox.propTypes = {
  header: PropTypes.node,
  width: PropTypes.arrayOf(PropTypes.string),
  listItems: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        cellColor: PropTypes.string,
        content: PropTypes.node,
      }).isRequired
    )
  ).isRequired,
  style: PropTypes.string,
  overrideColor: PropTypes.string,
  noPadding: PropTypes.bool,
  maxHeight: PropTypes.string,
  hasPagination: PropTypes.bool,
  handlePaginationChange: PropTypes.any,
  currentPage: PropTypes.any,
  setCurrentPage: PropTypes.any,
  itemsPerPage: PropTypes.any,
  setItemsPerPage: PropTypes.any,
  setDisabledPagination: PropTypes.any,
};

export default ListTableBox;
