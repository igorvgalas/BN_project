from django.dispatch import receiver
from BNstudio.signals import appointment_created

@receiver(appointment_created)
def on_appointment_created(sender, **kwargs):
  print(kwargs['appointment'])