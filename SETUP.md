# NextUp - Complete Setup Guide

This guide will help you set up and run the complete NextUp application (backend + frontend).

## Prerequisites

- Python 3.8 or higher
- Node.js 14+ and npm
- Git (optional)

## Quick Start (5 minutes)

### Terminal 1: Start the Backend

```bash
# Navigate to project root
cd c:\Dev\projects\python\nextup

# Activate virtual environment
.venv\Scripts\activate

# Run database initialization (first time only)
python -m src.init_db

# Start Flask server
python src/main.py
```

Expected output:
```
Welcome to NextUp!
Task management made simple.

Starting Flask development server...
Access the API at: http://localhost:5000
```

### Terminal 2: Start the Frontend

```bash
# Navigate to frontend directory
cd c:\Dev\projects\python\nextup\frontend

# Install dependencies (first time only)
npm install

# Start React development server
npm start
```

The frontend will automatically open at `http://localhost:3000`.

## Accessing the Application

- **Frontend**: http://localhost:3000
- **API**: http://localhost:5000/api
- **API Documentation**: See [STARTING.md](STARTING.md) for API examples

## Features Available

### Dashboard (Home Page)
- View upcoming tasks
- See team statistics
- Quick overview of priorities

### Tasks Management
- Create new tasks
- Filter by state, priority, and assignee
- Mark tasks as complete
- Delete tasks
- Set due dates and priorities

### People Management
- View all team members
- Create new people
- Assign to organisations
- Delete entries

### Organization Management
- View all organisations
- Create organisational hierarchy
- Delete organisations

### Links Management
- Store and manage useful links
- Add descriptions for easy reference
- Quick access to resources

## Troubleshooting

### Backend Issues

**Port 5000 already in use:**
Edit `src/main.py` and change:
```python
app.run(debug=True, host='0.0.0.0', port=5001)
```

**ModuleNotFoundError:**
Make sure you're in the virtual environment:
```bash
.venv\Scripts\activate
```

**Database not found:**
Reinitialize the database:
```bash
python -m src.init_db
```

### Frontend Issues

**Cannot connect to API:**
- Verify Flask backend is running on port 5000
- Check browser console for CORS errors
- Try clearing browser cache

**Port 3000 already in use:**
```bash
set PORT=3001 && npm start
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
rm -r node_modules package-lock.json
npm install
```

## Development Workflow

1. **Backend Development**
   - Edit Python files in `src/`
   - Flask auto-reloads on changes
   - Run tests: `python -m pytest tests/`

2. **Frontend Development**
   - Edit React files in `frontend/src/`
   - React auto-reloads on changes
   - Browser DevTools for debugging

## Building for Production

### Backend
No build required. Deploy the Python application with dependencies.

### Frontend
```bash
cd frontend
npm run build
```

This creates optimized files in `frontend/build/`.

## Testing

### Backend Tests
```bash
python -m pytest tests/ -v
```

### Frontend (No tests configured yet)
```bash
cd frontend
npm test
```

## API Examples

### Create a Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Task",
    "description": "Task description",
    "person_id": "person-001",
    "priority": "HIGH",
    "due_date": "2026-03-10T09:00:00"
  }'
```

### Get All Tasks
```bash
curl http://localhost:5000/api/tasks
```

### Get Upcoming Tasks
```bash
curl http://localhost:5000/api/tasks/dashboard/upcoming
```

## Stopping the Application

Press `CTRL+C` in each terminal to stop the servers.

## Next Steps

- Check [requirements.md](requirements.md) for project requirements
- Review [STARTING.md](STARTING.md) for detailed API documentation
- Check [frontend/README.md](frontend/README.md) for frontend-specific documentation

## Support

For help or issues:
1. Check the Troubleshooting section above
2. Review the documentation files
3. Check browser console and server logs for error messages

Happy task managing! 📋✨
