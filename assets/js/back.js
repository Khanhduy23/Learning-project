function updateBackLink() {
    const examplePage = new URLSearchParams(window.location.search).get('examplePage'); // Lấy examplePage từ URL
    const backButton = document.querySelector('.header a'); // Chọn nút Back

    if (examplePage) {
        backButton.href = `../${examplePage}.html`; // Quay lại đúng trang HTML theo examplePage
    } else {
        backButton.href = '../index.html'; // Nếu không có examplePage, quay về trang chính
    }
}

// Gọi hàm này khi trang load
document.addEventListener("DOMContentLoaded", updateBackLink);
