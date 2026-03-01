"""
Flask application factory and configuration.
"""

import os
from flask import Flask
from flask_cors import CORS
from src.models import db


def create_app(config_name='development'):
    """
    Application factory function.
    
    Args:
        config_name: Configuration environment (development, testing, production)
    
    Returns:
        Configured Flask application instance
    """
    app = Flask(__name__)
    
    # Configuration
    if config_name == 'testing':
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
    else:
        # Use SQLite database in the instance folder
        instance_path = os.path.join(os.path.dirname(__file__), '..', 'instance')
        os.makedirs(instance_path, exist_ok=True)
        app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{os.path.join(instance_path, "nextup.db")}'
    
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JSON_SORT_KEYS'] = False
    
    # Initialize extensions
    db.init_app(app)
    CORS(app)
    
    # Register blueprints
    from src.routes import (
        organisation_bp,
        person_bp,
        link_bp,
        task_bp
    )
    
    app.register_blueprint(organisation_bp)
    app.register_blueprint(person_bp)
    app.register_blueprint(link_bp)
    app.register_blueprint(task_bp)
    
    # Create tables
    with app.app_context():
        db.create_all()
    
    return app
