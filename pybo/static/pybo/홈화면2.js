document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.getElementById("store-carousel");
    const leftArrow = document.querySelector(".left-arrow");
    const rightArrow = document.querySelector(".right-arrow");
    const carouselContainer = document.querySelector(".carousel-container");
    const popup = document.getElementById("store-popup");
    const popupImage = document.getElementById("popup-store-image");
    const popupName = document.getElementById("popup-store-name");
    const popupMenuTable = document.getElementById("popup-menu-table");
    const closePopupButton = document.querySelector(".close-popup");

    let scrollPosition = 0; // 현재 스크롤 위치
    const scrollAmount = 300; // 화살표 클릭 시 이동 거리 (px)

    // CSV 데이터를 파싱 (맨 뒤 공백 제거)
    function parseCSV(csvText) {
        const lines = csvText.trim().split("\n");
        return lines.map(line => {
            const data = line.split(",").map(item => item.trim()).filter(Boolean);
            const menus = [];
            for (let i = 2; i < data.length; i += 2) {
                menus.push({ name: data[i], price: data[i + 1] });
            }
            return {
                name: data[0], // 가게 이름
                image: data[1] || "", // 이미지 파일명 (없으면 빈 문자열)
                menus, // 메뉴 리스트
            };
        });
    }

    // 카드 추가
    function renderStores(stores) {
        stores.forEach(store => {
            const storeCard = document.createElement("a");
            storeCard.className = "store-card";
            storeCard.href = `/store/${store.name}`; // 링크 설정
    
            if (store.image) {
                storeCard.innerHTML = `
                    <div class="store-image">
                        <img src="{% static 'pybo/' %}${store.image}" alt="${store.name}">
                    </div>
                `;
            } else {
                storeCard.innerHTML = `
                    <div class="store-image placeholder">
                        <span>${store.name}</span>
                    </div>
                `;
            }
    
            storeCard.innerHTML += `
                <p class="store-name">${store.name}</p>
            `;
            carousel.appendChild(storeCard);
        });
    }
    

    // 캐러셀 스크롤 이동
    function scrollCarousel(direction) {
        const maxScroll = carousel.scrollWidth - carouselContainer.offsetWidth; // 최대 스크롤 가능 거리
        if (direction === "left") {
            scrollPosition = Math.max(0, scrollPosition - scrollAmount); // 왼쪽으로 이동
        } else if (direction === "right") {
            scrollPosition = Math.min(maxScroll, scrollPosition + scrollAmount); // 오른쪽으로 이동
        }
        carousel.style.transform = `translateX(-${scrollPosition}px)`; // 이동 적용
    }

    // 화살표 클릭 이벤트 리스너
    leftArrow.addEventListener("click", () => scrollCarousel("left"));
    rightArrow.addEventListener("click", () => scrollCarousel("right"));


    // CSV 파일 로드 및 화면에 렌더링
    fetch(csvPath)
        .then(response => {
            if (!response.ok) throw new Error("CSV 파일 로드 실패");
            return response.text();
        })
        .then(parseCSV)
        .then(renderStores)
        .catch(err => console.error("CSV 파일 처리 중 오류 발생:", err));
    

});


