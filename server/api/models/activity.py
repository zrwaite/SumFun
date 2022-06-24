from app import db


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    min_temp = db.Column(db.Integer, nullable=False)
    max_temp = db.Column(db.Integer, nullable=False)
    min_wind = db.Column(db.Integer, nullable=False)
    max_wind = db.Column(db.Integer, nullable=False)
    rain = db.Column(db.String, nullable=False)
    verified = db.Column(db.Boolean, nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "min_temp": self.min_temp,
            "max_temp": self.max_temp,
            "min_wind": self.min_wind,
            "max_wind": self.max_wind,
            "rain": self.rain,
            "verified": self.verified,
            "public": self.public,
            "created_at": str(self.created_at.strftime('%d-%m-%Y'))
        }
