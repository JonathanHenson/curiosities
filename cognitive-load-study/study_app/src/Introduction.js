import React from 'react';

const Introduction = ({ onStart }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Welcome to the Programming Cognitive Load Study</h2>
      
      <p className="mb-4">
        This study investigates how different programming constructs affect cognitive processing demands.
      </p>
      
      <p className="mb-4">
        You will be shown Python code snippets with varying complexity and asked to determine the correct output value.
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">What to expect:</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Brief demographic questions (2 questions)</li>
          <li>Short warm-up section (2 exercises)</li>
          <li>Main study section (~13 exercises)</li>
          <li>Results summary and data export</li>
        </ul>
        <p className="mt-2 text-sm text-gray-600">
          The entire study takes approximately 10-15 minutes to complete.
        </p>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">Important notes:</h3>
        <ul className="list-disc ml-5 space-y-1">
          <li>Please complete the study in one sitting</li>
          <li>Try to work in a quiet environment with minimal distractions</li>
          <li>Answer as quickly and accurately as possible</li>
          <li>Your response times will be measured</li>
        </ul>
      </div>
      
      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
        <h3 className="font-bold text-lg mb-2">Privacy information:</h3>
        <p>
          No personally identifiable information will be collected. Your responses will be used for research purposes only.
        </p>
        <p className="mt-2">
          Participation is voluntary, and you can exit the study at any time.
        </p>
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={onStart}
          className="bg-indigo-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-colors shadow-md w-full md:w-auto"
        >
          Start Study
        </button>
      </div>
    </div>
  );
};

export default Introduction;