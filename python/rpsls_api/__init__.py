import os
from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    @app.route('/choices')
    def get_choices():
        return 'Hello World!'

    @app.route('/choice')
    def get_choice():
        return 'Hello World!'

    @app.route('/play', methods=['POST'])
    def play():
        return 'Hello World!'

    return app
