from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from .models import Order


def index(request):
    orders = Order.objects.all()
    return render(request, 'orders/index.html', {'orders': orders})


def detail(request, order_id):
    order = get_object_or_404(Order, pk=order_id)
    return render(request, 'orders/detail.html', {'order': order})
