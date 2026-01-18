const nav = document.querySelector('.muc_dieu_huong');
const links = nav.querySelectorAll('a');
const indicator = nav.querySelector('.indicator');

function moveIndicator(link) {
    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    const extraPadding = 16; // mỗi bên 16px → nút dài hơn chữ

    indicator.textContent = link.textContent;
    indicator.style.opacity = '1';
    indicator.style.width = (linkRect.width + extraPadding * 2) + 'px';

    // ép reflow để tránh khựng
    indicator.getBoundingClientRect();

    indicator.style.left =
        (linkRect.left - navRect.left - extraPadding) + 'px';
}

    links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault(); // tránh nhảy trang trước
            moveIndicator(link);

            // scroll mượt
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

/* Scroll */
window.addEventListener('scroll', () => {
    let current = links[0];
    links.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section && section.getBoundingClientRect().top <= 120) {
            current = link;
        }
    });
    moveIndicator(current);
});

    // active mục đầu khi load
    moveIndicator(links[0]);

