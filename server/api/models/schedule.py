from database import db


class Schedule(db.Model):
    __tablename__ = 'schedule'
    id = db.Column(db.Integer, primary_key=True)
    monday_start: db.Column(db.Integer, nullable=False)
    monday_end: db.Column(db.Integer, nullable=False)
    tuesday_start: db.Column(db.Integer, nullable=False)
    tuesday_end: db.Column(db.Integer, nullable=False)
    wednesday_start: db.Column(db.Integer, nullable=False)
    wednesday_end: db.Column(db.Integer, nullable=False)
    thursday_start: db.Column(db.Integer, nullable=False)
    thursday_end: db.Column(db.Integer, nullable=False)
    friday_start: db.Column(db.Integer, nullable=False)
    friday_end: db.Column(db.Integer, nullable=False)
    saturday_start: db.Column(db.Integer, nullable=False)
    saturday_end: db.Column(db.Integer, nullable=False)
    sunday_start: db.Column(db.Integer, nullable=False)
    sunday_end: db.Column(db.Integer, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "monday_start": self.monday_start,
            "monday_end": self.monday_end,
            "tuesday_start": self.tuesday_start,
            "tuesday_end": self.tuesday_end,
            "wednesday_start": self.wednesday_start,
            "wednesday_end": self.wednesday_end,
            "thursday_start": self.thursday_start,
            "thursday_end": self.thursday_end,
            "friday_start": self.friday_start,
            "friday_end": self.friday_end,
            "saturday_start": self.saturday_start,
            "saturday_end": self.saturday_end,
            "sunday_start": self.sunday_start,
            "sunday_end": self.sunday_end
        }
