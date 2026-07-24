// ============================================================
// Nepali Date & Time (Bikram Sambat)
// ============================================================
(function () {
    const bsData = {
        2080: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
        2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
        2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
        2084: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31],
        2085: [30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31]
    };

    function getNepaliDate(adDate) {
        const refAd = new Date(2023, 3, 14); // 2023-04-14 = 2080 Baisakh 1
        const target = new Date(adDate.getFullYear(), adDate.getMonth(), adDate.getDate());
        let diffDays = Math.round((target - refAd) / (1000 * 60 * 60 * 24));
        let bsYear = 2080;
        let bsMonth = 0;

        if (diffDays >= 0) {
            while (diffDays >= 0) {
                const daysInMonth = (bsData[bsYear] && bsData[bsYear][bsMonth]) || 30;
                if (diffDays < daysInMonth) break;
                diffDays -= daysInMonth;
                bsMonth++;
                if (bsMonth >= 12) { bsMonth = 0; bsYear++; }
            }
        } else {
            while (diffDays < 0) {
                bsMonth--;
                if (bsMonth < 0) { bsMonth = 11; bsYear--; }
                const daysInMonth = (bsData[bsYear] && bsData[bsYear][bsMonth]) || 30;
                diffDays += daysInMonth;
            }
        }

        const bsDay = diffDays + 1;
        const months = ['Baisakh', 'Jestha', 'Ashad', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'];
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return `${months[bsMonth]} ${bsDay}, ${days[adDate.getDay()]}`;
    }

    function updateNepaliDateTime() {
        const now = new Date();

        // Update Date
        const dateEl = document.getElementById('nepali-date-text');
        if (dateEl) {
            dateEl.textContent = getNepaliDate(now);
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
