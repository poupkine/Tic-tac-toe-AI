from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('api/v1/game/', views.apiView.as_view())
]
