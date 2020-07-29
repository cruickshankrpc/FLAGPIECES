from flask import Blueprint, request, jsonify, g
from app import db
from models.article import Article, ArticleSchema
from lib.secure_route import secure_route


article_schema = ArticleSchema()

router = Blueprint(__name__, "userpage")

# ! get the articles associated with the user?


@router.route("/userpage/<int:reader_id>", methods=["GET"])
@secure_route
def show(reader_id):
    article = Article.query.filter_by(reader_id="1").first()
    # article = Article.find_

    if not article:
        return jsonify({"message": "article not shown"}), 404

    return article_schema.jsonify(article), 200
