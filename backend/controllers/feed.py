from flask import Blueprint, request, jsonify
from models.article import Article, ArticleSchema
from models.reaction import Reaction, ReactionSchema, Flag, FlagSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError


reaction_schema = ReactionSchema()
flag_schema = FlagSchema()

article_schema = ArticleSchema()

router = Blueprint(__name__, 'feed')

# ! get and then filter BY Reaction or Flag
# ! then post the article with the flag to dbs

@router.route('/feed/<int:id>/reaction', methods=['GET'])
def show(id):
  article = Article.query.get(id)
      
  if not article:
    return jsonify({'message': 'article not shown'}), 404

  return article_schema.jsonify(article), 200



@router.route('/feed/<int:id>/flags', methods=['GET'])
def flag_show(id):
  article = Article.query.get(id)
      
  if not article:
    return jsonify({'message': 'article not shown'}), 404

  return article_schema.jsonify(article), 200



@router.route('/feed/article', methods=['POST'])
@secure_route
def create():
  article_response = request.get_json()
  article_response['reader_id'] = g.current_user.id

  try:
      article = article_schema.load(article_response)
  except ValidationError as e:
      return jsonify({'errors': e.messages, 'message': 'Something went wrong!'})

  article.save()
  return article_schema.jsonify(article), 201


@router.route('/feed/flags', methods=['POST'])
@secure_route
def flag_create():
  flag_response = request.get_json()
  flag_response['reader_id'] = g.current_user.id

  try:
      flag = flag_schema.load(flag_response)
  except ValidationError as e:
      return jsonify({'errors': e.messages, 'message': 'Something went wrong!'})

  flag.save()
  return flag_schema.jsonify(flag), 201

