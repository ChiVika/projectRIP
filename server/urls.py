from django.urls import path
from .views import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('api/proba/', views.proba1_list, name="proba_list"),

]