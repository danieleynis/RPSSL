import random
from flask import Flask
from flask import render_template
from flask import json

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    choice_list = ('rock', 'paper', 'scissors', 'lizard', 'spock')
    num_choices = len(choice_list)
    zipped_list = zip(range(1, num_choices+1), choice_list)
    choices_id_list = [ { 'id': x, 'name': y } for x, y in zipped_list ]

    @app.route('/')
    def index():
        return render_template('index.html')

    @app.route('/choices')
    def choices():
        return json.jsonify(choices_id_list)

    @app.route('/choice')
    def choice():
        return choices_id_list[random.randint(0, num_choices-1)]


    @app.route('/play', methods=['POST'])
    def play():
        return 'Hello World!'


    return app
