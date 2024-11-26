from django.urls import path
from . import views
from django.contrib.auth import views as auth_views
print(auth_views)


app_name = 'pybo'

urlpatterns = [
    path('', views.index, name='home'),  # 홈화면
    path('signup/', views.signup_view, name='signup'),  # 회원가입
    path('login/', auth_views.LoginView.as_view(template_name='pybo/login.html'), name='login'),
    path('seasonal/', views.seasonal_view, name='seasonal'),  # 제철 상품
    path('market/', views.market_view, name='market'),  # 시장
    path('fun/', views.fun_view, name='fun'),  # 놀거리
    path('board/', views.board_view, name='board'),  # 게시판
    path('post/create/', views.post_create, name='post_create'),
    path('store/<str:store_id>/', views.store_detail, name='store_detail'),
    path('store/<str:store_id>/<str:menu_name>/', views.menu_detail, name='menu_detail'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),  # 로그아웃 URL 추가
    path('my_page/', views.my_page, name='my_page'),  # my_page URL 추가
]
