import React, { useState, useEffect } from 'react';

const ExerciseSection = ({
  exercises,
  currentExerciseIndex,
  onResult,
  startTimer,
  calculateResponseTime
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  
  // Get the current exercise
  const currentExercise = exercises[currentExerciseIndex];
  
  // Reset selected option when moving to next exercise
  useEffect(() => {
    setSelectedOption(null);
    // Start timing when the exercise is displayed
    startTimer();
  }, [currentExerciseIndex, startTimer]);
  
  const handleOptionSelect = (option) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(option);
    
    // Calculate response time
    const responseTime = calculateResponseTime();
    
    // Add a small delay before proceeding to next exercise
    setTimeout(() => {
      onResult({
        exerciseId: currentExercise.id,
        complexity: currentExercise.complexity,
        constructType: currentExercise.type,
        selectedOption: option,
        correctOption: currentExercise.correctAnswer,
        isCorrect: option === currentExercise.correctAnswer,
        responseTimeMs: responseTime
      });
    }, 500);
  };
  
  if (!currentExercise) return null;

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mb-1">
          Exercise {currentExerciseIndex + 1}/{exercises.length}
        </span>
        <h2 className="text-xl font-bold text-gray-800">Code Evaluation</h2>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md mb-6 overflow-x-auto font-mono text-sm sm:text-base leading-relaxed whitespace-pre">
        {currentExercise.code}
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Select the correct output:</h3>
        <div className="grid grid-cols-2 gap-3">
          {currentExercise.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionSelect(option)}
              disabled={selectedOption !== null}
              className={`py-3 px-4 rounded-md text-center font-medium text-lg transition-colors
                ${selectedOption === option
                  ? option === currentExercise.correctAnswer
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-red-100 border-2 border-red-500 text-red-800'
                  : selectedOption !== null && option === currentExercise.correctAnswer
                    ? 'bg-green-100 border-2 border-green-500 text-green-800'
                    : 'bg-gray-100 border border-gray-300 hover:bg-gray-200 text-gray-800'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      {selectedOption !== null && (
        <div className={`p-3 rounded-md ${selectedOption === currentExercise.correctAnswer ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
          <p className="font-medium">
            {selectedOption === currentExercise.correctAnswer
              ? '✓ Correct!'
              : `✗ Incorrect. The correct answer is ${currentExercise.correctAnswer}.`
            }
          </p>
          {currentExerciseIndex + 1 < exercises.length ? (
            <p className="text-sm mt-1">Proceeding to next exercise...</p>
          ) : (
            <p className="text-sm mt-1">Completing the study...</p>
          )}
        </div>
      )}
      
      <div className="mt-4 text-sm text-gray-600">
        <p>Type: <span className="font-medium capitalize">{currentExercise.type}</span> | Complexity Level: <span className="font-medium">{currentExercise.complexity}</span></p>
      </div>
    </div>
  );
};

export default ExerciseSection;