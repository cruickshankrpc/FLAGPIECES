# comments
from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields
from models.flag import Flag, FlagSchema
from models.user import User
from models.tag import Tag


class Article(db.Model, BaseModel):

    __tablename__ = 'articles'

    title =
    name =
    url =
    urlToImage =
    publishedAt =
    content =
