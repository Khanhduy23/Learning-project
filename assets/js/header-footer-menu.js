document.addEventListener("DOMContentLoaded", function () {
    // Load header
    fetch('/header.html')
    .then(response => response.text())
    .then(data => {
        document.querySelector('header').innerHTML = data;

        // Điều kiện nếu header đã tải xong thì mới gọi menu-toggle
        initializeMenuToggle();
    })
    .catch(error => console.error('Error loading header:', error));

    // Load footer
    fetch('/footer.html')
    .then(response => response.text())
    .then (data => {
        document.querySelector('footer').innerHTML = data;
    })
    .catch(error => console.error('Error loading footer:', error));
});

// Menu toggle
function initializeMenuToggle() {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    if(menuToggle && nav){
        // Hàm chuyển đổi trạng thái của menu
        function toggleMenu() {
            nav.classList.toggle('header__nav--active');
            const isActive = nav.classList.contains('   header__nav--active');
            menuToggle.setAttribute('aria-expanded', isActive);
        }
        // Sự liện click cho menu Toggle
        menuToggle.addEventListener('click', (event) => {
            event.stopPropagation(); // Ngăn chặn sự kiện click từ việc truyền lên document
            toggleMenu();
        });
        // Sự kiện click toàn bộ trang document
        document.addEventListener('click' , (event) => {
            // Kiểm tra nếu mà nhấp ngoài menu
            if(!nav.contains(event.target) && !menuToggle.contains(event.target)){
                if(nav.classList.contains
                    ('header__nav--active')
                ){
                    toggleMenu();
                }
            }
        });
    } else {
        console.error('Menu toggle or navigation not found.');
    }
}