from app import db, ma 
from models.base import BaseModel, BaseSchema
from marshmallow import fields 

class Reaction(db.Model, BaseModel):

  __tablename__ = 'reactions'

  name = db.Column(db.String(25), nullable=True)

  image = db.Column(db.String(25), nullable=True)
  count = db.Column(db.Integer, nullable=True)


class ReactionSchema(ma.SQLAlchemyAutoSchema):

  class Meta:
    model=Reaction
    load_instance=True
