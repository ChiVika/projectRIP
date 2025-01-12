from django.urls import path
from .views.views import PostsViews, PostViewsId, PostDatas, PostViewsAllUser
from django.urls import include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from .views.auth import *

router = DefaultRouter()
router.register('', PostDatas)

urlpatterns = [
    path("api/", PostsViews.as_view(), name="API"),
    path("api/<int:ids>/", PostViewsId.as_view(), name="detail_API"),
    path("api/blog/", include(router.urls)),
    path("api/posts/user/", PostViewsAllUser.as_view(), name="user_post"),
    path("api/register/", Register.as_view(), name='register'),
    path("api/login/", LoginView.as_view(), name='login'),
    path('api/user/', UserView.as_view(), name='user'),
    path('api/logout/', LogoutView.as_view(), name='logout')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)