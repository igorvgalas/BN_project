from django.http import HttpResponse, Http404
from django.shortcuts import render, get_object_or_404
from orders.models import Order, OrderWithClientData


def index(request):
    orders = OrderWithClientData.objects.all()
    return render(request, 'orders/index.html', {'orders': orders})


def detail(request, order_id):
    order = get_object_or_404(Order, pk=order_id)
    return render(request, 'orders/detail.html', {'order': order})
