from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from environment.config import db_URI
from flask_bcrypt import Bcrypt

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)



from controllers import users, single_article


# app.register_blueprint(teas.router, url_prefix="/api")


app.register_blueprint(users.router, url_prefix="/api")
app.register_blueprint(single_article.router, url_prefix="/api")
