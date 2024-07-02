#!/usr/bin/env python3
''' This contains a flask application '''

from flask import Flask, render_template
from flask_babel import Babel
from typing import Callable


class Config:
    ''' A configuration class '''

    LANGUAGES = ['en', 'fr']


app = Flask(__name__)
babel = Babel(app, Config.LANGUAGES)


@app.route('/')
def home() -> Callable:
    ''' This is the index route '''

    return render_template('1-index.html')


if __name__ == "__main__":

    app.run()
