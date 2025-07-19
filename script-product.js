
// Инициализация слайдера
const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Модальное окно
const modal = document.getElementById('contact-modal');
const btnContact = document.querySelector('.btn-contact');
const btnClose = document.querySelector('.modal-close');

btnContact.addEventListener('click', () => {
    modal.classList.add('show');
});

btnClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});





// Обработчик для кнопки избранного
document.querySelector('.add-to-favorites').addEventListener('click', function() {
    const productId = this.getAttribute('data-product-id');
    toggleFavorite(productId, this);
});

// Функция для работы с избранным
function toggleFavorite(productId, button) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const icon = button.querySelector('i');
    
    if (favorites.includes(productId)) {
        // Удаляем из избранного
        favorites = favorites.filter(id => id !== productId);
        button.classList.remove('active');
        icon.classList.replace('fas', 'far');
        button.innerHTML = '<i class="far fa-heart"></i> Добавить в избранное';
        showNotification('Товар удалён из избранного');
    } else {
        // Добавляем в избранное
        favorites.push(productId);
        button.classList.add('active');
        icon.classList.replace('far', 'fas');
        button.innerHTML = '<i class="fas fa-heart"></i> В избранном';
        showNotification('Товар добавлен в избранное');
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesCount();
}

// Обновление счетчика в шапке
function updateFavoritesCount() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    document.querySelectorAll('.favorites-count').forEach(el => {
        el.textContent = favorites.length;
    });
}

// Показ уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Проверяем при загрузке, есть ли товар в избранном
document.addEventListener('DOMContentLoaded', function() {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const productId = document.querySelector('.add-to-favorites').getAttribute('data-product-id');
    const button = document.querySelector('.add-to-favorites');
    
    if (favorites.includes(productId)) {
        button.classList.add('active');
        button.innerHTML = '<i class="fas fa-heart"></i> В избранном';
    }
    
    updateFavoritesCount();
});






document.addEventListener('DOMContentLoaded', function() {
        const swiper = new Swiper('.swiper', {
            // Параметры карусели
            loop: true, // бесконечная карусель
            autoplay: {
                delay: 2000, // автоматическое перелистывание каждые 2 секунды
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            // Эффект перехода (можно изменить на 'fade', 'cube' и др.)
            effect: 'slide',
            // Скорость перехода
            speed: 500,
        });
    });
