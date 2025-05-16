import React, { createContext, useContext } from 'react';

// Create context
const ExerciseDataContext = createContext();

// Custom hook for using the context
export const useExerciseData = () => {
  const context = useContext(ExerciseDataContext);
  if (!context) {
    throw new Error('useExerciseData must be used within an ExerciseDataProvider');
  }
  return context;
};

export const ExerciseDataProvider = ({ children }) => {
  // Warmup exercises (1 loop, 1 branch)
  const warmupExercises = [
    {
      id: 'warmup-1',
      type: 'loop',
      complexity: 1,
      code: `# Evaluate the output of this code
result = 0
for i in range(3):
    result += i * 2
print(result)`,
      options: ['0', '6', '9', '12'],
      correctAnswer: '6'
    },
    {
      id: 'warmup-2',
      type: 'branch',
      complexity: 1,
      code: `# Evaluate the output of this code
x = 10
result = 0
if x > 5:
    result = x * 2
else:
    result = x // 2
print(result)`,
      options: ['5', '10', '20', '25'],
      correctAnswer: '20'
    }
  ];

  // Loop exercises (1-5 levels of nesting)
  const loopExercises = [
    {
      id: 'loop-1',
      complexity: 1,
      code: `# Evaluate the output of this code
result = 0
for i in range(4):
    result += i
print(result)`,
      options: ['4', '6', '10', '16'],
      correctAnswer: '6'
    },
    {
      id: 'loop-2',
      complexity: 2,
      code: `# Evaluate the output of this code
result = 0
for i in range(3):
    for j in range(2):
        result += i * j
print(result)`,
      options: ['3', '6', '9', '12'],
      correctAnswer: '3'
    },
    {
      id: 'loop-3',
      complexity: 3,
      code: `# Evaluate the output of this code
result = 0
for i in range(3):
    for j in range(2):
        for k in range(2):
            result += i * j * k
print(result)`,
      options: ['0', '3', '6', '12'],
      correctAnswer: '6'
    },
    {
      id: 'loop-4',
      complexity: 4,
      code: `# Evaluate the output of this code
result = 0
for i in range(2):
    for j in range(2):
        for k in range(2):
            for l in range(2):
                result += i * j * k * l
print(result)`,
      options: ['0', '1', '2', '8'],
      correctAnswer: '2'
    },
    {
      id: 'loop-5',
      complexity: 5,
      code: `# Evaluate the output of this code
result = 0
for i in range(2):
    for j in range(2):
        for k in range(2):
            for l in range(2):
                for m in range(2):
                    result += i * j * k * l * m
print(result)`,
      options: ['0', '4', '8', '16'],
      correctAnswer: '4'
    }
  ];

  // Branch exercises (1-5 levels of nesting)
  const branchExercises = [
    {
      id: 'branch-1',
      complexity: 1,
      code: `# Evaluate the output of this code
x = 7
result = 0
if x > 5:
    result = x + 10
else:
    result = x - 5
print(result)`,
      options: ['2', '7', '17', '35'],
      correctAnswer: '17'
    },
    {
      id: 'branch-2',
      complexity: 2,
      code: `# Evaluate the output of this code
x = 7
y = 12
result = 0
if x > 5:
    if y > 10:
        result = x + y
    else:
        result = x - y
else:
    result = x * y
print(result)`,
      options: ['5', '19', '84', '-5'],
      correctAnswer: '19'
    },
    {
      id: 'branch-3',
      complexity: 3,
      code: `# Evaluate the output of this code
x = 7
y = 12
z = 3
result = 0
if x > 5:
    if y > 10:
        if z < 5:
            result = x + y + z
        else:
            result = x + y - z
    else:
        result = x * y
else:
    result = x + y * z
print(result)`,
      options: ['16', '22', '43', '84'],
      correctAnswer: '22'
    },
    {
      id: 'branch-4',
      complexity: 4,
      code: `# Evaluate the output of this code
a = 7
b = 12
c = 3
d = 8
result = 0
if a > 5:
    if b > 10:
        if c < 5:
            if d > 5:
                result = a + b + c + d
            else:
                result = a + b + c - d
        else:
            result = a + b - c
    else:
        result = a * b
else:
    result = a + b * c
print(result)`,
      options: ['16', '22', '30', '84'],
      correctAnswer: '30'
    },
    {
      id: 'branch-5',
      complexity: 5,
      code: `# Evaluate the output of this code
a = 7
b = 12
c = 3
d = 8
e = 2
result = 0
if a > 5:
    if b > 10:
        if c < 5:
            if d > 5:
                if e % 2 == 0:
                    result = a + b + c + d + e
                else:
                    result = a + b + c + d - e
            else:
                result = a + b + c - d
        else:
            result = a + b - c
    else:
        result = a * b
else:
    result = a + b * c
print(result)`,
      options: ['16', '30', '32', '84'],
      correctAnswer: '32'
    }
  ];

  // Mixed exercises (1-3 levels of nesting)
  const mixedExercises = [
    {
      id: 'mixed-1',
      complexity: 1,
      code: `# Evaluate the output of this code
x = 7
result = 0
for i in range(3):
    if x > 5:
        result += i * 2
    else:
        result += i
print(result)`,
      options: ['0', '3', '6', '12'],
      correctAnswer: '6'
    },
    {
      id: 'mixed-2',
      complexity: 2,
      code: `# Evaluate the output of this code
x = 7
result = 0
for i in range(3):
    if x > 5:
        for j in range(2):
            result += i * j
    else:
        result += i
print(result)`,
      options: ['0', '3', '6', '9'],
      correctAnswer: '3'
    },
    {
      id: 'mixed-3',
      complexity: 3,
      code: `# Evaluate the output of this code
x = 7
y = 4
result = 0
for i in range(2):
    if x > 5:
        for j in range(2):
            if y < 5:
                result += i * j * y
            else:
                result += i * j
    else:
        result += i * 2
print(result)`,
      options: ['0', '4', '8', '16'],
      correctAnswer: '8'
    }
  ];

  // Export all exercises through context
  const value = {
    warmupExercises,
    loopExercises,
    branchExercises,
    mixedExercises
  };

  return (
    <ExerciseDataContext.Provider value={value}>
      {children}
    </ExerciseDataContext.Provider>
  );
};