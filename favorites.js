document.addEventListener('DOMContentLoaded', function() {
    const favoritesGrid = document.getElementById('favorites-grid');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Обновляем счетчики в шапке
    updateHeaderCounters();
    
    // Загружаем избранные товары
    loadFavoriteProducts();

    function loadFavoriteProducts() {
        // Все товары с их ID и ссылками на страницы
        const allProducts = [
            {
                id: "1",
                name: "Зайка в платьишке",
                price: 1800,
                image: "img/zayavplate.jpg",
                link: "product-1.html"
            },
            {
                id: "2",
                name: "Плюшевый зайчик",
                price: 1500,
                image: "img/zaiki.jpg",
                link: "product-2.html"
            },
            {
                id: "3",
                name: "Дракончик-брелок",
                price: 900,
                image: "img/drakonchik.jpg",
                link: "product-3.html"
            },
            {
                id: "4",
                name: "Лама в костюмчике",
                price: 2300,
                image: "img/lama1.jpg",
                link: "product-4.html"
            },
            {
                id: "5",
                name: "Дед Мороз",
                price: 2100,
                image: "img/dedmoroz.jpg",
                link: "product-5.html"
            },
            {
                id: "6",
                name: "Пчелка с цветочками",
                price: 1700,
                image: "img/pchela.jpg",
                link: "product-6.html"
            },
            {
                id: "7",
                name: "Костюм песочный (0-3 мес)",
                price: 3500,
                image: "img/k1.jpg",
                link: "product-7.html"
            },
            {
                id: "8",
                name: "Костюм мятный (0-6 мес)",
                price: 3200,
                image: "img/kostum.jpg",
                link: "product-8.html"
            }
        ];

        // Фильтруем только избранные товары
        const favoriteProducts = allProducts.filter(product => 
            favorites.includes(product.id)
        );

        // Если нет избранных
        if (favoriteProducts.length === 0) {
            favoritesGrid.innerHTML = `
                <div class="empty-favorites">
                    <i class="fas fa-heart"></i>
                    <p>Пока нет избранных товаров</p>
                    <a href="index.html" class="btn">Перейти к товарам</a>
                </div>
            `;
            return;
        }

        // Отображаем избранные товары
        favoritesGrid.innerHTML = '';
        favoriteProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.dataset.id = product.id;
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <button class="favorite-btn active"><i class="fas fa-heart"></i></button>
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.name}</h3>
                    <div class="product-price">${product.price} ₽</div>
                    <a href="${product.link}" class="view-details">Подробнее</a>
                </div>
            `;
            favoritesGrid.appendChild(productCard);
        });

        // Добавляем обработчики для кнопок избранного
        addFavoriteEventListeners();
    }

    function addFavoriteEventListeners() {
        // Используем делегирование событий
        document.getElementById('favorites-grid').addEventListener('click', function(e) {
            // Проверяем, была ли нажата кнопка избранного
            if (e.target.closest('.favorite-btn')) {
                const btn = e.target.closest('.favorite-btn');
                const productCard = btn.closest('.product-card');
                const productId = productCard.dataset.id;
                
                toggleFavorite(productId);
                updateHeaderCounters();
                
                // Удаляем карточку
                productCard.remove();
                
                // Если товаров не осталось, показываем сообщение
                if (document.querySelectorAll('.product-card').length === 0) {
                    showEmptyFavorites();
                }
            }
        });
    }

    function showEmptyFavorites() {
        document.getElementById('favorites-grid').innerHTML = `
            <div class="empty-favorites">
                <i class="fas fa-heart"></i>
                <p>Пока нет избранных товаров</p>
                <a href="index.html" class="btn">Перейти к товарам</a>
            </div>
        `;
    }

    function toggleFavorite(productId) {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        favorites = favorites.filter(id => id !== productId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    function updateHeaderCounters() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        document.querySelectorAll('.favorites-count').forEach(el => {
            el.textContent = favorites.length;
        });
    }
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('index.html')) {
            e.preventDefault();
            window.location.href = this.getAttribute('href');
        }
        });
});
