from django.core.exceptions import ValidationError
from datetime import timezone


def validate_date(date):
    if date < timezone.now().date():
        raise ValidationError("Cannot book an appointment in the past.")
    
def validate_time_slot(date, staff, time_slot):
    availability = [('10:00', '10:00'), ('11:30', '11:30'), ('13:00', '13:00'), 
                 ('14:30', '14:30'), ('16:00', '16:00'), ('17:30', '17:30')]
    booked_slots = availability.bookings.values_list('time_slot', flat=True)
    if time_slot in booked_slots:
        raise ValidationError(f"{staff} is not available at {time_slot} on {date}. Please select another time slot.")

def validate_file_size(file): 
    max_size_kb = 500
    if file.size > max_size_kb * 1024:
        raise ValidationError(f'File can not be larger then {max_size_kb} KB')