from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Simple in-memory storage (will reset on restart)
tasks = []
next_id = 1

# Data file for persistence
DATA_FILE = 'tasks.json'

def load_tasks():
    """Load tasks from file if it exists"""
    global tasks, next_id
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as f:
                data = json.load(f)
                tasks = data.get('tasks', [])
                next_id = data.get('next_id', 1)
        except Exception as e:
            print(f"Error loading tasks: {e}")
            tasks = []
            next_id = 1

def save_tasks():
    """Save tasks to file"""
    try:
        with open(DATA_FILE, 'w') as f:
            json.dump({'tasks': tasks, 'next_id': next_id}, f, indent=2)
    except Exception as e:
        print(f"Error saving tasks: {e}")

@app.route('/api/tasks', methods=['GET'])
def get_tasks():
    """Get all tasks"""
    return jsonify(tasks)

@app.route('/api/tasks', methods=['POST'])
def create_task():
    """Create a new task"""
    global next_id
    data = request.get_json()
    
    if not data or 'title' not in data:
        return jsonify({'error': 'Title is required'}), 400
    
    task = {
        'id': next_id,
        'title': data['title'],
        'description': data.get('description', ''),
        'completed': False,
        'created_at': datetime.now().isoformat()
    }
    
    tasks.append(task)
    next_id += 1
    save_tasks()
    
    return jsonify(task), 201

@app.route('/api/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    """Get a specific task"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    """Update a task"""
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    
    if 'title' in data:
        task['title'] = data['title']
    if 'description' in data:
        task['description'] = data['description']
    if 'completed' in data:
        task['completed'] = data['completed']
    
    save_tasks()
    return jsonify(task)

@app.route('/api/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task"""
    global tasks
    task = next((t for t in tasks if t['id'] == task_id), None)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    
    tasks = [t for t in tasks if t['id'] != task_id]
    save_tasks()
    return jsonify({'message': 'Task deleted'}), 200

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'ok', 'tasks_count': len(tasks)})

if __name__ == '__main__':
    load_tasks()
    app.run(debug=True, host='0.0.0.0', port=5000)
