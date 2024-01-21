"use client";

import React, { useState, useEffect } from "react";

const Header = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    let user_data = localStorage.getItem("user_data");
    if (user_data !== null) {
      user_data = JSON.parse(user_data);
      setUserName(user_data.name);
    }
  }, []);

  return (
    <div className="p-4 fixed top-0 left-0 z-50">
      {userName && (
        <p className="text-left">
          Utilisateur connecté : <strong>{userName}</strong>
        </p>
      )}
    </div>
  );
};

export default Header;
