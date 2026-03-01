"""
API routes for NextUp application.
"""

import uuid
from datetime import datetime
from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from src.models import db, Organisation, Person, Link, Task

# Create blueprints
organisation_bp = Blueprint('organisations', __name__, url_prefix='/api/organisations')
person_bp = Blueprint('people', __name__, url_prefix='/api/people')
link_bp = Blueprint('links', __name__, url_prefix='/api/links')
task_bp = Blueprint('tasks', __name__, url_prefix='/api/tasks')


# ==================== ORGANISATION ROUTES ====================

@organisation_bp.route('', methods=['GET'])
def list_organisations():
    """List all organisations."""
    organisations = Organisation.query.all()
    return jsonify([org.to_dict() for org in organisations]), 200


@organisation_bp.route('/<org_id>', methods=['GET'])
def get_organisation(org_id):
    """Get a specific organisation."""
    org = Organisation.query.get(org_id)
    if not org:
        return jsonify({'error': 'Organisation not found'}), 404
    return jsonify(org.to_dict()), 200


@organisation_bp.route('', methods=['POST'])
def create_organisation():
    """Create a new organisation."""
    data = request.get_json()
    
    if not data or not data.get('name'):
        return jsonify({'error': 'Name is required'}), 400
    
    org_id = data.get('id', str(uuid.uuid4()))
    
    try:
        org = Organisation(
            id=org_id,
            name=data['name'],
            parent_id=data.get('parent_id')
        )
        db.session.add(org)
        db.session.commit()
        return jsonify(org.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Organisation with this ID already exists'}), 409


@organisation_bp.route('/<org_id>', methods=['PUT'])
def update_organisation(org_id):
    """Update an organisation."""
    org = Organisation.query.get(org_id)
    if not org:
        return jsonify({'error': 'Organisation not found'}), 404
    
    data = request.get_json()
    if data.get('name'):
        org.name = data['name']
    if 'parent_id' in data:
        org.parent_id = data['parent_id']
    
    db.session.commit()
    return jsonify(org.to_dict()), 200


@organisation_bp.route('/<org_id>', methods=['DELETE'])
def delete_organisation(org_id):
    """Delete an organisation."""
    org = Organisation.query.get(org_id)
    if not org:
        return jsonify({'error': 'Organisation not found'}), 404
    
    db.session.delete(org)
    db.session.commit()
    return '', 204


# ==================== PERSON ROUTES ====================

@person_bp.route('', methods=['GET'])
def list_people():
    """List all people."""
    people = Person.query.all()
    return jsonify([person.to_dict() for person in people]), 200


@person_bp.route('/<person_id>', methods=['GET'])
def get_person(person_id):
    """Get a specific person."""
    person = Person.query.get(person_id)
    if not person:
        return jsonify({'error': 'Person not found'}), 404
    return jsonify(person.to_dict()), 200


@person_bp.route('', methods=['POST'])
def create_person():
    """Create a new person."""
    data = request.get_json()
    
    required_fields = ['first_name', 'last_name', 'organisation_id', 'email']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    person_id = data.get('id', str(uuid.uuid4()))
    
    try:
        person = Person(
            id=person_id,
            first_name=data['first_name'],
            last_name=data['last_name'],
            organisation_id=data['organisation_id'],
            email=data['email']
        )
        db.session.add(person)
        db.session.commit()
        return jsonify(person.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Person with this ID or email already exists'}), 409


@person_bp.route('/<person_id>', methods=['PUT'])
def update_person(person_id):
    """Update a person."""
    person = Person.query.get(person_id)
    if not person:
        return jsonify({'error': 'Person not found'}), 404
    
    data = request.get_json()
    if data.get('first_name'):
        person.first_name = data['first_name']
    if data.get('last_name'):
        person.last_name = data['last_name']
    if data.get('organisation_id'):
        person.organisation_id = data['organisation_id']
    if data.get('email'):
        person.email = data['email']
    
    db.session.commit()
    return jsonify(person.to_dict()), 200


@person_bp.route('/<person_id>', methods=['DELETE'])
def delete_person(person_id):
    """Delete a person."""
    person = Person.query.get(person_id)
    if not person:
        return jsonify({'error': 'Person not found'}), 404
    
    db.session.delete(person)
    db.session.commit()
    return '', 204


# ==================== LINK ROUTES ====================

@link_bp.route('', methods=['GET'])
def list_links():
    """List all links."""
    links = Link.query.all()
    return jsonify([link.to_dict() for link in links]), 200


@link_bp.route('/<link_id>', methods=['GET'])
def get_link(link_id):
    """Get a specific link."""
    link = Link.query.get(link_id)
    if not link:
        return jsonify({'error': 'Link not found'}), 404
    return jsonify(link.to_dict()), 200


@link_bp.route('', methods=['POST'])
def create_link():
    """Create a new link."""
    data = request.get_json()
    
    if not data or not data.get('url'):
        return jsonify({'error': 'URL is required'}), 400
    
    link_id = data.get('id', str(uuid.uuid4()))
    
    try:
        link = Link(
            id=link_id,
            url=data['url'],
            description=data.get('description')
        )
        db.session.add(link)
        db.session.commit()
        return jsonify(link.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Link with this ID already exists'}), 409


@link_bp.route('/<link_id>', methods=['PUT'])
def update_link(link_id):
    """Update a link."""
    link = Link.query.get(link_id)
    if not link:
        return jsonify({'error': 'Link not found'}), 404
    
    data = request.get_json()
    if data.get('url'):
        link.url = data['url']
    if 'description' in data:
        link.description = data.get('description')
    
    db.session.commit()
    return jsonify(link.to_dict()), 200


@link_bp.route('/<link_id>', methods=['DELETE'])
def delete_link(link_id):
    """Delete a link."""
    link = Link.query.get(link_id)
    if not link:
        return jsonify({'error': 'Link not found'}), 404
    
    db.session.delete(link)
    db.session.commit()
    return '', 204


# ==================== TASK ROUTES ====================

@task_bp.route('', methods=['GET'])
def list_tasks():
    """List all tasks with optional filtering."""
    # Get query parameters for filtering
    person_id = request.args.get('person_id')
    state = request.args.get('state')
    priority = request.args.get('priority')
    
    query = Task.query
    
    if person_id:
        query = query.filter_by(person_id=person_id)
    if state:
        query = query.filter_by(state=state)
    if priority:
        query = query.filter_by(priority=priority)
    
    tasks = query.all()
    return jsonify([task.to_dict() for task in tasks]), 200


@task_bp.route('/<task_id>', methods=['GET'])
def get_task(task_id):
    """Get a specific task."""
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    return jsonify(task.to_dict()), 200


@task_bp.route('', methods=['POST'])
def create_task():
    """Create a new task."""
    data = request.get_json()
    
    required_fields = ['title', 'person_id']
    if not data or not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400
    
    task_id = data.get('id', str(uuid.uuid4()))
    
    try:
        due_date = None
        if data.get('due_date'):
            due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
        
        task = Task(
            id=task_id,
            title=data['title'],
            description=data.get('description'),
            person_id=data['person_id'],
            priority=data.get('priority', 'MEDIUM'),
            state=data.get('state', 'OPEN'),
            due_date=due_date
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'Task with this ID already exists'}), 409
    except ValueError as e:
        return jsonify({'error': f'Invalid date format: {str(e)}'}), 400


@task_bp.route('/<task_id>', methods=['PUT'])
def update_task(task_id):
    """Update a task."""
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    data = request.get_json()
    
    if data.get('title'):
        task.title = data['title']
    if 'description' in data:
        task.description = data.get('description')
    if data.get('priority'):
        task.priority = data['priority']
    if data.get('state'):
        task.state = data['state']
        # Set completed date if marking as closed
        if data['state'] == 'CLOSED' and not task.completed_date:
            task.completed_date = datetime.utcnow()
    if data.get('due_date'):
        task.due_date = datetime.fromisoformat(data['due_date'].replace('Z', '+00:00'))
    
    db.session.commit()
    return jsonify(task.to_dict()), 200


@task_bp.route('/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    """Delete a task."""
    task = Task.query.get(task_id)
    if not task:
        return jsonify({'error': 'Task not found'}), 404
    
    db.session.delete(task)
    db.session.commit()
    return '', 204


# ==================== DASHBOARD ROUTES ====================

@task_bp.route('/dashboard/upcoming', methods=['GET'])
def get_upcoming_tasks():
    """Get upcoming tasks grouped by person."""
    from sqlalchemy import and_
    
    tasks = Task.query.filter(
        and_(
            Task.state == 'OPEN',
            Task.due_date.isnot(None)
        )
    ).order_by(Task.due_date).all()
    
    return jsonify([task.to_dict() for task in tasks]), 200
