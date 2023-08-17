from django.urls import path
from . import views
urlpatterns = [
    path("", views.home, name="home"),
    path("data", views.getData, name="data"),
    path("delete", views.deleteData, name="delete"),
]   