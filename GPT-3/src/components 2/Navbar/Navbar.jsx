import React from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/logo.svg";
import { useState } from "react";

const Menu = () => (
  <>
    <p>
      <a href="#home">Home</a>
    </p>
    <p>
      <a href="#About">What is GPT-3?</a>
    </p>
    <p>
      <a href="#Possibility">Open AI</a>
    </p>
    <p>
      <a href="#Features">Case Studies</a>
    </p>
    <p>
      <a href="#Blog">Library</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <div className="GPT-3__navbar">
      <div className="GPT-3__navbar-links">
        <div className="GPT-3__navbar-links_logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="GPT-3__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="GPT-3__navbar-sign">
        <p>Sign in</p>
        <button>Sign up</button>
      </div>
      <div className="GPT-3__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}

        {toggleMenu && (
          <div className="GPT-3__navbar-menu_container scale-up-center">
            {" "}
            <Menu />
            <div className="GPT-3__navbar-menu_container-links">
              <Menu />
              <div className="GPT-3__navbar-menu_container-links-sign">
                <p>Sign in</p>
                <button>Sign up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
