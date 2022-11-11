from django import forms
from .models import *
from services.models import Service


class UserOrder(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service_name'].empty_label = 'Оберіть послугу'

    class Meta:
        model = Order_client
        fields = ['appointment_date', 'appointment_time',
                  'service_name', 'client_name', 'phone_number']
        widgets = {
            'appointment_date': forms.SelectDateWidget(
                empty_label=("Рік", "Місяць", "День"),
            ),
            'appointment_time': forms.TimeInput(format='%H:%M', attrs={'type': 'time'})
        }
