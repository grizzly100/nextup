# Next Up - Task Management Application

A simple task management application built with Python (Flask) backend and React frontend. This project was created to demonstrate a full-stack web application with CRUD operations.

## Features

- ✅ Create new tasks with title and description
- ✅ Mark tasks as completed/incomplete
- ✅ Delete tasks
- ✅ Persistent storage (tasks saved to file)
- ✅ Clean and responsive UI
- ✅ Real-time task statistics

## Tech Stack

**Backend:**
- Python 3.12+
- Flask (REST API)
- Flask-CORS (Cross-Origin Resource Sharing)
- JSON file storage

**Frontend:**
- React 19
- Modern CSS with gradients and animations
- Fetch API for backend communication

## Project Structure

```
nextup/
├── backend/
│   ├── app.py              # Flask API server
│   ├── requirements.txt    # Python dependencies
│   └── tasks.json          # Task data storage (generated)
├── frontend/
│   ├── src/
│   │   ├── App.js         # Main React component
│   │   ├── App.css        # Styling
│   │   └── index.js       # React entry point
│   ├── public/
│   └── package.json       # Node dependencies
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.12 or higher
- Node.js 18 or higher
- npm 8 or higher

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the backend server:
```bash
python app.py
```

To enable debug mode during development (not recommended for production):
```bash
FLASK_DEBUG=true python app.py
```

The backend will start on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## API Endpoints

### Tasks

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "Task title", "description": "Optional description" }`
- `GET /api/tasks/:id` - Get a specific task
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ "title": "...", "description": "...", "completed": true/false }`
- `DELETE /api/tasks/:id` - Delete a task

### Health Check

- `GET /api/health` - Check API status

## Usage

1. **Start the backend**: Run `python app.py` in the `backend` directory
2. **Start the frontend**: Run `npm start` in the `frontend` directory
3. **Open your browser**: Navigate to `http://localhost:3000`
4. **Add tasks**: Enter a title and optional description, then click "Add Task"
5. **Complete tasks**: Click the checkbox to mark tasks as complete
6. **Delete tasks**: Click the "Delete" button to remove a task

## Development

### Running Tests

Currently, this is a minimal implementation. To add tests:

**Backend:**
```bash
cd backend
pip install pytest
pytest
```

**Frontend:**
```bash
cd frontend
npm test
```

### Building for Production

**Frontend:**
```bash
cd frontend
npm run build
```

This creates an optimized production build in the `build` directory.

## Future Enhancements

- [ ] User authentication
- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task priority levels
- [ ] Search and filter functionality
- [ ] Dark mode
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Docker containerization
- [ ] Unit and integration tests

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Authors

Built with assistance from GitHub Copilot and Anthropic Claude.

