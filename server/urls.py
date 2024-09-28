from django.urls import path
from .views.views import PostsViews, PostViewsId, PostDatas
from django.urls import include
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register('', PostDatas)

urlpatterns = [
    path("api/", PostsViews.as_view(), name="API"),
    path("api/<int:ids>/", PostViewsId.as_view(), name="detail_API"),
    path("api/blog/", include(router.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)