import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ComposeForm from "./ComposeForm";
import ExpandableList from "./ExpandableList";

interface Email {
  id: number;
  subject: string;
  sender: string;
  body: string;
  seen: boolean;
}

const Home: React.FC = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [randomUsername, setRandomUsername] = useState("");

  useEffect(() => {
    // Mock data for demonstration, only used while backend wasn't done with routes.
    const mockEmails: Email[] = [
        { id: 1, subject: "First Email", sender:"tkolar20@example.com", body: "This is the body of the first email.", seen: true },
        { id: 2, subject: "Second Email", sender:"123luka321@example.com", body: "This is the body of the second email.", seen: false },
        // Add more emails as needed
      ];
  
      // Async function for fetching emails from our backend server
      const fetchEmails = async () => {
        try {
          const response = await fetch("/api/emails"); // replace with your actual API endpoint
          const data = await response.json();
          setEmails(data);
        } catch (error) {
          console.error("Error fetching emails:", error);
        }
      };
  
      // Comment out if we're testing
      fetchEmails();
  
    //   const randomUsernames = ["JohnDoe", "AliceSmith", "BobJohnson", "EvaWilliams"];
    //   const randomIndex = Math.floor(Math.random() * randomUsernames.length);

    //   setRandomUsername(randomUsernames[randomIndex]);
    //   // Use mock data for now
    //   setEmails(mockEmails);
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
    setEmails([{ id: 1, subject: "lmao",sender:"hehe:3@example.com", body: "You like refreshing your inbox don't you?", seen: false }]);
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
        <div className="p-3 mb-2 bg-dark text-white">
            <p className="px-3 fs-3">Welcome to your inbox {randomUsername}.</p>
            <div className="d-flex align-items-center mx-3">
                <Button variant="primary" onClick={handleComposeClick}>
                    Compose Email
                </Button>
                <Button variant="light" onClick={handleRefreshClick} className="ms-2">
                    <i className="bi-arrow-clockwise"></i>
                </Button>
            </div>
        </div>

        <ExpandableList emails={emails} />

      <ComposeForm show={showComposeModal} onClose={handleCloseComposeModal} />
    </div>
  );
};

export default Home;