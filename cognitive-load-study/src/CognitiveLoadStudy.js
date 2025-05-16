import React, { useState, useEffect } from 'react';
import { useExerciseData } from './ExerciseData';
import DemographicForm from './DemographicForm';
import Introduction from './Introduction';
import WarmupSection from './WarmupSection';
import ExerciseSection from './ExerciseSection';
import Results from './Results';
import ProgressBar from './ProgressBar';

const CognitiveLoadStudy = () => {
  // Exercise data
  const { warmupExercises, loopExercises, branchExercises, mixedExercises } = useExerciseData();

  // State management
  const [currentSection, setCurrentSection] = useState('introduction');
  const [demographics, setDemographics] = useState({
    programmingFrequency: '',
    preferredLanguage: ''
  });
  const [warmupResults, setWarmupResults] = useState([]);
  const [exerciseResults, setExerciseResults] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [exerciseOrder, setExerciseOrder] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [participantId, setParticipantId] = useState('');

  // Generate participant ID on first load
  useEffect(() => {
    const id = `p${Date.now().toString().slice(-8)}`;
    setParticipantId(id);
  }, []);

  // Randomize exercise order
  useEffect(() => {
    if (currentSection === 'demographics') {
      // Create a randomized list of all exercises
      const allExercises = [
        ...loopExercises.map(ex => ({ ...ex, type: 'loop' })),
        ...branchExercises.map(ex => ({ ...ex, type: 'branch' })),
        ...mixedExercises.map(ex => ({ ...ex, type: 'mixed' }))
      ];
      
      // Fisher-Yates shuffle
      const shuffled = [...allExercises];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      setExerciseOrder(shuffled);
    }
  }, [currentSection, loopExercises, branchExercises, mixedExercises]);

  // Update progress percentage
  useEffect(() => {
    if (currentSection === 'warmup') {
      setProgressPercentage(10 + (warmupResults.length / warmupExercises.length) * 15);
    } else if (currentSection === 'exercises') {
      setProgressPercentage(25 + (exerciseResults.length / exerciseOrder.length) * 75);
    } else if (currentSection === 'results') {
      setProgressPercentage(100);
    } else if (currentSection === 'demographics') {
      setProgressPercentage(10);
    } else if (currentSection === 'introduction') {
      setProgressPercentage(0);
    }
  }, [currentSection, warmupResults, exerciseResults, warmupExercises.length, exerciseOrder.length]);

  // Handle demographic form submission
  const handleDemographicsSubmit = (data) => {
    setDemographics(data);
    setCurrentSection('warmup');
  };

  // Handle warmup exercise result
  const handleWarmupResult = (result) => {
    setWarmupResults([...warmupResults, result]);
    
    // Move to main exercises after all warmup exercises are completed
    if (warmupResults.length + 1 >= warmupExercises.length) {
      setCurrentSection('exercises');
    }
  };

  // Handle main exercise result
  const handleExerciseResult = (result) => {
    setExerciseResults([...exerciseResults, result]);
    
    // Move to results after all exercises are completed
    if (exerciseResults.length + 1 >= exerciseOrder.length) {
      setCurrentSection('results');
    }
  };

  // Restart the study
  const handleRestart = () => {
    setCurrentSection('introduction');
    setWarmupResults([]);
    setExerciseResults([]);
    setDemographics({ programmingFrequency: '', preferredLanguage: '' });
    const id = `p${Date.now().toString().slice(-8)}`;
    setParticipantId(id);
  };

  // Start exercise timer
  const startExerciseTimer = () => {
    setStartTime(Date.now());
  };

  // Calculate response time
  const calculateResponseTime = () => {
    if (startTime) {
      return Date.now() - startTime;
    }
    return 0;
  };

  // Render the current section
  const renderSection = () => {
    switch (currentSection) {
      case 'introduction':
        return <Introduction onStart={() => setCurrentSection('demographics')} />;
      
      case 'demographics':
        return <DemographicForm onSubmit={handleDemographicsSubmit} />;
      
      case 'warmup':
        return (
          <WarmupSection
            exercises={warmupExercises}
            currentExerciseIndex={warmupResults.length}
            onResult={handleWarmupResult}
            startTimer={startExerciseTimer}
            calculateResponseTime={calculateResponseTime}
          />
        );
      
      case 'exercises':
        return (
          <ExerciseSection
            exercises={exerciseOrder}
            currentExerciseIndex={exerciseResults.length}
            onResult={handleExerciseResult}
            startTimer={startExerciseTimer}
            calculateResponseTime={calculateResponseTime}
          />
        );
      
      case 'results':
        return (
          <Results
            participantId={participantId}
            demographics={demographics}
            warmupResults={warmupResults}
            exerciseResults={exerciseResults}
            exerciseOrder={exerciseOrder}
            onRestart={handleRestart}
          />
        );
      
      default:
        return <Introduction onStart={() => setCurrentSection('demographics')} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="py-4 px-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold text-center">Cognitive Load in Programming Study</h1>
      </header>
      
      <main className="flex-grow px-4 py-6 max-w-3xl mx-auto w-full">
        <ProgressBar percentage={progressPercentage} />
        <div className="my-6">
          {renderSection()}
        </div>
      </main>
      
      <footer className="py-3 px-4 bg-gray-100 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Programming Cognitive Load Research Study
      </footer>
    </div>
  );
};

export default CognitiveLoadStudy;