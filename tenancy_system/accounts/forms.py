from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from tenants.models import TenantProfile
from properties.models import Property

# Custom validator
def no_numbers_in_username(value):
    if any(char.isdigit() for char in value):
        raise ValidationError("Username cannot contain numbers.")

# Tenant registration form (admin creates tenant accounts)
class TenantRegisterForm(UserCreationForm):
    email = forms.EmailField(required=True)
    lease_expiry = forms.DateField(
        required=True,
        widget=forms.DateInput(attrs={'type': 'date'})
    )
    property_rented = forms.ModelChoiceField(
        queryset=Property.objects.all(),
        required=True
    )
    birthday = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'type': 'date'})
    )

    class Meta:
        model = User
        fields = ("username", "email", "password1", "password2", "first_name", "last_name")

    def clean_username(self):
        username = self.cleaned_data['username']
        no_numbers_in_username(username)
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Email already in use.")
        return email


# Profile update form (tenants can update their details later)
class ProfileUpdateForm(forms.ModelForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'last_name')

    def clean_username(self):
        username = self.cleaned_data['username']
        no_numbers_in_username(username)
        return username

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exclude(pk=self.instance.pk).exists():
            raise forms.ValidationError("Email already in use by another account.")
        return email
