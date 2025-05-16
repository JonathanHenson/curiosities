# Cognitive Load in Programming Study - Application Summary

## Application Overview

This React application implements a web-based experimental study to measure cognitive load in programming language constructs. The application presents participants with Python code snippets of varying complexity (focusing on loops, branches, and their combinations) and measures their response time and accuracy in determining the correct output.

## Component Structure

```
App.js
└── ExerciseDataProvider (ExerciseData.js)
    └── CognitiveLoadStudy (CognitiveLoadStudy.js)
        ├── ProgressBar (ProgressBar.js)
        ├── Introduction (Introduction.js)
        ├── DemographicForm (DemographicForm.js)
        ├── WarmupSection (WarmupSection.js)
        ├── ExerciseSection (ExerciseSection.js)
        └── Results (Results.js)
```

## Component Descriptions

### 1. App.js & index.js
- Entry point for the application
- Wraps everything in the ExerciseDataProvider
- Sets up React StrictMode

### 2. ExerciseData.js
- Creates React context for exercise data
- Defines all exercise questions:
  - Warmup exercises (2)
  - Loop exercises (5 levels of nesting)
  - Branch exercises (5 levels of nesting)
  - Mixed exercises (3 levels of nesting)
- Provides custom hook `useExerciseData()` for accessing exercises

### 3. CognitiveLoadStudy.js
- Main controller component
- Manages study flow and state:
  - Current section (introduction, demographics, warmup, exercises, results)
  - Results tracking
  - Progress calculation
  - Exercise randomization
- Provides timer functionality for measuring response times
- Renders the appropriate section component based on current state

### 4. Introduction.js
- Displays study purpose and instructions
- Introduces what to expect and privacy information
- Provides button to start the study

### 5. DemographicForm.js
- Collects participant programming background:
  - Programming frequency (daily to rarely)
  - Preferred programming language
- Validates inputs before proceeding

### 6. WarmupSection.js
- Presents 2 simple exercises to familiarize participants
- Shows code, multiple choice options, and feedback
- Tracks time and correctness, but these aren't counted in final results

### 7. ExerciseSection.js
- Main study interface showing randomized exercises
- Displays Python code snippets with varying complexity
- Provides multiple choice options for output values
- Records response time and correctness
- Shows immediate feedback after each exercise

### 8. ProgressBar.js
- Visual indicator of study completion percentage
- Updates dynamically based on current section and progress

### 9. Results.js
- Displays performance summary:
  - Overall accuracy
  - Average response time
  - Performance by construct type
- Generates CSV data for research purposes
- Allows participants to copy data for submission
- Provides option to restart study

## Key Implementation Features

1. **Randomization**: Exercises are presented in random order to control for learning effects.

2. **Timing Precision**: Response times are measured from the moment an exercise is displayed to when the participant selects an answer.

3. **Construct Isolation**: Each exercise isolates specific programming constructs (loops, branches, or combinations) to measure their cognitive impact.

4. **Complexity Control**: Exercises have carefully controlled complexity levels (1-5 for single constructs, 1-3 for mixed).

5. **Data Collection**: Captures demographics, response times, accuracy, and exercise metadata for comprehensive analysis.

6. **User Experience**: Clean, responsive interface with progress tracking and immediate feedback.

7. **Randomization**: Fisher-Yates shuffle algorithm ensures truly random presentation order.

## Data Analysis

The collected CSV data can be fed into the provided analysis code (analyze_cognitive_load_data.py) for:

- Descriptive statistics
- Complexity impact assessment
- SVD and PCA analysis
- Fourier transform analysis
- Cognitive load threshold identification
- Visualization of results

## Deployment

The application is built with React and Tailwind CSS, making it easy to deploy to any standard web hosting service or local environment.