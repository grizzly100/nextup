# NextUp - React Frontend

A modern, responsive React frontend for the NextUp task management application.

## Features

- **Dashboard** - Overview of upcoming tasks and statistics
- **Task Management** - Create, view, edit, and delete tasks
- **People Management** - Manage team members and their assignments
- **Organisation Management** - Organize people into departments/teams
- **Link Management** - Keep track of important URLs
- **Real-time Filtering** - Filter tasks by state, priority, and assignee
- **Responsive Design** - Works on desktop, tablet, and mobile

## Installation

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## Configuration

The frontend communicates with the Flask backend API. By default, it's configured to use `http://localhost:5000`.

To change the API URL, edit [src/services/api.js](src/services/api.js):

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/       # Reusable components
│   │   ├── Navigation.js
│   │   ├── TaskList.js
│   │   ├── PeopleList.js
│   │   ├── OrganisationList.js
│   │   └── LinkList.js
│   ├── pages/            # Page components
│   │   ├── Dashboard.js
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── index.css
└── package.json
```

## Technologies Used

- **React** 18.2.0 - UI library
- **React Router** 6.20.0 - Client-side routing
- **Axios** 1.6.0 - HTTP client
- **CSS** - Styling

## Available Scripts

### `npm start`
Runs the app in development mode.

### `npm test`
Launches the test runner.

### `npm run build`
Builds the app for production.

### `npm run eject`
Ejects from Create React App configuration (one-way operation).

## Troubleshooting

**CORS Error?**
Make sure the Flask backend is running and CORS is enabled. Check that `flask-cors` is installed on the backend.

**API Connection Failed?**
- Verify Flask server is running on `http://localhost:5000`
- Check that the API URL in [src/services/api.js](src/services/api.js) is correct
- Check browser console for more details

**Port 3000 already in use?**
Use a different port:
```bash
PORT=3001 npm start
```
