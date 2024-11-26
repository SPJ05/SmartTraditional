// CSV 파싱 함수
function parseCSV(csv) {
    const rows = csv.trim().split("\n");
    let products = []; // 전체 상품 배열

    rows.forEach(row => {
        const values = row.split(",");
        const storeName = values[0]; // 상호명 (첫 번째 열)

        // 상품명과 가격이 번갈아가며 나오는 구조
        for (let i = 1; i < values.length; i += 2) {
            let product = {
                상호명: storeName,
                상품명: values[i],       // 상품명
                가격: values[i + 1]      // 가격
            };
            products.push(product);
        }
    });

    return products;
}

// CSV 데이터 로드 및 화면 표시 함수
async function loadAndDisplayProducts() {
    try {
        const response = await fetch(staticFileURL); // Django에서 제공하는 정적 파일 경로 사용
        if (!response.ok) throw new Error("CSV 파일을 불러올 수 없습니다.");

        const csvText = await response.text();
        const products = parseCSV(csvText);

        const productList = document.getElementById('product-list');

        // HTML 요소 생성 및 추가
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <div class="product-image">사진</div>
                <button class="cart-button">장바구니</button>
                <div class="product-info">
                    <p><strong>상호명:</strong> ${product['상호명']}</p>
                    <p><strong>상품명:</strong> ${product['상품명']}</p>
                    <p><strong>가격:</strong> ${product['가격']}원</p>
                </div>
            `;

            productList.appendChild(productCard);
        });
    } catch (error) {
        console.error("CSV 파일을 불러오거나 파싱하는 중 오류가 발생했습니다:", error);
    }
}

// 페이지 로드 시 CSV 데이터 로드 및 화면 표시 함수 호출
window.addEventListener('DOMContentLoaded', loadAndDisplayProducts);
