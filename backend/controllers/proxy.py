from flask import Blueprint, request, jsonify, g
from lib.secure_route import secure_route

router = Blueprint(__name__, "proxy")


@router.route("/news/<int:id>", methods=["GET"])
def index(id):
    print(id)
    return "hello"
    # return id

