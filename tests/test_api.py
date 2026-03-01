"""
Unit tests for NextUp application.
"""

import json
import pytest
from src.config import create_app
from src.models import db, Organisation, Person


@pytest.fixture
def app():
    """Create and configure a test app."""
    app = create_app('testing')
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Test client for the app."""
    return app.test_client()


@pytest.fixture
def sample_org(app):
    """Create a sample organisation."""
    with app.app_context():
        org = Organisation(
            id='test-org-001',
            name='Test Organisation'
        )
        db.session.add(org)
        db.session.commit()
        return org


# ==================== ORGANISATION TESTS ====================

def test_create_organisation(client):
    """Test creating an organisation."""
    response = client.post('/api/organisations', 
        json={'name': 'New Org'},
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == 'New Org'


def test_list_organisations(client, sample_org):
    """Test listing organisations."""
    response = client.get('/api/organisations')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) >= 1
    assert any(org['name'] == 'Test Organisation' for org in data)


def test_get_organisation(client, sample_org):
    """Test getting a specific organisation."""
    response = client.get('/api/organisations/test-org-001')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['id'] == 'test-org-001'
    assert data['name'] == 'Test Organisation'


def test_update_organisation(client, sample_org):
    """Test updating an organisation."""
    response = client.put('/api/organisations/test-org-001',
        json={'name': 'Updated Org'},
        content_type='application/json'
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['name'] == 'Updated Org'


def test_delete_organisation(client, sample_org):
    """Test deleting an organisation."""
    response = client.delete('/api/organisations/test-org-001')
    assert response.status_code == 204
    
    # Verify it's deleted
    response = client.get('/api/organisations/test-org-001')
    assert response.status_code == 404


# ==================== PERSON TESTS ====================

def test_create_person(client, sample_org):
    """Test creating a person."""
    response = client.post('/api/people',
        json={
            'first_name': 'John',
            'last_name': 'Doe',
            'organisation_id': 'test-org-001',
            'email': 'john@example.com'
        },
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['first_name'] == 'John'
    assert data['email'] == 'john@example.com'


def test_list_people(client, sample_org):
    """Test listing people."""
    # Create a person first
    client.post('/api/people',
        json={
            'first_name': 'Jane',
            'last_name': 'Smith',
            'organisation_id': 'test-org-001',
            'email': 'jane@example.com'
        },
        content_type='application/json'
    )
    
    response = client.get('/api/people')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) >= 1


# ==================== LINK TESTS ====================

def test_create_link(client):
    """Test creating a link."""
    response = client.post('/api/links',
        json={
            'url': 'https://example.com',
            'description': 'Example Link'
        },
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['url'] == 'https://example.com'


def test_list_links(client):
    """Test listing links."""
    # Create a link first
    client.post('/api/links',
        json={
            'url': 'https://test.com',
            'description': 'Test Link'
        },
        content_type='application/json'
    )
    
    response = client.get('/api/links')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) >= 1


# ==================== TASK TESTS ====================

def test_create_task(client, sample_org):
    """Test creating a task."""
    # Create a person first
    person_response = client.post('/api/people',
        json={
            'first_name': 'Test',
            'last_name': 'User',
            'organisation_id': 'test-org-001',
            'email': 'test@example.com'
        },
        content_type='application/json'
    )
    person_data = json.loads(person_response.data)
    
    # Create a task
    response = client.post('/api/tasks',
        json={
            'title': 'Test Task',
            'description': 'A test task',
            'person_id': person_data['id'],
            'priority': 'HIGH'
        },
        content_type='application/json'
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == 'Test Task'
    assert data['priority'] == 'HIGH'


def test_list_tasks(client, sample_org):
    """Test listing tasks."""
    response = client.get('/api/tasks')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_filter_tasks_by_state(client):
    """Test filtering tasks by state."""
    response = client.get('/api/tasks?state=OPEN')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
