def test_choices(client):
    res = client.get('/choices')
    assert res.is_json
    data = res.get_json()
    assert len(data) == 5
    assert data[0]['id'] == 1 and data[0]['name'] == 'scissors'
    assert data[1]['id'] == 2 and data[1]['name'] == 'paper'
    assert data[2]['id'] == 3 and data[2]['name'] == 'rock'
    assert data[3]['id'] == 4 and data[3]['name'] == 'lizard'
    assert data[4]['id'] == 5 and data[4]['name'] == 'spock'

def test_choice(client):
    res = client.get('/choice')
    assert res.is_json
    data = res.get_json()
    assert len(data) == 2
    assert data['id'] in range(1, 6)
    assert data['name'] in ['rock', 'paper', 'scissors', 'lizard', 'spock']

def test_play(client):
    res = client.post('/play', json={ 'player': 1 })
    assert res.is_json
    data = res.get_json()
    assert len(data) == 3
    assert data['results'] in ('win', 'tie', 'lose')
    assert data['player'] in range(1, 6)
    assert data['computer'] in range(1, 6)

def test_calculate_winner(app):
    from rpssl_api import calculate_winner
    assert calculate_winner(1, 2) == 'win'
    assert calculate_winner(1, 4) == 'win'
    assert calculate_winner(3, 1) == 'win'
    assert calculate_winner(0, 2) == 'lose'
    assert calculate_winner(0, 4) == 'lose'
    assert calculate_winner(1, 1) == 'tie'