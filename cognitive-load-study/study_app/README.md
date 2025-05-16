# Cognitive Load Study Web Application

This web application is designed to study how programming language constructs affect cognitive load, with a focus on branch and loop complexity and nesting.

## Project Structure

```
cognitive-load-study/
├── public/
│   ├── index.html           # HTML template
│   └── ...                  # Other public assets
├── src/
│   ├── App.js               # Main App component
│   ├── CognitiveLoadStudy.js # Primary study component
│   ├── DemographicForm.js   # Collects participant background information
│   ├── ExerciseData.js      # Context provider for exercises
│   ├── ExerciseSection.js   # Main study exercises component
│   ├── Introduction.js      # Introduction component
│   ├── ProgressBar.js       # Visual progress indicator
│   ├── Results.js           # Results display and CSV export
│   ├── WarmupSection.js     # Warm-up exercises component
│   ├── index.css            # Global styles
│   └── index.js             # Entry point
├── package.json             # Project dependencies
└── tailwind.config.js       # Tailwind CSS configuration
```

## Features

1. **Introduction**: Explains the purpose and flow of the study.
2. **Demographics Collection**: Gathers basic programming background information.
3. **Warm-up Section**: Familiarizes participants with the interface and task format.
4. **Exercise Randomization**: Presents exercises in random order to control for learning effects.
5. **Time Tracking**: Measures response time with millisecond precision.
6. **Results Analysis**: Provides immediate feedback on performance.
7. **Data Export**: Generates CSV data for further analysis.

## Exercise Types

1. **Loop Exercises**: 1-5 levels of nested loops.
2. **Branch Exercises**: 1-5 levels of nested conditionals.
3. **Mixed Exercises**: Combined loops and branches with up to 3 levels of nesting.

## How to Run

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm start
   ```

3. Build for production:
   ```
   npm run build
   ```

## Research Methodology

This application is built to support a research methodology examining how programming language constructs affect cognitive load. The methodology focuses on:

- Measuring response time and accuracy across different construct types
- Controlling for programming experience and background
- Randomizing presentation to control for learning effects
- Providing standardized CSV export for data analysis

For more details on the research methodology, refer to the research paper in the documentation.