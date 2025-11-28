// script.js
// تفعيل حركة الظهور التدريجي عند تمرير الصفحة
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) entry.target.classList.add('show');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.book-card').forEach(card => observer.observe(card));

// عناصر المودال
const overlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const closeBtn = document.getElementById('closeModalBtn');

// فتح المودال عند الضغط على أي صورة داخل البطاقة
document.querySelectorAll('.book-card img').forEach(img => {
    img.addEventListener('click', (e) => {
        // تعيين الصورة داخل المودال
        modalImage.src = img.src;
        modalImage.alt = img.alt || 'صورة كتاب';
        // إظهار الغطاء (ضباب/تعتيم أسود)
        overlay.classList.add('show');
        overlay.setAttribute('aria-hidden', 'false');
        // منع سكرول الصفحة أثناء فتح المودال
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        // وضع التركيز على زر الإغلاق لسهولة الوصول
        closeBtn.focus();
    });
});

// إغلاق المودال عبر زر X
closeBtn.addEventListener('click', () => {
    closeModal();
});

// إغلاق المودال عند الضغط على الغطاء الخارجي (ولكن ليس عند الضغط داخل صندوق الصورة)
overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
        closeModal();
    }
});

// إغلاق المودال عند الضغط على مفتاح Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
        closeModal();
    }
});

// دالة لإغلاق المودال وتنظيف الحالة
function closeModal() {
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    // إعادة سكرول الصفحة
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    // إزالة مصدر الصورة (اختياري) لتفريغ الذاكرة
    modalImage.src = '';
    // إعادة تركيز إلى أول صورة في الصفحة إن رغبت
    const firstImg = document.querySelector('.book-card img');
    if (firstImg) firstImg.focus();
}