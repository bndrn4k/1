document.addEventListener('DOMContentLoaded', function() {
    // Инициализация каруселей
    initSwipers();
    
    // Работа с корзиной
    setupCart();
    
    // Работа с избранным
    setupFavorites();
    
    // Переключение между разделами
    setupNavigation();
    
    // Обновляем счетчики
    updateCartCount();
    updateFavoritesCount();
});

function initSwipers() {
    // Карусель с 2 изображениями
    const simpleSwipers = document.querySelectorAll('.swiper:not(.swiper-complex)');
    simpleSwipers.forEach(swiperEl => {
        new Swiper(swiperEl, {
            loop: true,
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'),
                clickable: true,
            },
        });
    });

    // Карусель с 4 изображениями (костюм)
    const complexSwipers = document.querySelectorAll('.swiper-complex');
    complexSwipers.forEach(swiperEl => {
        new Swiper(swiperEl, {
            loop: true,
            pagination: {
                el: swiperEl.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: swiperEl.querySelector('.swiper-button-next'),
                prevEl: swiperEl.querySelector('.swiper-button-prev'),
            },
        });
    });
}

function setupCart() {
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const product = {
                id: productCard.dataset.id,
                name: productCard.querySelector('.product-title').textContent,
                price: parseInt(productCard.querySelector('.product-price').textContent.replace(/\D/g, '')),
                image: productCard.querySelector('img').src
            };
            addToCart(product);
        });
    });
}

function setupFavorites() {
    // Загружаем избранное
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Помечаем избранные товары
    document.querySelectorAll('.product-card').forEach(card => {
        if (favorites.includes(card.dataset.id)) {
            const btn = card.querySelector('.favorite-btn');
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
    });
    
    // Обработчики для кнопок избранного
    document.querySelectorAll('.favorite-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productId = productCard.dataset.id;
            
            toggleFavorite(productId);
            updateFavoritesCount();
            
            // Анимация кнопки
            this.classList.toggle('active');
            this.innerHTML = this.classList.contains('active') 
                ? '<i class="fas fa-heart"></i>' 
                : '<i class="far fa-heart"></i>';
        });
    });
}

function setupNavigation() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Убираем активный класс у всех
            document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
            
            // Добавляем активный класс текущей
            this.classList.add('active');
            
            // Скрываем все секции
            document.querySelectorAll('.product-section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Показываем нужную секцию
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).style.display = 'block';
        });
    });
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Товар добавлен в корзину');
}

function toggleFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
    } else {
        favorites.push(productId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = totalCount;
    });
}

function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.favorites-count').forEach(el => {
        el.textContent = favorites.length;
    });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Убираем через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Показ модального окна
function showModal() {
  document.getElementById('contact-modal').classList.add('show');
  document.body.style.overflow = 'hidden';
}

// Закрытие модального окна
function closeModal() {
  document.getElementById('contact-modal').classList.remove('show');
  document.body.style.overflow = '';
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Обработчик для кнопки "Связаться" в шапке
  document.querySelector('.btn-contact').addEventListener('click', function(e) {
    e.preventDefault();
    showModal();
  });
  
  // Закрытие при клике вне окна
  document.getElementById('contact-modal').addEventListener('click', function(e) {
    if (e.target === this) {
      closeModal();
    }
  });
});
