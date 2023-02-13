import React from "react";

const LogOut = ({ screenName }) => {
  const handleLogout = () => {
    localStorage.removeItem(screenName);
    console.log(`${screenName} has been logged out.`);
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LogOut;

