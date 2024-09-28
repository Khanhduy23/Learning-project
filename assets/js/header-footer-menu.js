document.addEventListener('DOMContentLoaded', function() {
    let baseUrl = '';

    if (window.location.pathname.includes('/project-css/') ||
        window.location.pathname.includes('/project-html/')) {
        baseUrl = '../';
    }

    fetch(`${baseUrl}header.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('header').innerHTML = data;

            const links = document.querySelectorAll('header a');
            links.forEach(link => {
                link.href = baseUrl + link.getAttribute('href');
            });

            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', function() {
                    navMenu.classList.toggle('active');
                });

                // Đóng menu khi nhấn bên ngoài
                document.addEventListener('click', function(event) {
                    if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                        navMenu.classList.remove('active');
                    }
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            alert('Could not load header. Please try again later.');
        });

    fetch(`${baseUrl}footer.html`)
        .then(response => response.text())
        .then(data => {
            document.querySelector('footer').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
            alert('Could not load footer. Please try again later.');
        });
});
