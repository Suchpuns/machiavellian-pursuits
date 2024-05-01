import MenuButton from "../Components/MenuButton.tsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/MainMenu.css";

const Rules = () => {
  let page = 1;
  const navigate = useNavigate();
  const toMainMenu = () => {
    navigate("/");
  };
  const nextPage = () => {
    page += 1;
    // stub because i don't know whats the best style for navigating pages
  };
  return (
    <div className="menu-container">
      <div className="title-text">Rule Book For Machiavellian Pursuits</div>
      {page === 1 && (
        <div className="paragraph-text">
          Do you like lying? If so, Machiavellian Pursuits is the perfect game
          for you. As suggested by the name, feel free to lie and manipulate
          your way to victory! MP can be brutal depending on how you play.
          Please do not break into fist fights.
        </div>
      )}
      <div>
        <MenuButton
          text="Next Page"
          onClick={nextPage}
          color="green"
          size="small"
        />
        <MenuButton text="Back" onClick={toMainMenu} color="red" size="small" />
      </div>
    </div>
  );
};

export default Rules;
