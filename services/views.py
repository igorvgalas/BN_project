from django.shortcuts import render, get_object_or_404
from .models import Service


def index(request):
    services = Service.objects.all()
    return render(request, 'services/index.html', {'services': services})


def detail(request, service_id):
    service = get_object_or_404(Service, pk=service_id)
    return render(request, 'services/detail.html', {'service': service})
