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

  raquel = User(
    username="raquel",
    email="raquel",
    password="tofu"
  )

  richard = User(
    username="richard",
    email="richard",
    password="richard"
  )

  testArticle = Article(
    id = 12345,
    title = "titletest",
    name = "nametest",
    url = "urltest",
    urlToImage = "urltoImage",
    publishedAt = 123,
    content = "content"
  )




  db.session.add(testArticle)
  db.session.add(richard)
  db.session.commit()

  angry = Reaction(
    name='angry',
    image='😠',
    count=0)

  happy = Reaction(
    name='happy',
    image='😊',
    count=0
  )

  funny = Reaction(
    name='funny',
    image='😂',
    count=0
  )

  surprised = Reaction(
    name='surprised',
    image='😲',
    count=0
  )

  sad = Reaction(
    name='sad',
    image='😓',
    count=0
  )

  db.session.add(angry)
  db.session.add(happy)
  db.session.add(funny)
  db.session.add(surprised)
  db.session.add(sad)

  db.session.commit()


