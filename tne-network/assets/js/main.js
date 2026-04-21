document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Scroll Reveals
    const setupScrollAnimations = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -10% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Animate only once
                }
            });
        }, observerOptions);

        elements.forEach(el => observer.observe(el));
    };

    // 2. Setup Premium Count-Up Metrics
    const setupNumberCounters = () => {
        const counters = document.querySelectorAll('.metric-huge[data-count]');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -5% 0px',
            threshold: 1
        };

        const easeOutQuart = (x) => {
            return 1 - Math.pow(1 - x, 4);
        };

        const executeCount = (el) => {
            const target = parseFloat(el.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const prefix = el.getAttribute('data-prefix') || '';
            const suffix = el.getAttribute('data-suffix') || '';
            const isDecimal = target % 1 !== 0;
            
            let startTime = null;

            const updateNumber = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = currentTime - startTime;
                
                // Calculate easing progress (0 to 1)
                const percent = Math.min(progress / duration, 1);
                const easedValue = easeOutQuart(percent);
                
                let currentValue = target * easedValue;
                
                if (isDecimal) {
                    currentValue = currentValue.toFixed(1);
                } else {
                    currentValue = Math.floor(currentValue).toLocaleString();
                }

                el.innerText = `${prefix}${currentValue}${suffix}`;

                if (progress < duration) {
                    requestAnimationFrame(updateNumber);
                } else {
                    // Final guarantee
                    const finalVal = isDecimal ? target : target.toLocaleString();
                    el.innerText = `${prefix}${finalVal}${suffix}`;
                }
            };
            
            requestAnimationFrame(updateNumber);
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    executeCount(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    };

    // 3. Header Scroll State
    const setupHeaderScrollState = () => {
        const header = document.querySelector('.site-header');
        if (!header) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.boxShadow = '0 4px 20px rgba(15, 23, 42, 0.05)';
                header.style.backgroundColor = 'rgba(249, 249, 248, 0.98)';
            } else {
                header.style.boxShadow = 'none';
                header.style.backgroundColor = 'rgba(249, 249, 248, 0.95)';
            }
        });
    };

    setupScrollAnimations();
    setupNumberCounters();
    setupHeaderScrollState();
});
