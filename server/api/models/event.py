from app import db

class Event(db.Model):
    __tablename__  =  'events'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    date = db.Column(db.String, nullable=False)
    start_time = db.Column(db.String, nullable=False)
    duration = db.Column(db.String, nullable=False)
    location = db.Column(db.String, nullable=False)
    activity_id = db.Column(db.Integer, nullable=False)
    public = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.Date, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date,
            "start_time": self.start_time,
            "duration": self.duration,
            "location": self.location,
            "activity_id": self.activity_id,
            "public": self.public,
            "created at": str(self.created_at.strftime('%d-%m-%Y'))
        }