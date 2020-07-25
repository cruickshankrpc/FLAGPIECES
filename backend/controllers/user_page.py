from flask import Blueprint, request, jsonify, g
from app import db
from models.article import Article, ArticleSchema
from lib.secure_route import secure_route


article_schema = ArticleSchema()

router = Blueprint(__name__, 'userarticle')

@router.route('/userarticle/<int:id>', methods=['GET'])
@secure_route
def show(id):
  article = Article.query.get(id)
      
  if not article:
    return jsonify({'message': 'article not shown'}), 404

  return article_schema.jsonify(article), 200

