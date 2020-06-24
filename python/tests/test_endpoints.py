def test_choices(client):
    res = client.get('/choices')
    assert res.is_json
    data = res.get_json()
    assert len(data) == 5
    assert data[0]['id'] == 1 and data[0]['name'] == 'rock'
    assert data[1]['id'] == 2 and data[1]['name'] == 'paper'
    assert data[2]['id'] == 3 and data[2]['name'] == 'scissors'
    assert data[3]['id'] == 4 and data[3]['name'] == 'lizard'
    assert data[4]['id'] == 5 and data[4]['name'] == 'spock'

def test_choice(client):
    res = client.get('/choice')
    assert res.is_json
    data = res.get_json()
    assert len(data) == 2
    assert data['id'] in range(1, 6)
    assert data['name'] in ['rock', 'paper', 'scissors', 'lizard', 'spock']