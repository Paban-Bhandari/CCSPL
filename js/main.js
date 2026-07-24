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

        // Update Date
        const dateEl = document.getElementById('nepali-date-text');
        if (dateEl) {
            dateEl.textContent = getNepaliDateStr(now);
        }

        // Update Live Nepal Time (NPT — UTC+5:45)
        const timeEl = document.getElementById('nepali-time-text');
        if (timeEl) {
            timeEl.textContent = now.toLocaleTimeString('en-US', {
                timeZone: 'Asia/Kathmandu',
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
        }
    }

    updateNepaliDateTime();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateNepaliDateTime);
    }
    setInterval(updateNepaliDateTime, 1000);
})();


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
            } else {
                link.classList.remove('active');
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
