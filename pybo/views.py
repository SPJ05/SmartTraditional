from django.shortcuts import render, redirect
from django.conf import settings
from .utils import read_market_data
import csv
import os
import re
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required


def market_view(request):
    file_path = 'pybo/static/효자시장.csv'
    stores = read_market_data(file_path)

    context = {
        'stores': stores
    }
    return render(request, 'pybo/market.html', context)

def index(request):
    return render(request, 'pybo/홈화면.html')

# 회원가입 화면 뷰
def signup_view(request):
    """회원가입 뷰"""
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()  # 사용자 생성
            login(request, user)  # 자동 로그인
            messages.success(request, f"회원가입이 완료되었습니다! 환영합니다, {user.username}님!")
            return redirect('pybo:home')  # 홈화면으로 리다이렉트
    else:
        form = UserCreationForm()
    return render(request, 'pybo/signup.html', {'form': form})

@login_required
def my_page(request):
    """사용자 마이페이지"""
    return render(request, 'pybo/my_page.html', {'user': request.user})

# 로그인 화면 뷰
def login_view(request):
    return render(request, 'pybo/signup.html', {'form': form})

# 제철 상품 화면 뷰
def seasonal_view(request):
    return render(request, 'pybo/홈화면_제철상품.html')

# 시장 화면 뷰
def market_view(request):
    return render(request, 'pybo/시장.html')

# 놀거리 화면 뷰
def fun_view(request):
    return render(request, 'pybo/홈화면_놀거리.html')

# 게시판 화면 뷰
def board_view(request):
    return render(request, 'pybo/게시판.html')

# 글 작성 페이지를 렌더링합니다.
def post_create(request):
    return render(request, 'pybo/post_create.html')

def parse_csv():
    csv_path = os.path.join(settings.BASE_DIR, 'pybo', 'static', 'pybo', 'products.csv')
    stores = []
    try:
        with open(csv_path, newline='', encoding='utf-8') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if not row or len(row) < 2:
                    continue
                name = row[0].strip()
                image = row[1].strip() if len(row) > 1 else ""
                menus = [
                    {"name": row[i].strip(), "price": row[i + 1].strip()}
                    for i in range(2, len(row), 2)
                    if i + 1 < len(row) and row[i] and row[i + 1]
                ]
                # store_id 생성 (URL-safe 변환)
                store_id = re.sub(r'\W+', '-', name.lower())  # 비문자 제거 및 소문자로 변환
                stores.append({"id": store_id, "name": name, "image": image, "menus": menus})
    except FileNotFoundError:
        print(f"CSV 파일을 찾을 수 없습니다: {csv_path}")
    return stores




def store_detail(request, store_id):
    """특정 상점의 상세 정보를 반환."""
    stores = parse_csv()
    store = next((s for s in stores if s["id"] == store_id), None)
    if not store:
        return render(request, 'pybo/404.html', status=404)
    return render(request, 'pybo/store_detail.html', {"store": store})



def menu_detail(request, store_id, menu_name):
    """특정 상점의 특정 메뉴 상세 정보를 반환."""
    stores = parse_csv()
    store = next((s for s in stores if s["id"] == store_id), None)
    if not store:
        return render(request, 'pybo/404.html', status=404)

    menu = next((m for m in store["menus"] if m["name"] == menu_name), None)
    if not menu:
        return render(request, 'pybo/404.html', status=404)

    return render(request, 'pybo/menu_detail.html', {"store": store, "menu": menu})

