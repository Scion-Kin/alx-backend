#!/usr/bin/env python3
''' This contains a flask application '''

from flask import Flask, render_template
from typing import Callable

app = Flask(__name__)


@app.route('/')
def home() -> Callable:
    ''' This is the index route '''

    return render_template('0-index.html')


if __name__ == "__main__":

    app.run()
