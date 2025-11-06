// ==== БУРГЕР-МЕНЮ ====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});

// ==== МОДАЛЬНОЕ ОКНО ====
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');

openModal.addEventListener('click', () => {
  modal.classList.add('open'); 
});
closeModal.addEventListener('click', () => {
  modal.classList.remove('open');
});
window.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('open');
});

// ==== ФИЛЬТР с плавной анимацией ====
const filterContainer = document.querySelector('.filter');
const productsContainer = document.querySelector('.products-container');
const products = document.querySelectorAll('.product-card');

if (filterContainer && productsContainer) {
  filterContainer.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    filterContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const category = button.dataset.category;

    productsContainer.classList.add('fade-out');

    setTimeout(() => {
      products.forEach(product => {
        if (category === 'all' || product.dataset.category === category) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });

      productsContainer.classList.remove('fade-out');
      productsContainer.classList.add('fade-in');

      setTimeout(() => {
        productsContainer.classList.remove('fade-in');
      }, 300);
    }, 300);
  });
}

// ==== BOOTSTRAP ВАЛИДАЦИЯ ФОРМЫ ====
(function () {
  'use strict'
  var forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
        
        // Скрываем кастомное сообщение если форма не валидна
        const formMessage = form.querySelector('.form-message');
        if (formMessage) formMessage.style.display = 'none';
      } else {
        // Если форма валидна, показываем toast и сбрасываем
        event.preventDefault();
        const toastEl = document.getElementById('contactToast');
        const toast = new bootstrap.Toast(toastEl, {
          autohide: true,
          delay: 5000
        });
        toast.show();
        form.reset();
        form.classList.remove('was-validated');
        
        // Скрываем кастомное сообщение
        const formMessage = form.querySelector('.form-message');
        if (formMessage) formMessage.style.display = 'none';
      }
      form.classList.add('was-validated')
    }, false)
  })
})()

// ==== АНИМАЦИИ при появлении ====
document.addEventListener('DOMContentLoaded', () => {
  const animatedItems = document.querySelectorAll('.animate-fade, .animate-slide');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-visible');
        observer.unobserve(entry.target); 
      }
    });
  }, {
    threshold: 0.1
  });

  animatedItems.forEach(item => observer.observe(item));
});

// ==== ФИЛЬТР КАТАЛОГА ====
document.querySelectorAll('.filter-buttons button').forEach(button => {
  button.addEventListener('click', () => {
    const category = button.dataset.category;

    // Активная кнопка
    document.querySelectorAll('.filter-buttons button').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // Фильтрация только внутри .products-container
    document.querySelectorAll('.products-container .product-card').forEach(card => {
      if (category === 'all' || card.dataset.category === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// ==== ГАЛЕРЕЯ ИЗОБРАЖЕНИЙ ====
const galleryItems = document.querySelectorAll('.gallery-item');
const modalImage = document.getElementById('modalImage');
let currentImageIndex = 0;

// Обработчик клика по изображению в галерее
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentImageIndex = index;
    modalImage.src = item.dataset.image;
    modalImage.alt = item.querySelector('img').alt;
  });
});

// Кнопка "следующее изображение"
document.getElementById('nextModalImage')?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
  const nextItem = galleryItems[currentImageIndex];
  modalImage.src = nextItem.dataset.image;
  modalImage.alt = nextItem.querySelector('img').alt;
});

// Кнопка "предыдущее изображение"
document.getElementById('prevModalImage')?.addEventListener('click', () => {
  currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
  const prevItem = galleryItems[currentImageIndex];
  modalImage.src = prevItem.dataset.image;
  modalImage.alt = prevItem.querySelector('img').alt;
});

// Обработчики клавиатуры для галереи
document.addEventListener('keydown', (e) => {
  const imageModal = document.getElementById('imageModal');
  if (imageModal && imageModal.classList.contains('show')) {
    if (e.key === 'ArrowRight') {
      document.getElementById('nextModalImage')?.click();
    } else if (e.key === 'ArrowLeft') {
      document.getElementById('prevModalImage')?.click();
    } else if (e.key === 'Escape') {
      const modal = bootstrap.Modal.getInstance(imageModal);
      if (modal) modal.hide();
    }
  }
});

// ==== ИНИЦИАЛИЗАЦИЯ БУТСТРАП КОМПОНЕНТОВ ====
document.addEventListener('DOMContentLoaded', function() {
  // Инициализация всех Bootstrap компонентов
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
});