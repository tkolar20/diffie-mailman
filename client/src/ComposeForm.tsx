import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

interface ComposeFormProps {
  show: boolean;
  onClose: () => void;
}

const ComposeForm: React.FC<ComposeFormProps> = ({ show, onClose }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
  };

  const handleSubmit = () => {
    // Log the email data to the console for now
    console.log("Subject:", subject);
    console.log("Body:", body);

    // You can replace the console log with your data storage logic
    // For example, send the data to a backend API or store it in a state management system
    // For demonstration, we'll just log the data to the console
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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
