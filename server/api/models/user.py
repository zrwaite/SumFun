from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    hash = db.Column(db.LargeBinary, nullable=False)
    display_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    activity_ids = db.Column(db.ARRAY(db.Integer), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "display_name": self.display_name,
            "activity_ids": self.activity_ids,
            "created_at": str(self.created_at.strftime('%d-%m-%Y'))
        }
