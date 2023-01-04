#from django.shortcuts import render, get_object_or_404
from .models import Service
from django.views.generic import ListView, DetailView


class ServiceIndex(ListView):
    model = Service
    template_name = 'services/index.html'
    context_object_name = 'services'

    def get_queryset(self):
        return Service.objects.all()


class ServiceManicure(ListView):
    model = Service
    template_name = 'services/index.html'
    context_object_name = 'services'

    def get_queryset(self):
        return Service.objects.filter(service_category=1)


class ServicePedicure(ListView):
    model = Service
    template_name = 'services/index.html'
    context_object_name = 'services'

    def get_queryset(self):
        return Service.objects.filter(service_category=2)


class ServiceAddNails(ListView):
    model = Service
    template_name = 'services/index.html'
    context_object_name = 'services'

    def get_queryset(self):
        return Service.objects.filter(service_category=3)


class ServiceEyes(ListView):
    model = Service
    template_name = 'services/index.html'
    context_object_name = 'services'

    def get_queryset(self):
        return Service.objects.filter(service_category=4)


class ServiceDetail(DetailView):
    model = Service
    template_name = 'services/detail.html'
    context_object_name = 'service'
    pk_url_kwarg = 'service_id'


# def index(request):
 #   services = Service.objects.all()
  #  return render(request, 'services/index.html', {'services': services})


# def detail(request, service_id):
   # service = get_object_or_404(Service, pk=service_id)
    # return render(request, 'services/detail.html', {'service': service})
