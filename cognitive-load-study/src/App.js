import React from 'react';
import { ExerciseDataProvider } from './ExerciseData';
import CognitiveLoadStudy from './CognitiveLoadStudy';
import './index.css';

const App = () => {
  return (
    <ExerciseDataProvider>
      <CognitiveLoadStudy />
    </ExerciseDataProvider>
  );
};

export default App;