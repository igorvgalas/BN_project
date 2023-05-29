from time import sleep
from celery import shared_task

@shared_task
def delete_parmission():
    print('Checking for ending permission')
    sleep(10)
    print('Ending permission is checked')


