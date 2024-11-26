import pandas as pd


def read_market_data(file_path):
    try:
        # CSV 파일 읽기
        data = pd.read_csv(file_path, header=None)

        # 점포별 데이터를 저장할 리스트
        stores = []

        # 각 줄을 순회하며 점포 데이터 파싱
        for _, row in data.iterrows():
            store_name = row[0]  # 첫 번째 항목은 점포 이름
            menu_items = []

            # 메뉴와 가격이 교차하는 데이터 처리
            for i in range(1, len(row), 2):
                if pd.notna(row[i]) and (i + 1) < len(row) and pd.notna(row[i + 1]):
                    menu = row[i]
                    price = row[i + 1]
                    menu_items.append({'menu': menu, 'price': price})

            # 점포 데이터 추가
            stores.append({
                'store_name': store_name,
                'menu_items': menu_items
            })

        return stores
    except FileNotFoundError:
        print(f"파일을 찾을 수 없습니다: {file_path}")
        return []
    except Exception as e:
        print(f"예기치 않은 오류가 발생했습니다: {e}")
        return []