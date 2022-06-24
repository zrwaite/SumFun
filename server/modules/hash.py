import bcrypt


def hash_password(password) -> str:
    return bcrypt.hashpw(password, bcrypt.gensalt())


def check_password(password, hash) -> bool:
    return bcrypt.checkpw(password, hash)
