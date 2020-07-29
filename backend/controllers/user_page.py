from flask import Blueprint, request, jsonify, g
from app import db
from models.user import User, UserSchema
from lib.secure_route import secure_route


user_schema = UserSchema()

router = Blueprint(__name__, "userpage")

# ! get the articles associated with the user?


@router.route("/userpage", methods=["GET"])
@secure_route
def show():
    # article = Article.query.filter_by(reader_id="1").all()
    # article = Article.query.filter(Article.reader_id.endswith(1)).all()
    # article = Article.find_
    user = User.query.get(g.current_user.id)

    if not user:
        return jsonify({"message": "user not shown"}), 404

    return user_schema.jsonify(user), 200
