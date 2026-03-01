"""
Database initialization and seeding script.
"""

import uuid
from datetime import datetime, timedelta
from src.config import create_app
from src.models import db, Organisation, Person, Link, Task


def init_db():
    """Initialize database and create sample data."""
    app = create_app('development')
    
    with app.app_context():
        # Clear existing data
        db.drop_all()
        db.create_all()
        
        print("Creating sample data...")
        
        # Create organisations
        org_engineering = Organisation(
            id='org-eng-001',
            name='Engineering',
            parent_id=None
        )
        org_sales = Organisation(
            id='org-sales-001',
            name='Sales',
            parent_id=None
        )
        db.session.add(org_engineering)
        db.session.add(org_sales)
        db.session.commit()
        print("✓ Organisations created")
        
        # Create people
        person1 = Person(
            id='person-001',
            first_name='Alice',
            last_name='Johnson',
            organisation_id='org-eng-001',
            email='alice.johnson@company.com'
        )
        person2 = Person(
            id='person-002',
            first_name='Bob',
            last_name='Smith',
            organisation_id='org-eng-001',
            email='bob.smith@company.com'
        )
        person3 = Person(
            id='person-003',
            first_name='Carol',
            last_name='Williams',
            organisation_id='org-sales-001',
            email='carol.williams@company.com'
        )
        db.session.add(person1)
        db.session.add(person2)
        db.session.add(person3)
        db.session.commit()
        print("✓ People created")
        
        # Create links
        link1 = Link(
            id='link-001',
            url='https://github.com/nextup/project',
            description='NextUp GitHub Repository'
        )
        link2 = Link(
            id='link-002',
            url='https://docs.nextup.io',
            description='NextUp Documentation'
        )
        db.session.add(link1)
        db.session.add(link2)
        db.session.commit()
        print("✓ Links created")
        
        # Create tasks
        today = datetime.utcnow()
        task1 = Task(
            id='task-001',
            title='Implement user authentication',
            description='Set up JWT-based authentication system',
            person_id='person-001',
            priority='HIGH',
            state='OPEN',
            due_date=today + timedelta(days=5)
        )
        task2 = Task(
            id='task-002',
            title='Design database schema',
            description='Create ERD and finalize database design',
            person_id='person-002',
            priority='HIGH',
            state='OPEN',
            due_date=today + timedelta(days=3)
        )
        task3 = Task(
            id='task-003',
            title='Write API documentation',
            description='Document all REST API endpoints',
            person_id='person-001',
            priority='MEDIUM',
            state='OPEN',
            due_date=today + timedelta(days=7)
        )
        task4 = Task(
            id='task-004',
            title='Setup CI/CD pipeline',
            description='Configure GitHub Actions for automated testing',
            person_id='person-002',
            priority='MEDIUM',
            state='CLOSED',
            completed_date=today - timedelta(days=1)
        )
        db.session.add(task1)
        db.session.add(task2)
        db.session.add(task3)
        db.session.add(task4)
        db.session.commit()
        print("✓ Tasks created")
        
        print("\n✓ Database initialized successfully!")
        print(f"Database location: instance/nextup.db")


if __name__ == '__main__':
    init_db()
