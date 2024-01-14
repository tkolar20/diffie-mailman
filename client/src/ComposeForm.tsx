import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Cookies from "js-cookie";

interface ComposeFormProps {
  show: boolean;
  onClose: () => void;
}

const ComposeForm: React.FC<ComposeFormProps> = ({ show, onClose }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [destination, setDestination] = useState("");

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleDestinationChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDestination(event.target.value);
  };

  const handleSubmit = async () => {
    let email = Cookies.get("attributes");

    console.log(JSON.parse(email!).email);
    console.log(destination);
    console.log(subject);
    console.log(body);
    try {
      const response = await fetch("http://localhost:4000/api/mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender: JSON.parse(email!).email,
          destination: destination,
          subject: subject,
          body: body,
        }),
      });

      if (response.ok) {
        // Successful request
        console.log("Email sent successfully!");
      } else {
        // Handle error response
        console.error(
          "Failed to send email. Server returned:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error sending email:", error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formDestination">
            <Form.Label>Destination</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter recipient"
              value={destination}
              onChange={handleDestinationChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={handleSubjectChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBody">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter email body"
              value={body}
              onChange={handleBodyChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Send Email
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ComposeForm;
