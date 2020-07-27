from flask import Blueprint, request, jsonify, g
from models.article import (
    Article,
    ArticleSchema,
    Comment,
    CommentSchema,
)

from models.reaction import Reaction, ReactionSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError

article_schema = ArticleSchema()
comment_schema = CommentSchema()

router = Blueprint(__name__, "singlearticle")

# ! code like the comment code below required? i.e. associating the reaction with the article?
# ! like below, the code is associating the comment with the article [POST?

# ? we don't need to use g.current_user.id because haven't added user.id to our reaction model
# ? if we want to add the flag or reaction to an article it would be like the article/ comments example?

# ? we could add the user id to our flag schema
# ? adding the flag to the front end information in the article model also


@router.route("/singlearticle/<int:id>", methods=["GET"])
def show(id):
    article = Article.query.get(id)

    if not article:
        return jsonify({"message": "article not shown"}), 404

    return article_schema.jsonify(article), 200


@router.route("/singlearticle/<int:article_id>/reaction", methods=["POST"])
@secure_route
def create():
    reaction_response = request.get_json()

    try:
        reaction = reaction_schema.load(reaction_response)
    except ValidationError as e:
        return jsonify({"errors": e.messages, "message": "Something went wrong!"})
    reaction.save()
    return reaction_schema.jsonify(reaction), 201


# @router.route("/singlearticle/<int:article_id>/reaction", methods=["POST"])
# @secure_route
# def reaction_create(article_id):
#     reaction_data = request.get_json()
#     article = Article.query.get(article_id)
#     reaction = reaction_schema.load(reaction_data)
#     # ! This tells sqlalchemy which article our reaction is associated with
#     reaction.article = article
#     # At this stage, the reaction is complete
#     reaction.save()
#     return reaction_schema.jsonify(reaction)

# ! if using this method we need to add/  uncomment the relationship with article
# ! delete/ comment the other method using many to many


S


@router.route("/singlearticle/<int:article_id>/comments", methods=["POST"])
def comment_create(article_id):
    comment_data = request.get_json()
    article = article.query.get(article_id)
    comment = comment_schema.load(comment_data)
    # At this stage, comment has only comment.content !!!
    # ! This tells sqlalchemy which article our comment is associated with
    comment.article = article
    # At this stage, the comment is complete
    comment.save()
    return comment_schema.jsonify(comment)
