#!/usr/bin/env python3
''' This contains a flask application '''

from flask import Flask, render_template, request
from flask_babel import Babel
from typing import Callable


class Config:
    ''' A configuration class '''

    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


@babel.localeselector
def get_locale():
    ''' gets the preferred language of a user '''

    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def home() -> Callable:
    ''' This is the index route '''

    return render_template('1-index.html')


if __name__ == "__main__":

    app.run()
