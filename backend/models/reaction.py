from app import db, ma 
from models.base import BaseModel, BaseSchema
from marshmallow import fields 

class Reaction(db.Model, BaseModel):

  __tablename__ = 'reactions'

  name = db.Column(db.String(25), nullable=False)

  image = db.Column(db.String(25), nullable=False)
  count = db.Column(db.Integer, nullable=False)


class ReactionSchema(ma.SQLAlchemyAutoSchema):

  class Meta:
    model=Reaction
    load_instance=True
