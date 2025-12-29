// ===== ShopEasy E-commerce Store =====
// Vanilla JavaScript implementation

(function() {
    'use strict';

    // ===== Initial Products Data =====
    const initialProducts = [
        { id: '1', name: 'Premium Wireless Headphones', price: 150000, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80', description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.', stockStatus: 'in_stock' },
        { id: '2', name: 'Smart Watch Pro', price: 280000, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80', description: 'Advanced smartwatch with health monitoring, GPS, and water resistance.', stockStatus: 'in_stock' },
        { id: '3', name: 'Leather Backpack', price: 95000, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80', description: 'Genuine leather backpack with laptop compartment and premium finish.', stockStatus: 'few_units' },
        { id: '4', name: 'Running Sneakers', price: 120000, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', description: 'Lightweight running shoes with advanced cushioning technology.', stockStatus: 'in_stock' },
        { id: '5', name: 'Bluetooth Speaker', price: 75000, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80', description: 'Portable speaker with deep bass and 20-hour playtime.', stockStatus: 'pending_restock' },
        { id: '6', name: 'Sunglasses Classic', price: 45000, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80', description: 'UV protection sunglasses with polarized lenses and metal frame.', stockStatus: 'in_stock' }
    ];

    // ===== Store State =====
    const store = {
        products: JSON.parse(localStorage.getItem('store_products')) || initialProducts,
        cart: JSON.parse(localStorage.getItem('store_cart')) || [],
        orders: JSON.parse(localStorage.getItem('store_orders')) || [],
        currentOrder: null,
        currentPage: 'home',
        adminFilter: 'all',
        isAdminAuthenticated: false
    };

    // ===== Utility Functions =====
    const formatCurrency = (amount) => new Intl.NumberFormat('en-UG', { style: 'currency', currency: 'UGX', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
    const saveToStorage = () => {
        localStorage.setItem('store_products', JSON.stringify(store.products));
        localStorage.setItem('store_cart', JSON.stringify(store.cart));
        localStorage.setItem('store_orders', JSON.stringify(store.orders));
    };
    const generateOrderReference = () => {
        const prefix = 'ORD';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `${prefix}-${timestamp}-${random}`;
    };
    const getCartTotal = () => store.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const getCartCount = () => store.cart.reduce((sum, item) => sum + item.quantity, 0);

    // ===== Toast Notification =====
    const showToast = (message, type = 'default') => {
        const toast = document.getElementById('toast');
        const toastMessage = document.getElementById('toastMessage');
        toast.className = 'toast ' + type;
        toastMessage.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => toast.classList.add('hidden'), 3000);
    };

    // ===== Cart Functions =====
    const addToCart = (product) => {
        const existing = store.cart.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            store.cart.push({ ...product, quantity: 1 });
        }
        saveToStorage();
        updateCartUI();
        showToast(`${product.name} added to cart!`, 'success');
    };
    const removeFromCart = (productId) => {
        store.cart = store.cart.filter(item => item.id !== productId);
        saveToStorage();
        updateCartUI();
        renderCartPage();
    };
    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) { removeFromCart(productId); return; }
        const item = store.cart.find(item => item.id === productId);
        if (item) { item.quantity = quantity; saveToStorage(); updateCartUI(); renderCartPage(); }
    };
    const updateCartUI = () => {
        const count = getCartCount();
        document.getElementById('cartCount').textContent = count > 99 ? '99+' : count;
        document.getElementById('cartCount').style.display = count > 0 ? 'flex' : 'none';
    };

    // ===== Product Card Renderer =====
    const renderProductCard = (product) => `
        <article class="product-card animate-slide-up">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <button class="quick-add-btn" data-add-to-cart="${product.id}" aria-label="Add ${product.name} to cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
            </div>
            <div class="product-details">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatCurrency(product.price)}</span>
                    <button class="add-to-cart-btn" data-add-to-cart="${product.id}">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"></path></svg>
                        Add
                    </button>
                </div>
            </div>
        </article>`;

    // ===== Page Renderers =====
    const renderFeaturedProducts = () => {
        const featured = store.products.slice(0, 3);
        document.getElementById('featuredProducts').innerHTML = featured.map(renderProductCard).join('');
    };
    const renderAllProducts = () => {
        document.getElementById('allProducts').innerHTML = store.products.map(renderProductCard).join('');
        document.getElementById('productCount').textContent = `Showing ${store.products.length} product${store.products.length !== 1 ? 's' : ''}`;
    };
    const renderCartPage = () => {
        const count = getCartCount();
        const total = getCartTotal();
        document.getElementById('cartItemCount').textContent = `${count} item${count !== 1 ? 's' : ''} in your cart`;
        if (count === 0) {
            document.getElementById('emptyCart').classList.remove('hidden');
            document.getElementById('cartContent').classList.add('hidden');
        } else {
            document.getElementById('emptyCart').classList.add('hidden');
            document.getElementById('cartContent').classList.remove('hidden');
            document.getElementById('cartItems').innerHTML = store.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p class="price">${formatCurrency(item.price)}</p>
                        <div class="quantity-controls">
                            <button class="qty-btn" data-qty-decrease="${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                            <span>${item.quantity}</span>
                            <button class="qty-btn" data-qty-increase="${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <span class="subtotal">${formatCurrency(item.price * item.quantity)}</span>
                        <button class="remove-btn" data-remove-from-cart="${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
                    </div>
                </div>`).join('');
            document.getElementById('summaryItemCount').textContent = count;
            document.getElementById('summarySubtotal').textContent = formatCurrency(total);
            document.getElementById('summaryTotal').textContent = formatCurrency(total);
        }
    };
    const renderCheckoutPage = () => {
        const count = getCartCount();
        if (count === 0 && !store.currentOrder) {
            document.getElementById('emptyCheckout').classList.remove('hidden');
            document.getElementById('checkoutContent').classList.add('hidden');
        } else {
            document.getElementById('emptyCheckout').classList.add('hidden');
            document.getElementById('checkoutContent').classList.remove('hidden');
            const items = store.currentOrder ? store.currentOrder.items : store.cart;
            const total = store.currentOrder ? store.currentOrder.total : getCartTotal();
            document.getElementById('checkoutItems').innerHTML = items.map(item => `
                <div class="order-item">
                    <div class="order-item-image"><img src="${item.image}" alt="${item.name}"></div>
                    <div class="order-item-info"><p>${item.name}</p><span>Qty: ${item.quantity}</span></div>
                    <span class="order-item-price">${formatCurrency(item.price * item.quantity)}</span>
                </div>`).join('');
            document.getElementById('checkoutTotal').textContent = formatCurrency(total);
        }
    };
    const renderAdminPage = () => {
        if (!store.isAdminAuthenticated) {
            document.getElementById('adminLogin').classList.remove('hidden');
            document.getElementById('adminDashboard').classList.add('hidden');
        } else {
            document.getElementById('adminLogin').classList.add('hidden');
            document.getElementById('adminDashboard').classList.remove('hidden');
            renderAdminStats();
            renderOrderHistory();
            renderManagedProducts();
        }
    };
    const renderAdminStats = () => {
        document.getElementById('statProducts').textContent = store.products.length;
        document.getElementById('statOrders').textContent = store.orders.length;
        document.getElementById('statConfirmed').textContent = store.orders.filter(o => o.status === 'confirmed').length;
        document.getElementById('statPending').textContent = store.orders.filter(o => o.status === 'pending').length;
    };
    const renderOrderHistory = () => {
        const sorted = [...store.orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if (sorted.length === 0) {
            document.getElementById('ordersList').innerHTML = `<div class="no-orders"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path></svg><h3>No Orders Yet</h3><p>Customer orders will appear here once they're placed.</p></div>`;
        } else {
            document.getElementById('ordersList').innerHTML = sorted.map(order => `
                <div class="order-card">
                    <div class="order-header">
                        <div><span class="order-ref">${order.reference}</span> <span class="badge ${order.status === 'confirmed' ? 'success' : 'pending'}">${order.status === 'confirmed' ? 'Paid' : 'Pending'}</span><div class="order-date"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>${new Date(order.createdAt).toLocaleString()}</div></div>
                        <div class="order-total-display"><p class="label">Total</p><p class="value">${formatCurrency(order.total)}</p></div>
                    </div>
                    <div class="order-details">
                        <div class="order-detail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><div><p class="label">Customer</p><p class="value">${order.customerName}</p></div></div>
                        <div class="order-detail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path></svg><div><p class="label">Phone</p><p class="value">${order.customerPhone}</p></div></div>
                        <div class="order-detail"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg><div><p class="label">Payment</p><p class="value">${order.paymentMethod.toUpperCase()} Money</p></div></div>
                    </div>
                    <div class="order-items-list"><p class="items-label">Items (${order.items.reduce((s, i) => s + i.quantity, 0)})</p>${order.items.map(item => `<div class="order-line-item"><div class="order-line-item-info"><img src="${item.image}" alt="${item.name}"><span>${item.name}</span><span class="order-line-item-qty">×${item.quantity}</span></div><span>${formatCurrency(item.price * item.quantity)}</span></div>`).join('')}</div>
                </div>`).join('');
        }
    };
    const getStockIcon = (status) => {
        const icons = { in_stock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>', few_units: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>', pending_restock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>', unavailable: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line></svg>' };
        return icons[status] || icons.in_stock;
    };
    const getStockLabel = (status) => ({ in_stock: 'In Stock', few_units: 'Few Units', pending_restock: 'Pending', unavailable: 'Unavailable' }[status] || 'In Stock');
    const renderManagedProducts = () => {
        const filtered = store.adminFilter === 'all' ? store.products : store.products.filter(p => p.stockStatus === store.adminFilter);
        const counts = { all: store.products.length, in_stock: store.products.filter(p => p.stockStatus === 'in_stock').length, few_units: store.products.filter(p => p.stockStatus === 'few_units').length, pending_restock: store.products.filter(p => p.stockStatus === 'pending_restock').length, unavailable: store.products.filter(p => p.stockStatus === 'unavailable').length };
        document.getElementById('countAll').textContent = counts.all;
        document.getElementById('countInStock').textContent = counts.in_stock;
        document.getElementById('countFewUnits').textContent = counts.few_units;
        document.getElementById('countPending').textContent = counts.pending_restock;
        document.getElementById('countUnavailable').textContent = counts.unavailable;
        if (filtered.length === 0) {
            document.getElementById('managedProductsList').innerHTML = `<div class="no-products"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path></svg><p>No products found with this filter</p></div>`;
        } else {
            document.getElementById('managedProductsList').innerHTML = filtered.map(product => `
                <div class="managed-product">
                    <div class="managed-product-image"><img src="${product.image}" alt="${product.name}"></div>
                    <div class="managed-product-info"><h4>${product.name}</h4><p class="price">${formatCurrency(product.price)}</p><span class="stock-badge ${product.stockStatus || 'in_stock'}">${getStockIcon(product.stockStatus || 'in_stock')}${getStockLabel(product.stockStatus || 'in_stock')}</span></div>
                    <select class="status-select" data-update-status="${product.id}"><option value="in_stock" ${product.stockStatus === 'in_stock' ? 'selected' : ''}>In Stock</option><option value="few_units" ${product.stockStatus === 'few_units' ? 'selected' : ''}>Few Units Left</option><option value="pending_restock" ${product.stockStatus === 'pending_restock' ? 'selected' : ''}>Pending Restock</option><option value="unavailable" ${product.stockStatus === 'unavailable' ? 'selected' : ''}>Unavailable</option></select>
                    <button class="delete-btn" data-delete-product="${product.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg></button>
                </div>`).join('');
        }
    };

    // ===== Navigation =====
    const navigateTo = (page) => {
        store.currentPage = page;
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        document.getElementById(`page-${page}`).classList.remove('hidden');
        document.querySelectorAll('.nav-link, .nav-link-mobile').forEach(link => { link.classList.toggle('active', link.dataset.page === page); });
        if (page === 'products') renderAllProducts();
        if (page === 'cart') renderCartPage();
        if (page === 'checkout') { renderCheckoutPage(); resetCheckoutState(); }
        if (page === 'admin') renderAdminPage();
        window.scrollTo(0, 0);
    };
    const resetCheckoutState = () => {
        store.currentOrder = null;
        document.getElementById('checkoutForm').classList.remove('hidden');
        document.getElementById('paymentInstructions').classList.add('hidden');
        document.getElementById('orderConfirmed').classList.add('hidden');
        document.getElementById('checkoutTitle').textContent = 'Checkout';
        document.getElementById('orderSummarySidebar').classList.remove('hidden');
    };

    // ===== Carousel =====
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const goToSlide = (index) => {
        currentSlide = index;
        slides.forEach((s, i) => s.classList.toggle('active', i === index));
        dots.forEach((d, i) => d.classList.toggle('active', i === index));
    };
    document.getElementById('carouselPrev').addEventListener('click', () => goToSlide((currentSlide - 1 + slides.length) % slides.length));
    document.getElementById('carouselNext').addEventListener('click', () => goToSlide((currentSlide + 1) % slides.length));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));
    setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

    // ===== Mobile Menu =====
    document.getElementById('mobileMenuBtn').addEventListener('click', () => {
        const nav = document.getElementById('mobileNav');
        const menuIcon = document.querySelector('.menu-icon');
        const closeIcon = document.querySelector('.close-icon');
        nav.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // ===== Event Delegation =====
    document.addEventListener('click', (e) => {
        // Navigation
        if (e.target.closest('[data-page]')) {
            e.preventDefault();
            navigateTo(e.target.closest('[data-page]').dataset.page);
            document.getElementById('mobileNav').classList.add('hidden');
            document.querySelector('.menu-icon').classList.remove('hidden');
            document.querySelector('.close-icon').classList.add('hidden');
        }
        // Add to cart
        if (e.target.closest('[data-add-to-cart]')) {
            const id = e.target.closest('[data-add-to-cart]').dataset.addToCart;
            const product = store.products.find(p => p.id === id);
            if (product) addToCart(product);
        }
        // Quantity controls
        if (e.target.closest('[data-qty-decrease]')) updateQuantity(e.target.closest('[data-qty-decrease]').dataset.qtyDecrease, store.cart.find(i => i.id === e.target.closest('[data-qty-decrease]').dataset.qtyDecrease).quantity - 1);
        if (e.target.closest('[data-qty-increase]')) updateQuantity(e.target.closest('[data-qty-increase]').dataset.qtyIncrease, store.cart.find(i => i.id === e.target.closest('[data-qty-increase]').dataset.qtyIncrease).quantity + 1);
        if (e.target.closest('[data-remove-from-cart]')) removeFromCart(e.target.closest('[data-remove-from-cart]').dataset.removeFromCart);
        // Admin tabs
        if (e.target.closest('.tab-btn')) {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.tab-btn').classList.add('active');
            document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
            document.getElementById(`tab-${e.target.closest('.tab-btn').dataset.tab}`).classList.remove('hidden');
        }
        // Product filter
        if (e.target.closest('.filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.closest('.filter-btn').classList.add('active');
            store.adminFilter = e.target.closest('.filter-btn').dataset.filter;
            renderManagedProducts();
        }
        // Delete product
        if (e.target.closest('[data-delete-product]')) {
            const id = e.target.closest('[data-delete-product]').dataset.deleteProduct;
            const product = store.products.find(p => p.id === id);
            document.getElementById('deleteProductName').textContent = product.name;
            document.getElementById('deleteModal').classList.remove('hidden');
            document.getElementById('deleteModal').dataset.productId = id;
        }
        // Modal backdrop
        if (e.target.classList.contains('modal-backdrop')) document.getElementById('deleteModal').classList.add('hidden');
        if (e.target.id === 'cancelDelete') document.getElementById('deleteModal').classList.add('hidden');
        if (e.target.id === 'confirmDelete') {
            const id = document.getElementById('deleteModal').dataset.productId;
            store.products = store.products.filter(p => p.id !== id);
            saveToStorage();
            renderManagedProducts();
            renderAdminStats();
            document.getElementById('deleteModal').classList.add('hidden');
            showToast('Product removed', 'success');
        }
        // Copy reference
        if (e.target.closest('#copyReferenceBtn')) {
            navigator.clipboard.writeText(store.currentOrder.reference);
            document.querySelector('.copy-icon').classList.add('hidden');
            document.querySelector('.check-icon').classList.remove('hidden');
            document.querySelector('#copyReferenceBtn span').textContent = 'Copied!';
            setTimeout(() => { document.querySelector('.copy-icon').classList.remove('hidden'); document.querySelector('.check-icon').classList.add('hidden'); document.querySelector('#copyReferenceBtn span').textContent = 'Copy'; }, 2000);
        }
    });

    // Status update
    document.addEventListener('change', (e) => {
        if (e.target.closest('[data-update-status]')) {
            const id = e.target.dataset.updateStatus;
            const product = store.products.find(p => p.id === id);
            if (product) { product.stockStatus = e.target.value; saveToStorage(); renderManagedProducts(); showToast('Status updated', 'success'); }
        }
    });

    // ===== Forms =====
    // Admin login
    document.getElementById('adminLoginForm').addEventListener('submit', (e) => {
        e.preventDefault();
        if (document.getElementById('adminPassword').value === 'admin123') {
            store.isAdminAuthenticated = true;
            renderAdminPage();
            showToast('Welcome Admin!', 'success');
        } else {
            showToast('Incorrect password', 'error');
        }
    });

    // Checkout form
    document.getElementById('checkoutForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('customerName').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const payment = document.querySelector('input[name="paymentMethod"]:checked');
        if (!name) { showToast('Please enter your name', 'error'); return; }
        if (!phone || phone.length < 10) { showToast('Please enter a valid phone number', 'error'); return; }
        if (!payment) { showToast('Please select a payment method', 'error'); return; }
        if (getCartCount() === 0) { showToast('Your cart is empty', 'error'); return; }
        // Create order
        store.currentOrder = { id: Date.now().toString(), reference: generateOrderReference(), customerName: name, customerPhone: phone, paymentMethod: payment.value, items: [...store.cart], total: getCartTotal(), status: 'pending', createdAt: new Date().toISOString() };
        store.orders.push(store.currentOrder);
        saveToStorage();
        // Show payment instructions
        document.getElementById('checkoutForm').classList.add('hidden');
        document.getElementById('paymentInstructions').classList.remove('hidden');
        document.getElementById('checkoutTitle').textContent = 'Complete Payment';
        const paymentNumbers = { mtn: '0770 123 456', airtel: '0750 123 456' };
        document.getElementById('orderReference').textContent = store.currentOrder.reference;
        document.getElementById('paymentAmount').textContent = formatCurrency(store.currentOrder.total);
        document.getElementById('paymentNetworkName').textContent = payment.value === 'mtn' ? 'MTN' : 'Airtel';
        document.getElementById('businessPhone').textContent = paymentNumbers[payment.value];
        document.getElementById('paymentNumberCard').className = `payment-number-card ${payment.value}`;
        document.getElementById('paymentSteps').querySelector('li:first-child').textContent = `Open your ${payment.value === 'mtn' ? 'MTN MoMo' : 'Airtel Money'} app or dial *165#`;
        document.getElementById('stepPhone').textContent = paymentNumbers[payment.value];
        document.getElementById('stepAmount').textContent = formatCurrency(store.currentOrder.total);
        document.getElementById('stepReference').textContent = store.currentOrder.reference;
        document.getElementById('confirmName').value = name;
        document.getElementById('confirmReference').textContent = store.currentOrder.reference;
        document.querySelector(`input[name="confirmNetwork"][value="${payment.value}"]`).checked = true;
    });

    // Payment confirmation
    document.getElementById('confirmationForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('confirmName').value.trim();
        const phone = document.getElementById('confirmPhone').value.trim();
        if (!name) { showToast('Please enter your name', 'error'); return; }
        if (!phone || phone.length < 10) { showToast('Please enter the phone number used to pay', 'error'); return; }
        // Confirm order
        const order = store.orders.find(o => o.reference === store.currentOrder.reference);
        if (order) order.status = 'confirmed';
        store.cart = [];
        saveToStorage();
        updateCartUI();
        // Show confirmation
        document.getElementById('paymentInstructions').classList.add('hidden');
        document.getElementById('orderConfirmed').classList.remove('hidden');
        document.getElementById('orderSummarySidebar').classList.add('hidden');
        document.getElementById('confirmedOrderRef').textContent = store.currentOrder.reference;
        document.getElementById('confirmedTotal').textContent = formatCurrency(store.currentOrder.total);
        showToast('Payment confirmed! Thank you.', 'success');
    });

    // Add product
    document.getElementById('addProductForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value.trim();
        const price = parseFloat(document.getElementById('productPrice').value);
        const image = document.getElementById('productImage').value.trim();
        const description = document.getElementById('productDescription').value.trim();
        const stockStatus = document.getElementById('productStock').value;
        if (!name || !price || !image || !description) { showToast('Please fill in all fields', 'error'); return; }
        store.products.push({ id: Date.now().toString(), name, price, image, description, stockStatus });
        saveToStorage();
        renderManagedProducts();
        renderAdminStats();
        document.getElementById('addProductForm').reset();
        showToast('Product added!', 'success');
    });

    // Image preview
    document.getElementById('productImage').addEventListener('input', (e) => {
        const preview = document.getElementById('imagePreview');
        if (e.target.value) {
            preview.innerHTML = `<img src="${e.target.value}" alt="Preview" onerror="this.style.display='none'">`;
        } else {
            preview.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>`;
        }
    });

    // ===== Initialize =====
    renderFeaturedProducts();
    updateCartUI();
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    document.getElementById('cartCount').style.display = getCartCount() > 0 ? 'flex' : 'none';
})();
