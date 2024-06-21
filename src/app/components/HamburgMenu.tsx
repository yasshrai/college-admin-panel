"use client";

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
const HamburgMenu = () => {
  const [menu, setMenu] = useState(true);
  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <div>
      <GiHamburgerMenu
        className="block md:hidden text-2xl cursor-pointer"
        onClick={handleChange}
      ></GiHamburgerMenu>
    </div>
  );
};

export default HamburgMenu;
