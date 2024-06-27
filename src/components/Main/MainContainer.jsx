import PropTypes from "prop-types";
import "./MainContainer.scss";

function MainContainer({ title, children }) {
  return (
    <>
      <div className="app-header">
        <h2>
          <b>{title}</b>
        </h2>
      </div>
      <div className="app-body">{children}</div>
    </>
  );
}

MainContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
export default MainContainer;
