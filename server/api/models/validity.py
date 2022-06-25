from app import db

class Validity(db.Model):
    __tablename__ = 'validities'
    id = db.Column(db.Integer, primary_key=True)
    scores = db.Column(db.ARRAY(db.Float), nullable=False)
    
    def to_dict(self):
        return {
            "id": self.id,
            "scores": self.scores
        }