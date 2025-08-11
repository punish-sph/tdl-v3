import React from "react";

const Dashboard: React.FC = () => {
  const logout = async () => {
    await window.auth.logout();
    window.location.href = "/#/login";
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl mb-4">Welcome, Traveler.</h1>
      <p className="mb-6">You have been granted passage.</p>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white font-bold"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
