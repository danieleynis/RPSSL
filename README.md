# Introduction
This is a simple frontend + API implementation of the game ROCK-PAPER-SCISSORS-SPOCK-LIZARD using Flask and React

Find out more here about the game: http://www.samkass.com/theories/RPSSL.html

# Setup
## Python Flask Backend
Pre-requisites: python3
```
cd python
python3 -m venv venv (optional but reccomended)
source venv/bin/activate (only applies if using venv above)
pip install -r requirements.txt
export FLASK_APP=rpssl_api
export FLASK_ENV=development
flask run
```

## React Frontend
Pre-requisites: node.js, npm
```
cd javascript/rpssl_app
npm install
npm start
```

A browser window should automatically open and launch the app (if you do not see this go to http://localhost:3000). The app should look like the following:

<img width="641" alt="Screen Shot 2020-06-28 at 10 34 10 PM" src="https://user-images.githubusercontent.com/11580217/85976482-85888500-b98f-11ea-85eb-fbd0a6de2304.png">


# Testing
There are python unit tests for the API. You can run them like so from within the `python` directory:
```
pytest --cov=rpssl_api tests
```

# References
* https://flask.palletsprojects.com/en/1.1.x/
* https://flask-cors.readthedocs.io/en/latest/
* https://docs.python.org/3/library/
* https://reactjs.org/docs/
