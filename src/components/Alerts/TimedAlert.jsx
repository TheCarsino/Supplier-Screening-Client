import React, { useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
import PropTypes from "prop-types";
import "./TimedAlert.scss";

export default function TimedAlert({ message, variant = "success" }) {
  const [show, setShow] = useState(true);

  const transFormMessage = (message, separator = "|") => {
    const splittedMessage = message.split(separator);

    return (
      <div>
        {splittedMessage.map((item, index) => (
          <p className="text-primary" key={index}>
            {item}
          </p>
        ))}
      </div>
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="alert-container">
      {show && (
        <Alert variant={variant} onClose={() => setShow(false)} dismissible>
          {transFormMessage(message)}
        </Alert>
      )}
    </div>
  );
}

TimedAlert.propTypes = {
  message: PropTypes.any.isRequired,
  variant: PropTypes.string,
};
