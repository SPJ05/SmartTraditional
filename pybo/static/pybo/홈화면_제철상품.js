document.addEventListener('DOMContentLoaded', function () {
    // JSON 파일 경로 설정
    const jsonFilePath = staticFilePath; // HTML에서 전달받는 경로

    // JSON 데이터 로드
    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) throw new Error("JSON 파일을 불러올 수 없습니다.");
            return response.json();
        })
        .then(products => {
            const productList = document.getElementById('product-list');

            // 상품 데이터를 동적으로 추가
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';

                // 이미지 엘리먼트를 생성
                const imgElement = document.createElement('img');
                imgElement.src = `${staticImagePath}${product.image}`;
                imgElement.alt = product.name;
                imgElement.style = "width: 100%; height: 100%; object-fit: cover; border-radius: 10px;";
                
                // 이미지 로드 실패 시 "사진" 표시
                imgElement.onerror = function () {
                    this.style.display = 'none'; // 이미지 숨김
                    const placeholder = document.createElement('div');
                    placeholder.textContent = "사진";
                    placeholder.style = "width: 100%; height: 100%; display: flex; justify-content: center; align-items: center; background-color: #ccc; border-radius: 10px;";
                    this.parentElement.appendChild(placeholder);
                };

                productCard.innerHTML = `
                    <div class="product-image"></div>
                    <button class="cart-button">장바구니</button>
                    <div class="product-info">
                        <p class="product-name">${product.name}</p>
                        <p class="product-price">${product.price}</p>
                        <p class="comment-icon">💬</p>
                    </div>
                `;
                
                // 이미지 엘리먼트를 "product-image" 컨테이너에 추가
                const productImageContainer = productCard.querySelector('.product-image');
                productImageContainer.appendChild(imgElement);

                productList.appendChild(productCard);
            });
        })
        .catch(error => console.error("JSON 로드 오류:", error));
});
