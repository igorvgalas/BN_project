from django.contrib import admin
from .models import Master


@admin.register(Master)
class MasterAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'experience', 'age')
    list_editable = ('experience', 'age')
