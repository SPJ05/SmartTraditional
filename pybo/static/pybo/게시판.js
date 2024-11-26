document.addEventListener('DOMContentLoaded', () => {
    const boardList = document.getElementById('board-list');

    // 게시물 데이터
    const posts = [
        {
            title: "시장 이벤트 안내",
            likes: 24,
            comments: 10,
            author: "익명",
            date: "2023-11-01"
        },
        {
            title: "가을 맞이 할인 행사",
            likes: 30,
            comments: 15,
            author: "익명",
            date: "2023-11-02"
        },
        {
            title: "홍시가 매우 맛있네요",
            likes: 240,
            comments: 10,
            author: "익명",
            date: "2023-11-03"
        },
        {
            title: "아 저녁 뭐 먹지?",
            likes: 5,
            comments: 2,
            author: "익명",
            date: "2023-11-04"
        },
        {
            title: "역시 대상혁 ㄷㄷ",
            likes: 100,
            comments: 50,
            author: "익명",
            date: "2023-11-05"
        }
    ];

    // 게시물 추가
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>좋아요: ${post.likes}  댓글: ${post.comments}</p>
            <span>작성자: ${post.author} | ${post.date}</span>
        `;
        boardList.appendChild(postElement);
    });
});
