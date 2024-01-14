import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import ComposeForm from "./ComposeForm";

interface Email {
  id: number;
  subject: string;
  body: string;
}

const Home: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [randomUsername, setRandomUsername] = useState("");

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

    const randomUsernames = ["JohnDoe", "AliceSmith", "BobJohnson", "EvaWilliams"];
    const randomIndex = Math.floor(Math.random() * randomUsernames.length);
    setRandomUsername(randomUsernames[randomIndex]);

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
      <div className="d-flex align-items-center">
        <img
          src="/logo/Diffe-Mailman-Empty.png" // Assuming your assets are served from the public folder
          alt="Diffe-Mailman Logo"
          style={{ width: "128px", height: "128px", marginRight: "15px" }}
        />
        <h1 className="mb-0">Diffie-Mailman</h1>
      </div>

      <p>Welcome to your inbox {randomUsername}.</p>

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

      <ComposeForm show={showComposeModal} onClose={handleCloseComposeModal} />
    </div>
  );
};

export default Home;
