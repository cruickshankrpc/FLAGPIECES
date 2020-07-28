from flask import Blueprint, request, jsonify, g
from models.article import Article, ArticleSchema, Comment, CommentSchema

from models.reaction import Reaction, ReactionSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError

article_schema = ArticleSchema()
comment_schema = CommentSchema()
reaction_schema = ReactionSchema()

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


# @router.route("/singlearticle/<int:article_id>/reaction", methods=["PUT"])
# @secure_route
# def reaction_create(article_id):
#   print(article_id)
#   existing_article = Article.query.get(article_id)
#   reaction = Reaction.query.get(request.get_json()['reactions'])
#   print(reaction)
#   new_article = request.get_json()
#   new_article['reactions'] = reaction
#   print('this is new article:', new_article)
#   article = article_schema.load(new_article, instance=existing_article, partial=True)
#   print(reaction['reactions'])

#   if article.reader != g.current_user:
#     return jsonify({'message': 'Unauthorized'}), 401

#   article.save()
#   return article_schema.jsonify(article), 201


@router.route("/singlearticle/<int:article_id>/reaction", methods=["POST"])
@secure_route
def reaction_create(article_id):
    # posting reaction
    reaction = request.get_json()
    # loading new reaction to schema
    new_reaction = reaction_schema.load(reaction)
    # finding article by id
    existing_article = Article.query.get(article_id)
    # saving new reaction
    new_reaction.save()

    #  joining article with new reactions  (plus is python)
    #   (referring to the relationship of reactions = db.relationship( "Reaction", secondary=articles_reactions, backref="articles")

    existing_article.reactions = existing_article.reactions + [new_reaction]
    # saving
    existing_article.save()

    return reaction_schema.jsonify(new_reaction), 201

    # existing_article = Article.query.get(article_id)

    # article = article_schema.load(article_schema.dump(existing_article), instance=existing_article, partial=True)
    # article['reactions'].append(reaction())

    # if article.reader != g.current_user:
    #   return jsonify({'message': 'Unauthorized'}), 401

    # article.save()
    # return article_schema.jsonify(article), 201

    # try:
    #     reaction = reaction_schema.load(reaction_response)
    # except ValidationError as e:
    #     return jsonify({"errors": e.messages, "message": "Something went wrong!"})
    # reaction.save()
    # return reaction_schema.jsonify(reaction), 201


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


@router.route("/singlearticle/<int:article_id>/comments", methods=["POST"])
def comment_create(article_id):
    comment_data = request.get_json()
    article = Article.query.get(article_id)
    comment = comment_schema.load(comment_data)
    # At this stage, comment has only comment.content !!!
    # ! This tells sqlalchemy which article our comment is associated with
    comment.article = article
    # At this stage, the comment is complete
    comment.save()
    return comment_schema.jsonify(comment)
