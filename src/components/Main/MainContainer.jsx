import PropTypes from "prop-types";
import "./MainContainer.scss";

function MainContainer({ title, children }) {
  return (
    <>
      <header className="app-header">
        <h2>
          <b>{title}</b>
        </h2>
      </header>
      <header className="app-body">{children}</header>
    </>
  );
}

MainContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
export default MainContainer;
