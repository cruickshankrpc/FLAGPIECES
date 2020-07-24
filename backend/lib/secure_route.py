from flask import request, jsonify, g
import jwt
from environment.config import secret 
from models.user import User
from functools import wraps

def secure_route(fun):
  @wraps(fun)
  def wrapper(*args, **kwargs):
    raw_token = request.headers['Authorization']
    clean_token = raw_token.replace('Bearer ', '')

    try: 
      payload = jwt.decode(clean_token, secret)
      print('This far...')
      g.current_user = User.query.get(payload['sub'])
    except jwt.ExpiredSignatureError: 
      return jsonify({ 'message': 'Token has expired' }), 401
    except Exception:
      return jsonify({ 'message': 'Unauthorized' }), 401

    return fun(*args, **kwargs)

  return wrapper