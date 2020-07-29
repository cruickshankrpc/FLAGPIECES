# comments
from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields
from models.user import User
from models.reaction import Reaction, ReactionSchema

articles_reactions = db.Table(
    "articles_reactions",
    db.Column(
        "reaction_id", db.Integer, db.ForeignKey("reactions.id"), primary_key=True
    ),
    db.Column("article_id", db.Integer, db.ForeignKey("articles.id"), primary_key=True),
)

# articles_flags = db.Table('articles_flags',
#   db.Column('flag_id', db.Integer, db.ForeignKey('flag.id'), primary_key=True),
#   db.Column('article_id', db.Integer, db.ForeignKey('articles.id'), primary_key=True)
# )


class Article(db.Model, BaseModel):

    __tablename__ = "articles"

    title = db.Column(db.Text, nullable=False)
    # name is the news source (e.g. BBC News)
    name = db.Column(db.Text, nullable=True)
    url = db.Column(db.Text, nullable=True)
    urlToImage = db.Column(db.Text, nullable=True)
    publishedAt = db.Column(db.String(25), nullable=True)
    content = db.Column(db.Text, nullable=True)
    flag_image = db.Column(db.String(25), nullable=True)

    reactions = db.relationship(
        "Reaction", secondary=articles_reactions, backref="articles"
    )

    reader_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=True)
    reader = db.relationship("User", backref="reader_articles")

    # flags = db.relationship('Flag', secondary=articles_flags, backref='flags')

    # flag_id = db.Column(db.String, db.ForeignKey('flags.id'))
    # flag = db.relationship('Flag', backref='flag_id')


class Comment(db.Model, BaseModel):

    __tablename__ = "comments"

    content = db.Column(db.Text, nullable=True)

    article_id = db.Column(db.Integer, db.ForeignKey("articles.id"))
    article = db.relationship("Article", backref="comments")


class ArticleSchema(ma.SQLAlchemyAutoSchema, BaseSchema):
    class Meta:
        model = Article
        load_instance = True

    comments = fields.Nested("CommentSchema", many=True)

    reactions = fields.Nested("ReactionSchema", many=True)

    reader = fields.Nested("UserSchema", only=("id", "username"))
    reader_id = fields.Integer()

    # flags=fields.Nested('FlagSchema', many=True)
    # flag=fields.Nested('FlagSchema', many=True)
    # flag_id=fields.Integer()


class CommentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Comment
        load_instance = True

