import React, { useState, useRef, useEffect } from "react";
import "./Header.css"; // Import your CSS styles
const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  // Mock user data - replace with your actual user data
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    // Implement your sign out logic here
    console.log("User signed out");
    setIsProfileOpen(false);
  };

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Left side of header - can be logo or other elements */}
        <div className="header-left">
          <h1>Your Logo</h1>
        </div>

        {/* Right side of header with profile icon */}
        <div className="header-right" ref={profileRef}>
          <div
            className="profile-icon"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>

          {/* Profile dropdown modal */}
          {isProfileOpen && (
            <div className="profile-dropdown">
              <div className="profile-dropdown-content">
                <div className="profile-info">
                  <div className="profile-name">{user.name}</div>
                  <div className="profile-email">{user.email}</div>
                </div>
                <div className="dropdown-divider"></div>
                <button className="signout-button" onClick={handleSignOut}>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
