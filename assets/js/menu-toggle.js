const menuToggle = document.querySelector('.header__menu-toggle');
const nav = document.querySelector('.header__nav');

// Hàm chuyển đổi trang thái của menu
function toggleMenu() {
    nav.classList.toggle('header__nav--active');
    const isActive = nav.classList.contains('header__nav--active');
    menuToggle.setAttribute('aria-expanded',isActive);
}
// Sự kiện click cho menu Toggle
menuToggle.addEventListener('click', (event) => {
    event.stopPropagation(); // Ngăn chặn sự kiện click từ việc truyền lên document
    toggleMenu();
});
// Sự kiện click toàn bộ document
document.addEventListener('click', (event) => {
    // Kiểm tra nếu nhấp nằm ngoài menu
    if (!nav.contains(event.target) && !menuToggle.contains(event.target)) {
        // Nếu người dùng nhấp ra ngoài thì sẽ là false nhưng ! sẽ là true và sẽ thực hiện điều kiện ở dưới gọi hàm và đóng menu
        if(nav.classList.contains('header__nav--active')){
            toggleMenu();
        }
    }
});