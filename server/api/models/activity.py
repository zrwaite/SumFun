from database import db


class Activity(db.Model):
    __tablename__ = 'activities'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    ideal_temp = db.Column(db.Integer, nullable=False)
    ideal_wind = db.Column(db.Integer, nullable=False)
    ideal_uvi = db.Column(db.Integer, nullable=False)
    ideal_visibility = db.Column(db.Integer, nullable=False)
    ideal_pop = db.Column(db.Integer, nullable=False)
    rain = db.Column(db.String, nullable=False)
    verified = db.Column(db.Boolean, nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ideal_temp": self.ideal_temp,
            "ideal_wind": self.ideal_wind,
            "ideal_uvi": self.ideal_uvi,
            "ideal_visibility": self.ideal_visibility,
            "ideal_pop": self.ideal_pop,
            "rain": self.rain,
            "verified": self.verified,
            "public": self.public,
            "created_at": str(self.created_at.strftime('%d-%m-%Y'))
        }
