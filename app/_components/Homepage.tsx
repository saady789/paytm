import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full px-4">
        <header className="py-8">
          <h1 className="text-3xl font-bold text-blue-500">Paytm</h1>
        </header>
        <main className="bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Your Balance:</h2>
            <span className="text-xl font-semibold text-blue-500">$500.00</span>
          </div>
          <div className="flex flex-col md:flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md shadow-md transition duration-300">Send Money</button>
            {/* Add other buttons for different actions if needed */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
