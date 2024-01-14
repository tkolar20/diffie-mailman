import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
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

  const handleRefreshClick = () => {
    // Add logic to fetch the latest emails
    // For demonstration, let's clear the existing emails and reload them
    setEmails([{ id: 1, subject: "lmao", body: "You like refreshing your inbox don't you?" }]);
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
  };

  return (
    <div>
      <div className="d-flex align-items-center">
        <img
          src="/logo/Diffe-Mailman-Empty.png"
          alt="Diffe-Mailman Logo"
          style={{ width: "128px", height: "128px", marginRight: "15px" }}
        />
        <h1 className="mb-0">Diffie-Mailman</h1>
      </div>

      <p>Welcome to your inbox {randomUsername}.</p>

      <div className="d-flex align-items-center mb-3">
        <Button variant="primary" onClick={handleComposeClick}>
          Compose Email
        </Button>
        <Button variant="light" onClick={handleRefreshClick} className="ms-2">
          {/* Add your preferred refresh icon here */}
          <i className="bi-arrow-clockwise"></i>
        </Button>
      </div>

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