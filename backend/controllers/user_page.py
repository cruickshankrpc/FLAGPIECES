from flask import Blueprint, request, jsonify, g
from app import db
from models.user import User, UserSchema 
from lib.secure_route import secure_route

router = Blueprint(__name__, 'singlearticle')

@router.route('/userarticle/<int:id>', methods=['GET'])
@secure_route
def show(id):
  article = Article.query.get(id)
      
  if not article:
    return jsonify({'message': 'article not shown'}), 404

  return article_schema.jsonify(article), 200