import random
from flask import Flask, render_template, json, request
from flask_cors import CORS

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)

    if test_config is not None:
        app.config.from_mapping(test_config)

    choice_list = ('scissors', 'paper', 'rock', 'lizard', 'spock')
    num_choices = len(choice_list)
    zipped_list = zip(range(1, num_choices+1), choice_list)
    choices_id_list = [ { 'id': x, 'name': y } for x, y in zipped_list ]
    
    @app.route('/choices')
    def choices():
        return json.jsonify(choices_id_list)

    @app.route('/choice')
    def choice():
        return choices_id_list[random.randint(0, num_choices-1)]

    @app.route('/play', methods=['POST'])
    def play():
        data = request.get_json()
        player_choice = data['player']
        computer_choice = choice()['id']
        result = calculate_winner(player_choice-1, computer_choice-1)
        return {
            'results': result,
            'player': player_choice,
            'computer': computer_choice
        }

    return app

"""
The way this method calculates if you win agains the computer is by taking a range
of numbers 0-4 based on the id you and the computer chose. If we order the options
in a specific way we can see that if we look at one choice it is able to destroy the
choice that comes after it or the choice that comes 3 spaces from it (also looping around)

For example:
0 = scissors, this means that it is able to destroy 0+1 = 1 = paper and 0+3 = 3 = lizard
In addition to this we need to use the modulo operator because element at the end such as
4 = spock need to be able to loop around back
"""
def calculate_winner(player_choice, computer_choice):
    if computer_choice in [(player_choice + 1) % 5, (player_choice + 3) % 5]:
        return 'win'
    if player_choice in [(computer_choice + 1) % 5, (computer_choice + 3) % 5]:
        return 'lose'
    return 'tie'
