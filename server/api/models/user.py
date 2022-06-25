from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
    hash = db.Column(db.LargeBinary, nullable=False)
    display_name = db.Column(db.String, nullable=False)
    created_at = db.Column(db.Date, nullable=False)
    show_unverified = db.Column(db.Boolean, nullable=False)
    #do_not_disturb = db.Column(db.dict, nullable=False)
    friend_ids = db.Column(db.ARRAY(db.Integer), nullable=False)
    event_ids = db.Column(db.ARRAY(db.Integer), nullable=False)
    activity_ids = db.Column(db.ARRAY(db.Integer), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "display_name": self.display_name,
            "activity_ids": self.activity_ids,
            "created_at": str(self.created_at.strftime('%d-%m-%Y')),
            "show_unverified": self.show_unverified, 
            #"do_not_disturb": self.do_not_disturb,
            "friend_ids":self.friend_ids,
            "event_ids":self.event_ids,
            "lon": self.lon,
            "lat": self.lat,
        }
    
    def do_not_disturb():
       
        weekday, weekend = [],[]
        weekday_start = input('Start')
        weekday_end = input('End')
        weekday = [weekday_start, weekday_end]
        weekend_start = input('Start')
        weekend_end = input('End')
        weekend = [weekend_start, weekend_end]

        schedule = {'Weekday availability':weekday, 'Weekend availabilty':weekend}

        return schedule

