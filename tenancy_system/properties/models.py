from django.db import models

class Property(models.Model):
    PROPERTY_TYPES = [
        ('HOUSE', 'House'),
        ('APARTMENT', 'Apartment'),
    ]

    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    property_type = models.CharField(max_length=15, choices=PROPERTY_TYPES)
    unit_number = models.CharField(max_length=10, blank=True, null=True)
    rent_price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    is_available = models.BooleanField(default=True)
    date_added = models.DateField(auto_now_add=True)

    def __str__(self):
        if self.unit_number:
            return f"{self.name} - Unit {self.unit_number}"
        return self.name