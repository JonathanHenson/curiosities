import React, { useState, useRef } from 'react';

const Results = ({
  participantId,
  demographics,
  warmupResults,
  exerciseResults,
  exerciseOrder,
  onRestart
}) => {
  const [copied, setCopied] = useState(false);
  const csvRef = useRef();
  
  // Generate summary statistics
  const totalExercises = exerciseResults.length;
  const correctAnswers = exerciseResults.filter(r => r.isCorrect).length;
  const accuracy = totalExercises > 0 ? (correctAnswers / totalExercises) * 100 : 0;
  const averageTime = totalExercises > 0 
    ? exerciseResults.reduce((sum, r) => sum + r.responseTimeMs, 0) / totalExercises 
    : 0;
  
  // Calculate per-construct-type statistics
  const constructTypes = [...new Set(exerciseResults.map(r => r.constructType))];
  const constructStats = constructTypes.map(type => {
    const typeResults = exerciseResults.filter(r => r.constructType === type);
    const typeCorrect = typeResults.filter(r => r.isCorrect).length;
    const typeAccuracy = typeResults.length > 0 ? (typeCorrect / typeResults.length) * 100 : 0;
    const typeAvgTime = typeResults.length > 0 
      ? typeResults.reduce((sum, r) => sum + r.responseTimeMs, 0) / typeResults.length 
      : 0;
    
    return {
      type,
      count: typeResults.length,
      correct: typeCorrect,
      accuracy: typeAccuracy,
      avgTime: typeAvgTime
    };
  });
  
  // Generate CSV data
  const generateCSV = () => {
    // Headers
    const headers = [
      'participant_id',
      'timestamp',
      'programming_frequency',
      'preferred_language',
      'construct_type',
      'complexity_level',
      'exercise_id',
      'response_time_ms',
      'correct'
    ].join(',');
    
    // Current timestamp
    const timestamp = new Date().toISOString();
    
    // Data rows
    const rows = exerciseResults.map(result => [
      participantId,
      timestamp,
      demographics.programmingFrequency,
      demographics.preferredLanguage,
      result.constructType,
      result.complexity,
      result.exerciseId,
      result.responseTimeMs,
      result.isCorrect ? 1 : 0
    ].join(','));
    
    return [headers, ...rows].join('\n');
  };
  
  const csvData = generateCSV();
  
  // Handle copy to clipboard
  const handleCopyCSV = () => {
    const textArea = csvRef.current;
    textArea.select();
    document.execCommand('copy');
    setCopied(true);
    
    // Reset copied state after 3 seconds
    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
      <div className="mb-4 border-b pb-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">Results Summary</h2>
        <p className="text-gray-600">Thank you for participating in the study!</p>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-700">Overall Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="text-indigo-800 font-semibold text-sm mb-1">Accuracy</div>
            <div className="text-2xl font-bold text-indigo-900">{accuracy.toFixed(1)}%</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-green-800 font-semibold text-sm mb-1">Average Response Time</div>
            <div className="text-2xl font-bold text-green-900">{(averageTime / 1000).toFixed(2)}s</div>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-blue-800 font-semibold text-sm mb-1">Exercises Completed</div>
            <div className="text-2xl font-bold text-blue-900">{totalExercises}</div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-700">Performance by Construct Type</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-r text-left bg-gray-50">Construct Type</th>
                <th className="py-2 px-4 border-b border-r text-left bg-gray-50">Exercises</th>
                <th className="py-2 px-4 border-b border-r text-left bg-gray-50">Accuracy</th>
                <th className="py-2 px-4 border-b text-left bg-gray-50">Avg. Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {constructStats.map((stat, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="py-2 px-4 border-b border-r capitalize">{stat.type}</td>
                  <td className="py-2 px-4 border-b border-r">{stat.count}</td>
                  <td className="py-2 px-4 border-b border-r">{stat.accuracy.toFixed(1)}%</td>
                  <td className="py-2 px-4 border-b">{(stat.avgTime / 1000).toFixed(2)}s</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3 text-gray-700">Export Data</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <p className="mb-3 text-sm text-gray-600">
            Please copy the CSV data below and paste it into the shared research document.
            Your data will help advance our understanding of cognitive load in programming.
          </p>
          <div className="relative mb-3">
            <textarea
              ref={csvRef}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg text-xs font-mono"
              value={csvData}
              readOnly
            ></textarea>
          </div>
          <button
            onClick={handleCopyCSV}
            className={`${
              copied ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center w-full md:w-auto`}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy to Clipboard'}
          </button>
        </div>
      </div>
      
      <div className="text-center mt-8">
        <button
          onClick={onRestart}
          className="bg-gray-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
        >
          Start New Session
        </button>
      </div>
    </div>
  );
};

export default Results;