import React from "react";
import { Container } from "@mui/material";
import BirthdayCard from "./BirthdayCard";
import "./BirthdayCard.css"; // Import the CSS file

const App = () => {
  const name = "John Doe";
  const age = 30;
  const avatarUrl = "https://via.placeholder.com/100";
  const message = `Happy Birthday, John!\nWishing you a wonderful day filled with joy and happiness.\nEnjoy your special day!`;

  return (
    <Container>
      <BirthdayCard
        name={name}
        age={age}
        avatarUrl={avatarUrl}
        message={message}
      />
    </Container>
  );
};

export default App;
