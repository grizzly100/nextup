# Copilot Instructions for NextUp

This file provides workspace-specific guidance for GitHub Copilot when working on the NextUp project.

## Project Overview

NextUp is a Python task management application designed to help users organize and track their upcoming tasks and goals.

## Project Structure

- `src/` - Main application source code
- `tests/` - Unit and integration tests
- `requirements.md` - Detailed project requirements and specifications
- `requirements.txt` - Python package dependencies
- `README.md` - Project documentation

## Code Guidelines

### Style and Standards
- Follow PEP 8 Python style guide
- Use type hints for function parameters and return values
- Write docstrings for all modules, classes, and functions
- Maintain code coverage above 80%

### Naming Conventions
- Use snake_case for functions and variables
- Use PascalCase for class names
- Use UPPER_CASE for constants

### Best Practices
- Keep functions focused and single-responsibility
- Write unit tests for new features
- Use meaningful variable names
- Add comments for complex logic

## Development Workflow

1. Create a feature branch for new work
2. Implement changes following the guidelines above
3. Write tests for new functionality
4. Run tests and ensure they pass
5. Submit a pull request for review

## Technology Stack

- **Language**: Python 3.8+
- **Testing**: pytest
- **Code Style**: PEP 8, black
- **Linting**: flake8

## Common Tasks

### Running Tests
```bash
python -m pytest tests/
```

### Running the Application
```bash
python src/main.py
```

### Checking Code Style
```bash
flake8 src/
```

## Additional Resources

- See `requirements.md` for detailed project requirements
- See `README.md` for setup and installation instructions
