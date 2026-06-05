document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP Plugin
    gsap.registerPlugin(ScrollTrigger);

    // 1. CINEMATIC TIMELINE FOR HERO SECTION (Smoothed for High Performance)
    let tl = gsap.timeline({
        defaults: { ease: "power4.out", duration: 1.4 }
    });
    
    tl.to("#hero-img", { scale: 1, duration: 3 })
      .to("#hero-tag", { opacity: 1, y: 0 }, "-=2.4")
      .to("#hero-title", { opacity: 1, y: 0 }, "-=2.0")
      .to("#hero-line", { opacity: 1, scaleY: 1, duration: 1 }, "-=1.2");

    // 2. PERFORMANCE OPTIMIZED SCROLL NAVBAR
    const navbar = document.getElementById("navbar");
    let scrollTimeout;
    
    window.addEventListener("scroll", () => {
        if (!scrollTimeout) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 60) {
                    navbar.classList.add("nav-active");
                } else {
                    navbar.classList.remove("nav-active");
                }
                scrollTimeout = null;
            });
            scrollTimeout = true;
        }
    }, { passive: true });

    // 3. ELEGANT SCROLL TRIGGERS FOR ESTATE SECTION
    gsap.from(".section-title", {
        scrollTrigger: {
            trigger: ".section-title",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: "power3.out"
    });

    // Parallax Zoom Out Reveal for Main Images (Very Premium Feel)
    gsap.from(".reveal-img", {
        scrollTrigger: {
            trigger: ".reveal-img",
            start: "top 95%",
            end: "bottom top",
            scrub: 1
        },
        scale: 1.15,
        y: 30,
        ease: "none"
    });
});