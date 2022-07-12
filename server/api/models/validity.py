from database import db


class Validity(db.Model):
    __tablename__ = 'validities'
    id = db.Column(db.Integer, primary_key=True)
    activity_id = db.Column(db.Integer)
    event_id = db.Column(db.Integer)
    scores = db.Column(db.ARRAY(db.Float), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "scores": self.scores,
            "activity_id": self.activity_id,
            "event_id": self.activity_id
        }
