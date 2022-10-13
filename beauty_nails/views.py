from django.http import HttpResponse
from django.shortcuts import render
from .models import Service


def index(request):
    service = Service.objects.all()
    output = ', '.join([m.name for m in service])
    return HttpResponse(output)
