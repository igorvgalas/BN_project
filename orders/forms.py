from django import forms
from .models import *
from bootstrap_datepicker_plus.widgets import DatePickerInput, TimePickerInput


class UserOrder(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['service_name'].empty_label = 'Оберіть послугу'
        self.fields['master'].empty_label = 'Оберіть майстра'
        self.fields['appointment_date'].label = 'Оберіть дату'
        self.fields['appointment_time'].label = 'Оберіть час'
        self.fields['service_name'].label = 'Оберіть послугу'
        self.fields['client_name'].label = 'Імʼя'
        self.fields['phone_number'].label = 'Номер телефону'
        self.fields['master'].label = 'Майстер'

    class Meta:
        model = Order_client
        fields = ['appointment_date', 'appointment_time',
                  'service_name', 'client_name', 'phone_number', 'master']
        widgets = {
            'appointment_date': DatePickerInput(),
            'appointment_time': TimePickerInput()
        }
