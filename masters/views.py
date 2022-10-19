from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from .models import Master


def master_index(request):
    masters = Master.objects.all()
    return render(request, 'masters/index.html', {'masters': masters})


def master_detail(request, master_id):
    master = get_object_or_404(Master, pk=master_id)
    return render(request, 'masters/detail.html', {'master': master})
