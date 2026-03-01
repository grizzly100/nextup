#!/usr/bin/env python3
"""
NextUp - Task Management Application
Main entry point for the application.
"""

import sys
import os

# Add parent directory to path to allow imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.config import create_app


def main():
    """Main entry point for the NextUp application."""
    app = create_app('development')
    
    print("Welcome to NextUp!")
    print("Task management made simple.")
    print("\nStarting Flask development server...")
    print("Access the API at: http://localhost:5000")
    print("Press CTRL+C to stop the server\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)


if __name__ == "__main__":
    main()
