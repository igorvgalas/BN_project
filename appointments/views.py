from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from appointments.models import Appointment


def index(request):
    appointments = Appointment.objects.all()
    return render(request, 'appointments/index.html', {'appointments': appointments})


def detail(request, appointment_id):
    appointment = get_object_or_404(Appointment, pk=appointment_id)
    return render(request, 'appointments/detail.html', {'appointment': appointment})
