import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserErrorPopUp = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 z-10 flex items-center justify-center font-poppins">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 animate-in fade-in zoom-in">
        <div className="text-center space-y-4">
          <div className="text-yellow-500 flex items-center justify-center mx-auto mb-4">
            <FaExclamationTriangle className="text-6xl text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Needs to Login!</h2>
          <p className="text-gray-600 text-lg">
            Please login to continue.
          </p>
          <button
            className="w-full bg-gray-900 text-white font-semibold py-3 rounded-xl hover:bg-black transition-colors"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserErrorPopUp;
