from django.urls import path
from .views.views import PostsViews, PostViewsId

urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    # path('createPost/', views.create_post, name="createPost"),
    # path('api/proba/', views.proba1_list, name="proba_list"),
    path("api/", PostsViews.as_view(), name="API"),
    path("api/<int:ids>/", PostViewsId.as_view(), name="detail_API")


]