from django.core.exceptions import ValidationError
from django.core.validators import validate_integer

def procent_validator(data):
    validate_integer(data)
    if (data > 100) or (data < 0): raise ValidationError("Неправильное значение процентов")
    return data

def memory_validator(data):
    validate_integer(data)
    if (data > 100): raise ValidationError("Значение больше максимума")