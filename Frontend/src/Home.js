// Import required modules, components, and styles
import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import LogoutButton from './logout';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/App.css';

// Home component displays summarized emails grouped by priority
function Home({ emailData }) {
  // Component for rendering a card with a category of emails
  function CategoryBlock({ category }) {
    return (
      <Card className="mt-2 mb-4 shadow">
        <Card.Header>{category}</Card.Header>
        <div>
          {emailData.map((item, index) => (
            // Each item is summarized email content
            <EmailCard key={index} summary_description={item[1]} />
          ))}
        </div>
      </Card>
    );
  }

  // Component for rendering an individual email card
  function EmailCard({ summary_description }) {
    return (
      <div className="mt-2 mb-4">
        <Card.Body className="side-line">
          <Card.Text>
            {summary_description}
          </Card.Text>
        </Card.Body>
      </div>
    );
  }

  // Categorize emails into high, medium, and low priority
  let high_priority = [];
  let medium_priority = [];
  let low_priority = [];

  for (const email of emailData) {
    if (email[0] > 0.7) {
      high_priority.push(email);
    } else if (email[0] > 0.3) {
      medium_priority.push(email);
    } else {
      low_priority.push(email);
    }
  }

  // Render the grouped email summaries by priority
  return (
    <>
      <div className="container mt-4 mb-4">
        <LogoutButton className="" />

        <header className="Summary-heading shadow">
          <h1>Email Summary</h1>
        </header>

        {/* High Priority Emails */}
        <Card className="mt-2 mb-4 shadow">
          <Card.Header>{"High Priority"}</Card.Header>
          <div>
            {high_priority.map((item, index) => (
              <EmailCard key={index} summary_description={item[1]} />
            ))}
          </div>
        </Card>

        {/* Medium Priority Emails */}
        <Card className="mt-2 mb-4 shadow">
          <Card.Header>{"Medium Priority"}</Card.Header>
          <div>
            {medium_priority.map((item, index) => (
              <EmailCard key={index} summary_description={item[1]} />
            ))}
          </div>
        </Card>

        {/* Low Priority Emails */}
        <Card className="mt-2 mb-4 shadow">
          <Card.Header>{"Low Priority"}</Card.Header>
          <div>
            {low_priority.map((item, index) => (
              <EmailCard key={index} summary_description={item[1]} />
            ))}
          </div>
        </Card>
        <footer className="Footer shadow"></footer>
      </div>
    </>
  );
}

export default Home;