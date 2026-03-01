"""
Quick Start Guide for NextUp

This guide will help you get the NextUp application up and running.

## Installation

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Initialize the database with sample data:
   ```bash
   python -m src.init_db
   ```

## Running the Application

Start the Flask development server:
```bash
python src/main.py
```

The application will be available at `http://localhost:5000`

## API Endpoints

### Organisations
- `GET /api/organisations` - List all organisations
- `GET /api/organisations/<id>` - Get a specific organisation
- `POST /api/organisations` - Create a new organisation
- `PUT /api/organisations/<id>` - Update an organisation
- `DELETE /api/organisations/<id>` - Delete an organisation

### People
- `GET /api/people` - List all people
- `GET /api/people/<id>` - Get a specific person
- `POST /api/people` - Create a new person
- `PUT /api/people/<id>` - Update a person
- `DELETE /api/people/<id>` - Delete a person

### Links
- `GET /api/links` - List all links
- `GET /api/links/<id>` - Get a specific link
- `POST /api/links` - Create a new link
- `PUT /api/links/<id>` - Update a link
- `DELETE /api/links/<id>` - Delete a link

### Tasks
- `GET /api/tasks` - List all tasks (supports filtering: ?person_id=X&state=OPEN&priority=HIGH)
- `GET /api/tasks/<id>` - Get a specific task
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/<id>` - Update a task
- `DELETE /api/tasks/<id>` - Delete a task
- `GET /api/tasks/dashboard/upcoming` - Get upcoming tasks

## Testing

Run the test suite:
```bash
python -m pytest tests/
```

Run with coverage:
```bash
python -m pytest tests/ --cov=src
```

## Code Style

Format code with black:
```bash
black src/ tests/
```

Check code style with flake8:
```bash
flake8 src/ tests/
```

## Example API Usage

### Create an organisation
```bash
curl -X POST http://localhost:5000/api/organisations \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Engineering"}'
```

### Create a person
```bash
curl -X POST http://localhost:5000/api/people \\
  -H "Content-Type: application/json" \\
  -d '{
    "first_name": "Alice",
    "last_name": "Johnson",
    "organisation_id": "org-123",
    "email": "alice@example.com"
  }'
```

### Create a task
```bash
curl -X POST http://localhost:5000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Implement feature X",
    "description": "Add new functionality",
    "person_id": "person-123",
    "priority": "HIGH",
    "due_date": "2026-03-15T09:00:00"
  }'
```

### Get upcoming tasks
```bash
curl http://localhost:5000/api/tasks/dashboard/upcoming
```

## Common Issues

**Port 5000 already in use:**
- Change the port in `src/main.py`: `app.run(port=5001)`

**Database not found:**
- Run `python -m src.init_db` to create and seed the database

**ImportError for src module:**
- Make sure you're running scripts from the project root directory

## Next Steps

1. Build the React frontend
2. Add authentication system
3. Implement advanced filtering and search
4. Add task templates and recurring tasks
5. Add analytics and reporting features
"""
