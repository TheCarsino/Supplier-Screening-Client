import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import { useAuth } from "../../hooks/AuthProvider";
import "./NavBar.scss";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleCloseSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="iso-main-navbar">
      <div className="div-main-nav">
        <Navbar expand="lg" className="navbar-main">
          <Container fluid>
            <figure className="d-flex align-items-center">
              <Navbar.Brand>
                <img
                  src="/assets/EY-logo.svg"
                  className="d-inline-block align-text-top"
                  style={{ width: "100%", height: "52px" }}
                  alt="ISOIntegrity 37001"
                />
              </Navbar.Brand>
              <h4 id="nav-logo" className="brand-text">
                <b>EY-Screening</b>
              </h4>
            </figure>
          </Container>
          <Button size="md" onClick={() => handleCloseSesion()}>
            <nav
              className="d-flex align-items-center brand-text"
              style={{ width: "90px" }}
            >
              <p>Log Out</p>
              <FontAwesomeIcon
                icon={faDoorOpen}
                style={{
                  fontSize: "1rem",
                }}
              />
            </nav>
          </Button>
        </Navbar>
      </div>
    </aside>
  );
}

export default NavBar;
