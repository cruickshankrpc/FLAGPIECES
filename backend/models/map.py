from app import db, ma
from models.base import BaseModel, BaseSchema
from marshmallow import fields

class Map(db.Model, BaseModel):

  __tablename__ = 'maps'

  places = db.Column(db.String(80), nullable=False)
  longitude = db.Column(db.Integer, nullable=False)
  latitude = db.Column(db.Integer, nullable=False)

class MapSchema(ma.SQLAlchemyAutoSchema):

  class Meta: 
    model=Map
    load_instance=True