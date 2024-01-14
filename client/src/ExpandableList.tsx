import React, { useState } from "react";
import { Button, Collapse } from "react-bootstrap";

interface Email {
  id: number;
  senderMail: string;
  subject: string;
  body: string;
  seen: boolean;
}

interface ExpandableListProps {
  emails: Email[];
}

const ExpandableList: React.FC<ExpandableListProps> = ({ emails }) => {
  const [openEmailId, setOpenEmailId] = useState<number | null>(null);

  const handleToggle = (emailId: number) => {
    setOpenEmailId(openEmailId === emailId ? null : emailId);
  };

  return (
    <div
      className="list-container"
      style={{ maxHeight: "calc(100vh - 20px)", overflowY: "auto" }}
    >
      <ul className="list-group mt-3">
        {emails.map((email) => (
          <li
            key={email.id}
            className={`list-group-item clickable${
              openEmailId === email.id ? " active" : ""
            }`}
            onClick={() => handleToggle(email.id)}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{email.subject}</strong>
                <span className="ms-2">From: {email.senderMail}</span>
                {email.seen ? (
                  <i className="bi bi-check-all h4 text-success ms-2"></i>
                ) : (
                  <i className="bi bi-check h4 ms-2"></i>
                )}
              </div>
              <Button
                variant="link"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggle(email.id);
                }}
                aria-controls={`email-collapse-${email.id}`}
                aria-expanded={openEmailId === email.id}
              >
                <i
                  className={`bi bi-chevron-${
                    openEmailId === email.id ? "up" : "down"
                  }`}
                ></i>
              </Button>
            </div>
            <Collapse in={openEmailId === email.id}>
              <div id={`email-collapse-${email.id}`}>
                <p>{email.body}</p>
              </div>
            </Collapse>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpandableList;
