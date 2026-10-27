from django.contrib import admin
from django.urls import include, path

admin.site.site_header = 'The Right Molecule'
admin.site.site_title = 'The Right Molecule admin'
admin.site.index_title = 'Store'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('store.urls')),
]
