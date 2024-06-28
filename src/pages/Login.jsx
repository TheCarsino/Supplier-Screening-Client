import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import { useAuth } from "../hooks/AuthProvider";
import { authenticateUser } from "../services/authentication.services";
import Spinner from "react-bootstrap/esm/Spinner";

import { useNavigate } from "react-router-dom";
import "../App.scss";
import { URL_SUPPLIERS } from "../config";

const Login = () => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { isLoggedIn, userData, login } = useAuth();

  useEffect(() => {
    if (isLoggedIn && userData) {
      navigate(`${URL_SUPPLIERS}`);
    }
  }, [isLoggedIn, navigate, userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    authenticateUser({
      usuario: credentials.username,
      contrasena: credentials.password,
    }).then((authResp) => {
      if (authResp != null) {
        setIsValid(true);
        login(authResp);
        navigate(`${URL_SUPPLIERS}`);
      } else {
        setCredentials({
          username: "",
          password: "",
        });
        setIsValid(false);
      }
      setIsLoading(false);
    });
  };

  return (
    <div className="login-content">
      <div className="login-header">
        <div className="login-logo">
          <img
            src="/assets/EY-Screening.svg"
            style={{ width: "100%", height: "100%" }}
            className="d-inline-block align-text-top"
            alt="EY Screening"
          />
        </div>
        <h4 className="text-primary text-center">
          <b>EY Supplier Screening System</b>
        </h4>
        <br />
        <h5 className="text-primary text-center">
          Application for the Entity Screening System for Suppliers.
        </h5>
        <hr />
        <p className="text-dark text-center">
          EY Supplier offers comprehensive evaluations from multiple databases
          for the correct evaluation of high risk level suppliers.
        </p>
      </div>
      <div className="login-body">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-12" controlId="formUsuario">
              <Form.Label>Usuario </Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese usuario"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} className="col-md-12" controlId="formPassword">
              <Form.Label>Contraseña </Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingrese contraseña"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    password: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Row>
          {!isValid && (
            <section>
              <p
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
                className="text-danger"
              >
                Usuario y/o contraseña inválidos.
              </p>
            </section>
          )}
          <div className="login-footer">
            <Button
              style={{
                width: "100%",
                alignSelf: "center",
              }}
              className="btn-primary"
              type="submit"
            >
              {!isLoading ? (
                <p>Iniciar Sesión</p>
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
                    variant="white"
                    style={{ height: "24px", width: "24px" }}
                  />
                </div>
              )}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
