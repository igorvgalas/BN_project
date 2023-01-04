from django.shortcuts import render, redirect
from .forms import UserResponseForm


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
