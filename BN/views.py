from django.shortcuts import render, redirect
from .forms import UserResponseForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
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


