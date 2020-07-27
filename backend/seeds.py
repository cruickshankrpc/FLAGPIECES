from app import app, db
from models.reaction import Reaction
from models.article import Article, Comment, Flag
from models.user import User

with app.app_context():
    db.drop_all()
    db.create_all()

    raquel = User(username="raquel", email="raquel", password="tofu")

    richard = User(username="richard", email="richard", password="richard")

    angry = Reaction(name="angry", image="😠")

    happy = Reaction(name="happy", image="😊")

    funny = Reaction(name="funny", image="😂")

    surprised = Reaction(name="surprised", image="😲")

    sad = Reaction(name="sad", image="😓")

    db.session.add(angry)
    db.session.add(happy)
    db.session.add(funny)
    db.session.add(surprised)
    db.session.add(sad)

    db.session.commit()

    testArticle = Article(
        id=12345,
        title="titletest",
        name="nametest",
        url="urltest",
        urlToImage="urltoImage",
        publishedAt=123,
        content="content",
        reactions=[angry],
    )

    db.session.add(testArticle)
    db.session.add(richard)

    db.session.commit()

