/**
 * SLK Traders - Main JavaScript
 * Handles shared functionality across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {
    initSiteProtection();
    initMobileMenu();
    initStickyHeader();
    initSmoothScroll();
    initProductFilters();
    initImageProtection();
});

/**
 * Site-wide protection: disables right-click, drag, and save shortcuts on every page
 */
function initSiteProtection() {
    // Block right-click everywhere on the site
    document.addEventListener('contextmenu', e => e.preventDefault());

    // Block image drag on all images across every page
    document.addEventListener('dragstart', e => {
        if (e.target.tagName === 'IMG') e.preventDefault();
    });

    // Block Ctrl+S (save), Ctrl+U (view source), Ctrl+P (print)
    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && ['s', 'u', 'p'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    });

    // Make all images non-draggable
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
    });
}

/**
 * Product image protection: canvas watermarking (products.html only)
 */
function initImageProtection() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    const logo = new Image();
    logo.onload = () => {
        grid.querySelectorAll('.product-img').forEach(img => {
            if (img.complete && img.naturalWidth > 0) {
                renderWatermarkedCanvas(img, logo);
            } else {
                img.addEventListener('load', () => renderWatermarkedCanvas(img, logo), { once: true });
            }
        });
    };
    logo.src = 'images/logo.png';
}

function renderWatermarkedCanvas(img, logo) {
    const wrapper = img.parentElement;
    if (!wrapper) return;

    const canvas = document.createElement('canvas');
    canvas.className = img.className;
    canvas.style.cssText = 'width:100%;height:100%;display:block;';

    const w = wrapper.clientWidth  || img.offsetWidth  || 300;
    const h = wrapper.clientHeight || img.offsetHeight || 300;
    canvas.width  = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d');
    drawCover(ctx, img, 0, 0, w, h);

    const logoSize = Math.round(Math.min(w, h) * 0.38);
    const lx = Math.round((w - logoSize) / 2);
    const ly = Math.round((h - logoSize) / 2);
    ctx.globalAlpha = 0.22;
    ctx.drawImage(logo, lx, ly, logoSize, logoSize);
    ctx.globalAlpha = 1;

    canvas.addEventListener('contextmenu', e => e.preventDefault());
    canvas.setAttribute('draggable', 'false');

    wrapper.replaceChild(canvas, img);
}

// Replicates CSS object-fit:cover for canvas drawImage
function drawCover(ctx, src, x, y, w, h) {
    const iw = src.naturalWidth;
    const ih = src.naturalHeight;
    if (!iw || !ih) { ctx.drawImage(src, x, y, w, h); return; }
    const scale = Math.max(w / iw, h / ih);
    const sw = w / scale;
    const sh = h / scale;
    const sx = (iw - sw) / 2;
    const sy = (ih - sh) / 2;
    ctx.drawImage(src, sx, sy, sw, sh, x, y, w, h);
}

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
        document.body.style.overflow = 'hidden';
    });

    if (close) {
        close.addEventListener('click', () => {
            menu.classList.add('translate-x-full');
            document.body.style.overflow = '';
        });
    }

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
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}
