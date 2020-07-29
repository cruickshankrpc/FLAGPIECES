from flask import Blueprint, request, jsonify
from models.article import Article, ArticleSchema
from models.reaction import Reaction, ReactionSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError


reaction_schema = ReactionSchema()

article_schema = ArticleSchema()

router = Blueprint(__name__, "feed")

# ! get and then filter BY Reaction or Flag
# ! then post the article that a user clicks to the flag to dbs


@router.route("/feed", methods=["GET"])
def show():
    articles = Article.query.all()


    # if not article:
    #     return jsonify({"message": "article not shown"}), 404

    return article_schema.jsonify(articles, many=True), 200


@router.route("/feed/article", methods=["POST"])
@secure_route
def create():
    article_response = request.get_json()
    article_response["reader_id"] = g.current_user.id

    try:
        article = article_schema.load(article_response)
    except ValidationError as e:
        return jsonify({"errors": e.messages, "message": "Something went wrong!"})

    article.save()
    return article_schema.jsonify(article), 201

