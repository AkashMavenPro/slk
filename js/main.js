/**
 * SLK Traders - Main JavaScript
 * Handles shared functionality across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initProductFilters();
});

/**
 * Product filters and search (products.html only)
 */
function initProductFilters() {
    const catBtns = document.querySelectorAll('.cat-btn');
    const productItems = document.querySelectorAll('#product-grid .product-item');
    const showingEl = document.getElementById('showing-count');
    const totalEl = document.getElementById('total-count');
    const noResults = document.getElementById('no-results');
    const searchInput = document.getElementById('product-search');

    if (!showingEl || !totalEl || !noResults || productItems.length === 0) return;

    let selectedCategory = 'all';
    let searchQuery = '';

    function updateProductDisplay() {
        let count = 0;

        productItems.forEach(item => {
            const catMatch = selectedCategory === 'all' || item.dataset.cat === selectedCategory;
            const title = item.querySelector('h3')?.textContent.toLowerCase() || '';
            const desc = item.querySelector('p:nth-of-type(2)')?.textContent.toLowerCase() || '';
            const code = item.querySelector('p:first-of-type')?.textContent.toLowerCase() || '';
            const searchMatch = !searchQuery || title.includes(searchQuery.toLowerCase()) ||
                desc.includes(searchQuery.toLowerCase()) ||
                code.includes(searchQuery.toLowerCase());

            if (catMatch && searchMatch) {
                item.classList.remove('hidden-item');
                count++;
            } else {
                item.classList.add('hidden-item');
            }
        });

        showingEl.textContent = count;
        totalEl.textContent = productItems.length;
        noResults.classList.toggle('hidden', count > 0);
    }

    catBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            catBtns.forEach(b => {
                b.classList.remove('active');
                b.style.backgroundColor = '';
                b.style.color = '';
            });
            btn.classList.add('active');
            selectedCategory = btn.dataset.cat;
            updateProductDisplay();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            updateProductDisplay();
        });
    }

    totalEl.textContent = productItems.length;
    updateProductDisplay();
}

/**
 * Mobile Menu Toggle System
 */
function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const close = document.getElementById('menu-close');
    const menu = document.getElementById('mobile-menu');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        menu.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent scroll
    });

    if (close) {
        close.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

    // Close menu when clicking on a link
    const menuLinks = menu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Sticky Header Effect
 */
function initStickyHeader() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-lg', 'py-2');
            header.classList.remove('py-4');
        } else {
            header.classList.remove('shadow-lg', 'py-2');
            header.classList.add('py-4');
        }
    });
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

