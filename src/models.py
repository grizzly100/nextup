"""
Database models for NextUp application.
"""

from datetime import datetime
from enum import Enum
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class TaskPriority(Enum):
    """Task priority levels."""
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"


class TaskState(Enum):
    """Task state/status."""
    OPEN = "OPEN"
    CLOSED = "CLOSED"


class Organisation(db.Model):
    """Organisation reference data."""
    __tablename__ = 'organisations'

    id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    parent_id = db.Column(db.String(50), db.ForeignKey('organisations.id'), nullable=True)

    # Relationships
    children = db.relationship('Organisation', remote_side=[id], backref='parent')
    people = db.relationship('Person', backref='organisation', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Organisation {self.id}: {self.name}>'

    def to_dict(self):
        """Convert to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'parent_id': self.parent_id
        }


class Person(db.Model):
    """Person reference data."""
    __tablename__ = 'people'

    id = db.Column(db.String(50), primary_key=True)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    organisation_id = db.Column(db.String(50), db.ForeignKey('organisations.id'), nullable=False)
    email = db.Column(db.String(255), nullable=False, unique=True)

    # Relationships
    tasks = db.relationship('Task', backref='assigned_to', lazy=True, cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Person {self.id}: {self.first_name} {self.last_name}>'

    def to_dict(self):
        """Convert to dictionary."""
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'organisation_id': self.organisation_id,
            'email': self.email
        }


class Link(db.Model):
    """Link reference data."""
    __tablename__ = 'links'

    id = db.Column(db.String(50), primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    description = db.Column(db.String(500), nullable=True)

    def __repr__(self):
        return f'<Link {self.id}: {self.description}>'

    def to_dict(self):
        """Convert to dictionary."""
        return {
            'id': self.id,
            'url': self.url,
            'description': self.description
        }


class Task(db.Model):
    """Task management entity."""
    __tablename__ = 'tasks'

    id = db.Column(db.String(50), primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    person_id = db.Column(db.String(50), db.ForeignKey('people.id'), nullable=False)
    priority = db.Column(db.String(10), nullable=False, default=TaskPriority.MEDIUM.value)
    state = db.Column(db.String(10), nullable=False, default=TaskState.OPEN.value)
    due_date = db.Column(db.DateTime, nullable=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    completed_date = db.Column(db.DateTime, nullable=True)

    def __repr__(self):
        return f'<Task {self.id}: {self.title}>'

    def to_dict(self):
        """Convert to dictionary."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'person_id': self.person_id,
            'priority': self.priority,
            'state': self.state,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'created_date': self.created_date.isoformat(),
            'completed_date': self.completed_date.isoformat() if self.completed_date else None
        }
