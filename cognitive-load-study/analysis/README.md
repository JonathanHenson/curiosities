# Cognitive Load Analysis in Programming

This project analyzes how the complexity of programming language constructs affects cognitive load. It provides tools to process experimental data collected from the cognitive load study web application.

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd analysis

# Install dependencies
pip install -r requirements.txt

# Install the package in development mode
pip install -e .
```

## Command Line Interface

The package provides a command-line tool `analyze-load` with the following options:

```bash
# Show help
analyze-load --help

# Analyze study data
analyze-load --data path/to/data.csv

# Save plots to a specific directory
analyze-load --data path/to/data.csv --output ./results

# Show plots interactively instead of saving
analyze-load --data path/to/data.csv --show-plots

# Run verification tests with synthetic data
analyze-load --test

# Run verification tests with synthetic data and show plots
analyze-load --test --show-plots

# Save verification test plots to a specific directory
analyze-load --test --output ./test-results
```

## Analysis Features

The analysis tool provides several methods for understanding cognitive load patterns:

- Response time and accuracy analysis by complexity level
- Comparison between construct types (loops, branches, mixed)
- Threshold detection to identify significant cognitive load increases
- Principal Component Analysis (PCA) to identify patterns
- Singular Value Decomposition (SVD) for dimensionality reduction
- Fourier Transform Analysis to detect patterns in complexity scaling

## Testing

The project includes automated tests to verify the analysis functions:

```bash
# Run all tests
pytest

# Run with verbose output
pytest -v

# Generate test coverage report
pytest --cov=analysis
```

### Test Structure

- `test_analyzer.py`: Tests the main analysis functionality
- Verification tests with synthetic data ensure that the analysis can detect known patterns:
  - Linear increases in cognitive load for loop constructs
  - Exponential increases for branch constructs
  - Super-additive effects for mixed constructs
  - Threshold effects at specific complexity levels

## Data Format

The analysis expects CSV data with the following columns:

- `participant_id`: Unique identifier for each study participant
- `timestamp`: When the response was recorded
- `programming_frequency`: How often the participant programs
- `preferred_language`: Participant's preferred programming language
- `construct_type`: Type of programming construct (loop, branch, mixed)
- `complexity_level`: Nesting depth of the construct
- `response_time_ms`: Time taken to evaluate the code
- `correct`: Whether the response was correct (1) or incorrect (0)

## Project Structure

```
analysis/
├── README.md                 # Project documentation
├── requirements.txt          # Dependencies
├── setup.py                  # For package installation
├── pyproject.toml            # Modern Python packaging
├── analysis/                 # Main package
│   ├── __init__.py
│   ├── analyzer.py           # Core analysis code
│   └── cli.py                # Command line interface
└── tests/                    # Test directory
    ├── __init__.py
    ├── conftest.py           # Pytest configuration
    └── test_analyzer.py      # Tests for the analyzer
```