from apscheduler.schedulers.background import BackgroundScheduler

def testPrint():
    print("hi")

scheduler = BackgroundScheduler()

job = scheduler.add_job(testPrint, 'interval', seconds=60, id='print')
scheduler.start()