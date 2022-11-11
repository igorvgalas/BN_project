from django.shortcuts import render, get_object_or_404, redirect
from .forms import UserOrder


def add_order(request):
    if request.method == 'POST':
        form = UserOrder(request.POST)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = UserOrder()
    return render(request, 'orders/order.html', {'form': form, 'title': 'Новий запис'})
