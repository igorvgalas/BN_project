from django import forms


class UserResponseForm(forms.Form):
    your_name = forms.CharField(
        max_length=50, widget=forms.TextInput(), label='Ваше імʼя')
    your_email = forms.CharField(widget=forms.EmailInput(), label='Ваш email')
    your_response = forms.CharField(
        max_length=200, widget=forms.Textarea(), label='Ваш відгук')

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
