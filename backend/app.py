import flask import Flask
import request
from flask_sqlaclhemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from environment.config import db_URI
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHElMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)
