/* HOMEUniversity — Navigation */

// Sidebar toggle (mobile)
document.querySelector('.mt')?.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.toggle('open');
    document.querySelector('.ov').classList.toggle('active');
});
document.querySelector('.ov')?.addEventListener('click', () => {
    document.querySelector('.sidebar').classList.remove('open');
    document.querySelector('.ov').classList.remove('active');
});

// Dropdown toggle
function toggleDD(id) {
    const el = document.getElementById(id);
    if (el) el.classList.toggle('open');
    const toggle = document.getElementById(id + '-toggle');
    if (toggle) toggle.classList.toggle('exp');
}

// Tier tabs
document.querySelectorAll('.tt').forEach(tab => {
    tab.addEventListener('click', () => {
        const s = tab.closest('.tier-section');
        const t = tab.dataset.tier;
        s.querySelectorAll('.tt').forEach(x => x.classList.remove('active'));
        s.querySelectorAll('.tc').forEach(x => x.classList.remove('active'));
        tab.classList.add('active');
        const content = s.querySelector(`[data-tier-content="${t}"]`);
        if (content) content.classList.add('active');
    });
});

// Highlight current page in sidebar
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nsl, .nl').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPage || href === './' + currentPage)) {
        link.classList.add('active');
        // Open parent dropdown
        const dd = link.closest('.ndd');
        if (dd) {
            dd.classList.add('open');
            const toggle = dd.previousElementSibling;
            if (toggle) toggle.classList.add('exp');
        }
    }
});

// Auto-open whitepill dropdown if on a level page
if (['level0.html','level1.html','level2.html'].includes(currentPage)) {
    const wpDD = document.getElementById('wp');
    if (wpDD) wpDD.classList.add('open');
    const wpToggle = document.getElementById('wp-toggle');
    if (wpToggle) wpToggle.classList.add('exp');
}

// Scroll reveal
function initReveal() {
    const obs = new IntersectionObserver(e => {
        e.forEach(x => {
            if (x.isIntersecting) {
                x.target.classList.add('visible');
                obs.unobserve(x.target);
            }
        });
    }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => obs.observe(el));
}
initReveal();
