from django.shortcuts import render, redirect
from .forms import UserResponseForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from orders.models import Order_client
from BN.serializers import OrderSerializer
from django.http import JsonResponse


def home(request):
    return render(request, 'main.html')


def contacts(request):
    return render(request, 'contacts.html')


def add_response(request):
    if request.method == 'POST':
        form = UserResponseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserResponseForm()
    return render(request, 'response.html', {'form': form, 'title': 'Новий відгук'})


@api_view(['GET', 'POST'])
def order_list(request, format=None):
    if request.method == 'GET':
        orders = Order_client.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'PUT', 'DELETE'])
def order_detail(request, id, format=None):
    try:
        order = Order_client.objects.get(pk=id)
    except Order_client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = OrderSerializer(order)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = OrderSerializer(order, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        order.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
