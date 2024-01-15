import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import ComposeForm from "./ComposeForm";
import ExpandableList from "./ExpandableList";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { Key } from "./key";
import forge from "node-forge";
interface Email {
  id: number;
  subject: string;
  senderMail: string;
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
      {
        id: 1,
        subject: "First Email",
        senderMail: "tkolar20@example.com",
        body: "This is the body of the first email.",
        seen: true,
      },
      {
        id: 2,
        subject: "Second Email",
        senderMail: "123luka321@example.com",
        body: "This is the body of the second email.",
        seen: false,
      },
      // Add more emails as needed
    ];

    // Async function for fetching emails from our backend server
    const fetchEmails = async () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const userEmailCookie = cookies.find((cookie) =>
        cookie.startsWith("email=")
      );
      let userEmail = userEmailCookie
        ? decodeURIComponent(userEmailCookie.split("=")[1])
        : "";
      console.log(userEmail);
      if (userEmail == "") userEmail = "kero@dm.com";
      try {
        const response = await fetch(
          `http://localhost:4000/api/mail?email=${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include any additional headers as needed
            },
          }
        );
        const data = await response.json();
        console.log(data);
        for(let i = 0; i<data.length; i++)
        {
          console.log(data[i].body);
          console.log(Key.aeskey);
          console.log(Key.aeskey.length);
          Key.aeskey.read = 0;
          let cipher = forge.cipher.createCipher('AES-GCM', Key.aeskey);
          cipher.start( { iv: "aaaaaaaaaaaaaaaa" } );
          cipher.update( forge.util.createBuffer(data[i].body));
          cipher.finish();
          console.log(cipher.output);
          data[i].body = cipher.output.data;
        }
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    
    // Comment out if we're testing
    fetchEmails();
    for(let i = 0; i<emails.length; i++)
    {
        console.log(Key.aeskey);
        console.log(Key.aeskey.length);
        let cipher = forge.cipher.createCipher('AES-GCM',Key.aeskey);
        cipher.start( { iv: "aaaaaaaaaaaaaaaa" } );
        cipher.update( forge.util.createBuffer(emails[i].body ) );
        cipher.finish();
        emails[i].body = cipher.output.toString();
    }
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
    // For demonstration, let's clear the existing emails and reload them
    // setEmails([
    //   {
    //     id: 1,
    //     subject: "lmao",
    //     sender: "hehe:3@example.com",
    //     body: "You like refreshing your inbox don't you?",
    //     seen: false,
    //   },
    // ]);

    // Async function for fetching emails from our backend server
    const fetchEmails = async () => {
      const cookies = document.cookie.split(";").map((cookie) => cookie.trim());
      const userEmailCookie = cookies.find((cookie) =>
        cookie.startsWith("email=")
      );
      let userEmail = userEmailCookie
        ? decodeURIComponent(userEmailCookie.split("=")[1])
        : "";
      console.log(userEmail);
      if (userEmail == "") userEmail = "kero@dm.com";
      try {
        const response = await fetch(
          `http://localhost:4000/api/mail?email=${encodeURIComponent(
            userEmail
          )}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include any additional headers as needed
            },
          }
        );
        const data = await response.json();
        console.log(data);
        setEmails(data);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    // Uncomment the following line to fetch emails from your API or route
    fetchEmails();
    emails.forEach(mail =>
      {
        console.log(Key.aeskey);
        console.log(Key.aeskey.length);
        let cipher = forge.cipher.createCipher('AES-GCM',Key.aeskey);
        cipher.start( { iv: "aaaaaaaaaaaaaaaa" } );
        cipher.update( forge.util.createBuffer(mail.body ) );
        cipher.finish();
        mail.body = cipher.output.toString();
      });
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
        <LogoutButton />
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
