from django.db import models

# Create your models here.
class TodoList(models.Model):
    todo = models.CharField(max_length=200)
    status = models.CharField(max_length=30, default="pending")
    description = models.TextField()
    time = models.TimeField()


    def __str__(self) -> str:
        return self.todo