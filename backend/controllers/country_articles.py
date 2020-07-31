from flask import Blueprint, request, jsonify, g
from models.article import Article, ArticleSchema
from app import db
from lib.secure_route import secure_route
from marshmallow import ValidationError


article_schema = ArticleSchema()

router = Blueprint(__name__, "countryarticle")

router = Blueprint(__name__, "proxy")
# router = Blueprint(__name__, "news")


# @router.route("/news/<int:id>", methods=["GET"])
# def index(id):
#     print(id)
#     return "hello"
#     # return id


@router.route("/proxy/<country>", methods=["GET"])
def blah(country):
    return country


@router.route("/countryarticles/article", methods=["POST"])
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

