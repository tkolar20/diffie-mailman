import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";

interface Email {
  id: number;
  subject: string;
  body: string;
}

const Home: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showComposeModal, setShowComposeModal] = useState(false);

  useEffect(() => {
    // Mock data for demonstration
    const mockEmails: Email[] = [
      { id: 1, subject: "First Email", body: "This is the body of the first email." },
      { id: 2, subject: "Second Email", body: "This is the body of the second email." },
      // Add more emails as needed
    ];

    // Uncomment the following lines to fetch emails from your API or route
    // const fetchEmails = async () => {
    //   try {
    //     const response = await fetch("/api/emails"); // replace with your actual API endpoint
    //     const data = await response.json();
    //     setEmails(data);
    //   } catch (error) {
    //     console.error("Error fetching emails:", error);
    //   }
    // };

    // Uncomment the following line to fetch emails from your API or route
    // fetchEmails();

    // Use mock data for now
    setEmails(mockEmails);
  }, []);

  const handleComposeClick = () => {
    setShowComposeModal(true);
  };

  const handleCloseComposeModal = () => {
    setShowComposeModal(false);
  };

  return (
    <div>
      <h1>Welcome to the Home Screen!</h1>
      <p>This is a simple home screen.</p>

      <Button variant="primary" onClick={handleComposeClick}>
        Compose Email
      </Button>

      <ul className="list-group mt-3">
        {emails.map((email) => (
          <li key={email.id} className="list-group-item">
            <strong>{email.subject}</strong>
            <p>{email.body}</p>
          </li>
        ))}
      </ul>

      {/* Compose Email Modal */}
      <Modal show={showComposeModal} onHide={handleCloseComposeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Compose Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add your compose email form here */}
          <p>This is where the compose email form will go.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseComposeModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseComposeModal}>
            Send Email
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Home;
