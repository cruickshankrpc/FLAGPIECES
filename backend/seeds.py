from app import app, db
from models.reaction import Reaction 
# ! use the . to drill down inside a module
# ? importing my model here.
from models.article import Article, Comment, Flag
from models.user import User


# ! in here, we're connecting our database. 'with' will cleanup connections
# ! once we're done.
with app.app_context():
  # ? This code will seed stuff into the database.
  # ? its sqlalchemy code.
  db.drop_all() # drop all tables in database
  db.create_all() # create all tables in database
