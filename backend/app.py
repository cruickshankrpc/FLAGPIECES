from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from config.environment import db_uri
from flask_bcrypt import Bcrypt
import os


## registering your blueprints...

# app = Flask(__name__)

app = Flask(__name__, static_folder="dist")

app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import (
    country_articles,
    feed,
    search,
    single_article,
    user_page,
    users,
)


app.register_blueprint(country_articles.router, url_prefix="/api")
app.register_blueprint(feed.router, url_prefix="/api")
app.register_blueprint(search.router, url_prefix="/api")
app.register_blueprint(single_article.router, url_prefix="/api")
app.register_blueprint(user_page.router, url_prefix="/api")
app.register_blueprint(users.router, url_prefix="/api")


@app.route("/", defaults={"path": ""})  # homepage
@app.route("/<path:path>")  # any other path
def catch_all(path):
    dirname = os.path.dirname(__file__)
    filename = os.path.join(dirname, "dist/" + path)

    if os.path.isfile(filename):  # if path is a file, send it back
        return app.send_static_file(path)

    return app.send_static_file("index.html")  # otherwise send back the index.html file

