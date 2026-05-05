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

    const w = wrapper.clientWidth || img.offsetWidth || 300;
    const h = wrapper.clientHeight || img.offsetHeight || 300;
    canvas.width = w;
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



const categoryData = {
    'paper-mill': {
        title: 'Paper Mill Products',
        description: 'We specialize in manufacturing high-performance components and machinery solutions for the paper mill industry, offering precision casting, fabrication, and machining services tailored to industrial requirements. Our products are engineered for critical applications including pulping, agitation systems, dispersion systems, refining, cleaning, thickening, reject handling, deinking, screening, deflakers, molded fiber processing, and paper machine operations.',
        details: 'Our extensive product range includes refiner plates, paper machine dryers, brackets, housings, screw conveyors, tanks, pressure vessels, rotors, shafts, shaft sleeves, agitator blades, screen plates, impellers, and other essential mill spares. We also manufacture fully customized components based on customer drawings and specifications, ensuring reliable performance, durability, and operational efficiency for modern paper processing plants.',
        majorProducts: [
            'Refiner Plates & Fillings',
            'Paper Machine Dryers',
            'Brackets & Housings',
            'Screw Conveyors',
            'Tanks & Pressure Vessels',
            'Rotors & Shafts',
            'Shaft Sleeves',
            'Agitator Blades',
            'Screen Plates & Impellers',
            'Custom-Engineered Components'
        ],
        extra: {
            title: 'Custom Engineering Solutions',
            content: 'We provide tailor-made manufacturing solutions according to client drawings, technical specifications, and operational requirements. Our engineering team also supports custom product design and development for specialized industrial applications.'
        }
    },
    'power-plant': {
        title: 'Power Plant Spares',
        description: 'We specialize in manufacturing and supplying high-quality mechanical components and critical spares for power plants, supporting efficient operation, maintenance, and plant reliability. Our expertise covers a wide range of O&M spares, boiler spares, and overhauling components designed for thermal and industrial power generation systems.',
        details: 'Our product portfolio includes precision-engineered power plant spares, ESP (Electrostatic Precipitator) components, dust collector parts, and essential boiler components manufactured to meet demanding industrial standards. Built for durability, high performance, and operational efficiency, our solutions help reduce downtime and enhance plant productivity across various power generation applications.',
        majorProducts: [
            'Power Plant Spares',
            'ESP Spares & Components',
            'Dust Collector Parts',
            'Boiler Components',
            'O&M Maintenance Spares',
            'Overhauling Spares',
            'Industrial Mechanical Components'
        ],
        extra: {
            title: 'Customized Manufacturing Solutions',
            content: 'We provide customized fabrication and machining solutions based on client drawings, technical specifications, and plant requirements. Our team ensures precision manufacturing, reliable performance, and timely delivery for critical power plant operations.'
        }
    },
    'tea-industry': {
        title: 'Tea Industry Products',
        description: 'We manufacture and supply durable engineering products and industrial spares for the tea processing industry, delivering reliable solutions for tea factories and processing plants. Our expertise includes precision casting, fabrication, and customized manufacturing for a wide range of tea machinery applications.',
        details: 'Our product range includes C.I. Stove Tubes, C.I. Economiser Tubes, aerial flow fans, gas burners, storage bins, segments, fabricated tanks, ghoogies, feed hoppers, and various other process equipment designed for efficient tea production and handling. All products are engineered for long-lasting performance, operational efficiency, and demanding industrial environments.',
        majorProducts: [
            'C.I. Stove Tubes',
            'C.I. Economiser Tubes',
            'Aerial Flow Fans',
            'Gas Burners',
            'Storage Bins',
            'Segments & Fabricated Tanks',
            'Ghoogies & Feed Hoppers',
            'Tea Processing Machinery Spares',
            'Custom Fabricated Components'
        ],
        extra: {
            title: 'Custom Manufacturing Solutions',
            content: 'We provide tailor-made products based on customer drawings, specifications, and operational requirements. Our team also develops custom-engineered solutions to meet specialized needs within the tea processing industry.'
        }
    },
    'pipeline': {
        title: 'Pipeline & Fittings',
        description: 'We manufacture and supply high-quality Cast Iron (CI) piping systems and industrial fittings designed for water supply, sewage treatment, chemical processing, and heavy-duty industrial applications. Our products are engineered to meet industry standards, ensuring strength, durability, leak-proof performance, and long service life in demanding operating environments.',
        details: 'Our range includes Cast Iron Double Flange Pipes manufactured as per IS 7181 standards, available in sizes ranging from 80 mm to 600 mm diameters with welded flanges for secure installation and efficient flow management. We also provide Cast Iron Flanged Puddle Pipes with flanged or plain (spigot) ends, specially designed for concrete and wall penetration applications.',
        moreInfo: 'In addition, we manufacture a complete range of CI pipe fittings as per IS 1538 standards, including concentric reducers, MJ collars, tees, Y-tees, hydrant tees, socketed bends, crosses, joints, duckfoot bends, and custom pipeline fittings. Supported by a dedicated machining and finishing facility with skilled personnel, we ensure precision manufacturing and superior product quality.',
        majorProducts: [
            'Cast Iron Double Flange Pipes',
            'Cast Iron Flanged Puddle Pipes',
            'Concentric Reducers',
            'MJ Collars',
            'Source Tees & Y-Tees',
            'Hydrant Tees',
            'Socketed Bends',
            'Crosses & Joints',
            'Duckfoot Bends',
            'Custom CI Pipe Fittings'
        ],
        specs: {
            title: 'Size Range',
            items: [
                'Pipes: 80 mm to 600 mm Diameter',
                'Fittings: 80 mm to 1200 mm Diameter'
            ]
        },
        extra: {
            title: 'Manufacturing Excellence',
            content: 'Our dedicated machine shop and finishing facility are equipped with advanced machinery and experienced personnel to deliver precision-engineered pipes and fittings that meet both standard and customized industrial requirements.'
        }
    },
    'general-castings': {
        title: 'General Castings, Fabrication & Machined Products',
        description: 'We specialize in manufacturing high-quality ferrous and non-ferrous castings, precision machined components, and industrial fabrication products tailored to customer drawings and technical specifications. With advanced manufacturing facilities and skilled engineering expertise, we deliver reliable solutions for a wide range of industrial applications.',
        details: 'Our capabilities include the production of ferrous castings such as Cast Iron (C.I.), Carbon Steel (C.S.), and Stainless Steel (S.S.), along with non-ferrous castings including Bronze, Gunmetal, and Brass components. We provide both rough and fully machined castings designed to meet strict dimensional accuracy and quality standards.',
        moreInfo: 'In addition, we offer M.S. and S.S. fabrication services for custom industrial structures, equipment, and engineered products manufactured according to client requirements and industry standards.',
        majorProducts: [
            'Cast Iron (C.I.) Castings',
            'Carbon Steel (C.S.) Castings',
            'Stainless Steel (S.S.) Castings',
            'Bronze Castings',
            'Gunmetal Components',
            'Brass Castings',
            'Precision Machined Products',
            'M.S. Fabrication',
            'S.S. Fabrication',
            'Custom Industrial Components'
        ]
    },
    'boiler-spares': {
        title: 'ABL & IJT Boiler Spares',
        description: 'We manufacture specialized ABL and IJT boiler spares designed for superior performance, durability, and dimensional accuracy. Our dedicated and highly trained manufacturing team ensures every component meets strict quality standards for reliable operation in demanding industrial boiler systems.',
        details: 'SLK provides precision-engineered boiler spares with enhanced product life cycles, supporting efficient plant operation, maintenance, and reduced downtime for industrial applications.',
        majorProducts: [
            'Boiler Components & Assemblies',
            'Specialized Industrial Boiler Spares',
            'Precision Machined Boiler Parts',
            'Custom Boiler Fabrication Components',
            'Maintenance & Replacement Spares'
        ],
        extra: {
            title: 'Quality & Engineering Excellence',
            content: 'Our manufacturing process focuses on quality assurance, precision machining, and durable engineering solutions to deliver high-performance products that meet customer specifications and industrial requirements.'
        }
    },
    'manhole': {
        title: 'Manhole Covers & Frames',
        description: 'We manufacture high-quality Cast Iron Manhole Covers, Frames, Surface Boxes, Footsteps, and Gratings designed for reliable performance in municipal, industrial, drainage, and infrastructure applications. Our products are engineered to provide high load-bearing strength, durability, corrosion resistance, and long service life under demanding operating conditions.',
        details: 'Available in various sizes and load classes, our manhole covers and related products are suitable for roads, sewer systems, water supply networks, industrial facilities, and urban infrastructure projects. Manufactured with precision and strict quality control, our products ensure safety, stability, and dependable performance.',
        majorProducts: [
            'Cast Iron Manhole Covers',
            'Manhole Frames',
            'Surface Boxes',
            'Footsteps',
            'Drainage Gratings',
            'Heavy Duty Covers',
            'Customized CI Cast Products'
        ],
        specs: {
            title: 'Features',
            items: [
                'High Strength & Durability',
                'Corrosion Resistant Finish',
                'Available in Multiple Sizes & Classes',
                'Suitable for Municipal & Industrial Use',
                'Precision Engineered Castings'
            ]
        },
        extra: {
            title: 'Custom Manufacturing Solutions',
            content: 'We provide customized manhole covers and cast iron products as per client drawings, specifications, and project requirements.'
        }
    },
    'agriculture': {
        title: 'Agriculture Castings',
        description: 'We manufacture high-quality castings and engineered components for the agricultural industry, delivering durable and reliable solutions for modern farming and irrigation applications. Our products are designed to withstand rough terrains, heavy-duty usage, and demanding agricultural operating conditions.',
        details: 'Our specialized range includes Cast Iron Agricultural Rings and Wheels used extensively in irrigation equipment, farming machinery, and cultivation systems. Manufactured according to customer drawings and specifications, these components offer excellent strength, dimensional accuracy, and compatibility with flexible manufacturing setups.',
        moreInfo: 'Built for long-lasting performance and efficiency, our agricultural castings support a wide variety of agricultural machinery and field applications.',
        majorProducts: [
            'Cast Iron Agricultural Rings',
            'Agricultural Wheels',
            'Irrigation Equipment Components',
            'Farming Machinery Castings',
            'Custom Agricultural Components',
            'Heavy-Duty CI Castings'
        ],
        specs: {
            title: 'Features',
            items: [
                'High Strength & Durability',
                'Suitable for Rough Terrain Applications',
                'Precision Engineered Castings',
                'Compatible with Modern Farming Equipment',
                'Manufactured as per Customer Drawings & Designs'
            ]
        },
        extra: {
            title: 'Custom Manufacturing Solutions',
            content: 'We provide tailor-made agricultural castings and components based on client specifications, ensuring reliable performance and application-specific engineering for agricultural and irrigation industries.'
        }
    },
    'custom': {
        title: 'Custom Manufacturing',
        description: 'We specialize in providing end-to-end manufacturing solutions tailored to your specific engineering requirements. Whether it\'s a complex casting, a precision-machined component, or a large-scale industrial fabrication, our team has the expertise to deliver as per your exact drawings.',
        details: 'Our facility is equipped with advanced foundry and machining infrastructure, allowing us to handle diverse materials including Cast Iron, Carbon Steel, Stainless Steel, and Non-Ferrous alloys. We work closely with our clients from design validation to final quality inspection.',
        majorProducts: [
            'As Per Drawing Manufacturing',
            'Design Support Services',
            'Prototype Development',
            'Specialized Industrial Components',
            'Full In-House Production'
        ]
    }
};

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

    // Dynamic detail elements
    const detailContainer = document.getElementById('category-details');
    const catTitle = document.getElementById('cat-title');
    const catDesc = document.getElementById('cat-desc');
    const catDetails = document.getElementById('cat-details');
    const majorList = document.getElementById('cat-major-list');
    const extraContainer = document.getElementById('cat-extra-container');
    const extraTitle = document.getElementById('cat-extra-title');
    const extraContent = document.getElementById('cat-extra-content');

    // Hero elements
    const pageTitle = document.getElementById('page-title');
    const pageDesc = document.getElementById('page-desc');

    if (!showingEl || !totalEl || !noResults || productItems.length === 0) return;

    let selectedCategory = 'all';
    let searchQuery = '';

    const defaultTitle = "Industrial Components";
    const defaultDesc = "Discover our range of high-performance technical parts designed for extreme durability and precise operational standards.";

    function updateCategoryDetails(catId) {
        if (catId === 'all' || !categoryData[catId]) {
            detailContainer?.classList.add('hidden');
            if (pageTitle) pageTitle.textContent = defaultTitle;
            if (pageDesc) pageDesc.textContent = defaultDesc;
            return;
        }

        const data = categoryData[catId];
        detailContainer?.classList.remove('hidden');

        // Update Hero
        if (pageTitle) pageTitle.textContent = data.title;
        if (pageDesc) pageDesc.textContent = data.description;

        // Update Details Section
        if (catTitle) catTitle.textContent = data.title;
        if (catDesc) catDesc.textContent = data.description;
        if (catDetails) catDetails.textContent = data.details || '';

        // Update Major Products
        if (majorList) {
            majorList.innerHTML = '';
            data.majorProducts.forEach(item => {
                const li = document.createElement('div');
                li.className = 'flex items-center gap-2 text-sm text-gray-600';
                li.innerHTML = `<i class="fa-solid fa-circle-check text-accent text-[10px]"></i> ${item}`;
                majorList.appendChild(li);
            });
        }

        // Update Extra Info
        if (extraContainer) {
            if (data.extra) {
                extraContainer.classList.remove('hidden');
                if (extraTitle) extraTitle.textContent = data.extra.title;
                if (extraContent) extraContent.textContent = data.extra.content;
            } else {
                extraContainer.classList.add('hidden');
            }
        }

        // Scroll to details if mobile
        if (window.innerWidth < 1024) {
            detailContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

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
            updateCategoryDetails(selectedCategory);
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            updateProductDisplay();
        });
    }

    // Handle URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('cat');
    if (catParam) {
        const targetBtn = document.querySelector(`.cat-btn[data-cat="${catParam}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    } else {
        updateProductDisplay();
    }
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
