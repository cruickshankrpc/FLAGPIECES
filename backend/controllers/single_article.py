from flask import Blueprint, request, jsonify, g
from models.article import Article, ArticleSchema, Flag, FlagSchema, Comment, CommentSchema
from models.reaction import Reaction, ReactionSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError

article_schema = ArticleSchema()
comment_schema = CommentSchema()
flag_schema = FlagSchema()

router = Blueprint(__name__, 'singlearticle')

@router.route('/singlearticle/<int:id>', methods=['GET'])
def show(id):
  article = Article.query.get(id)
      
  if not article:
    return jsonify({'message': 'article not shown'}), 404

  return article_schema.jsonify(article), 200


@router.route('/singlearticle/<int:article_id>/reaction', methods=['POST'])
@secure_route
def create():
    reaction_response = request.get_json()
    reaction_response['reader_id'] = g.current_user.id

    try:
        reaction = reaction_schema.load(reaction_response)
    except ValidationError as e:
        return jsonify({'errors': e.messages, 'message': 'Something went wrong!'})

    reaction.save()
    return reaction_schema.jsonify(reaction), 201


@router.route('/singlearticle/<int:article_id>/flag', methods=['POST'])
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


# !to adapt code for articles

# ? Why use article_id here but not with when getting the article i.e. we only use <int:id>
# ? Could be a convention of Blueprint/ router

# @router.route('/singlearticle/<int:article_id>/comments', methods=['POST'])
# def comment_create(article_id):
#     comment_data = request.get_json()
#     article = article.query.get(article_id)
#     comment = comment_schema.load(comment_data)
#     # At this stage, comment has only comment.content !!!
#     # ! This tells sqlalchemy which article our comment is associated with
#     comment.article = article
#     # At this stage, the comment is complete
#     comment.save()
#     return comment_schema.jsonify(comment)
