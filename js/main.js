// ============================================================
// Nepali Date & Time (using nepali-date-converter CDN)
// ============================================================
(function () {
    function getNepaliDateStr(now) {
        try {
            if (typeof NepaliDate !== 'undefined') {
                const ND = NepaliDate.default || NepaliDate;
                const npDate = new ND(now);
                return npDate.format('MMMM D, ddd'); // e.g. "Shrawan 8, Friday"
            }
        } catch (e) {
            console.error('Error formatting Nepali Date:', e);
        }
        return 'Ashad 21, Tuesday';
    }

    function updateNepaliDateTime() {
        const now = new Date();

        const dateStr = getNepaliDateStr(now);
        document.querySelectorAll('.nepali-date-text, #nepali-date-text').forEach(el => {
            el.textContent = dateStr;
        });

        const timeStr = now.toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kathmandu',
            hour: 'numeric',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
        document.querySelectorAll('.nepali-time-text, #nepali-time-text').forEach(el => {
            el.textContent = timeStr;
        });
    }

    updateNepaliDateTime();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateNepaliDateTime);
    }
    setInterval(updateNepaliDateTime, 1000);
})();


// ============================================================
// Page Loader
// ============================================================
function initPageLoader() {
    const loader = document.getElementById('page-loader');

    if (!loader) return;

    const hideLoader = () => {
        loader.classList.add('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            loader.remove();
        }, 500);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader, { once: true });
    }
}

initPageLoader();

// ============================================================
// Sidebar Active Link & ScrollSpy
// ============================================================
function initScrollSpy() {
    const navLinks = document.querySelectorAll('.sidebar-link');
    const sections = document.querySelectorAll('section[id]');

    function setActiveLink(id) {
        navLinks.forEach(link => {
            if (link.getAttribute('href') === '#' + id) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            } else {
                link.classList.remove('active');
                link.removeAttribute('aria-current');
            }
        });
    }

    // Click: immediately set active link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                setActiveLink(targetId);
            }
        });
    });

    // Scroll: update active link as sections come into view
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -50% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollSpy);
} else {
    initScrollSpy();
}
