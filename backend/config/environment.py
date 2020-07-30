import os

db_uri = os.getenv("DATABASE_URL", "postgres://localhost:5432/newsdb")
secret = os.getenv("SECRET", "Raquel is the coolest")

