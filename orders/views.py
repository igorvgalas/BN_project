from django.shortcuts import render, redirect
from .forms import UserOrder


def add_order(request):
    if request.method == 'POST':
        form = UserOrder(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserOrder()
    return render(request, 'order_clients.html', {'form': form, 'title': 'Новий запис'})
