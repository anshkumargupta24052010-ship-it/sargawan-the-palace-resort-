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

// ==========================================================================
// ADDED: HIGH-PERFORMANCE MODAL & WHATSAPP INTEGRATION ENGINE (Global Scope)
// ==========================================================================

const WHATSAPP_NUMBER = "918109944185"; // <--- Yahan apna active WhatsApp number bina '+' lagaye daal dena

// 1. Open Modal with Dynamic Input Field rendering based on service selected
window.openBookingModal = function(type) {
    const modal = document.getElementById('bookingModal');
    const modalTitle = document.getElementById('modalTitle');
    const bookingTypeInput = document.getElementById('bookingType');
    const dynamicLabel = document.getElementById('dynamicLabel');
    const dynamicInput = document.getElementById('dynamicInput');

    if (!modal || !modalTitle || !bookingTypeInput || !dynamicLabel || !dynamicInput) return;

    bookingTypeInput.value = type;
    modalTitle.innerText = type;

    // Swap layouts gracefully based on selection type
    if (type === 'Stay / Room Booking') {
        dynamicLabel.innerText = "Select Suite Type";
        dynamicInput.outerHTML = `
            <select id="dynamicInput" required class="w-full bg-[#161513] border border-white/10 p-3 text-[#F5F2EB]/80 focus:outline-none focus:border-[#C5A880] transition-colors uppercase">
                <option value="The Maharaja Suite">The Maharaja Suite (Premium Luxury)</option>
                <option value="Heritage Executive">Heritage Executive (Classic Comfort)</option>
            </select>
        `;
    } else if (type === 'Wedding & Event') {
        dynamicLabel.innerText = "Estimated Gathering Size";
        dynamicInput.outerHTML = `
            <input type="number" id="dynamicInput" required min="50" placeholder="e.g., 200" class="w-full bg-[#161513] border border-white/10 p-3 text-[#F5F2EB] focus:outline-none focus:border-[#C5A880] transition-colors">
        `;
    } else if (type === 'Go-Karting Session') {
        dynamicLabel.innerText = "Number of Drivers / Slots";
        dynamicInput.outerHTML = `
            <input type="number" id="dynamicInput" required min="1" max="15" placeholder="e.g., 2" class="w-full bg-[#161513] border border-white/10 p-3 text-[#F5F2EB] focus:outline-none focus:border-[#C5A880] transition-colors">
        `;
    }

    modal.classList.add('modal-active');
};

// 2. Close Modal Handler
window.closeBookingModal = function() {
    const modal = document.getElementById('bookingModal');
    if (modal) {
        modal.classList.remove('modal-active');
    }
};

// Close Modal overlay safely if user clicks background area
window.addEventListener('click', (event) => {
    const modal = document.getElementById('bookingModal');
    if (event.target === modal) {
        window.closeBookingModal();
    }
});

// 3. Dynamic Form Data Processing & WhatsApp API Handshake
window.handleFormSubmit = function(event) {
    event.preventDefault();

    const bookingType = document.getElementById('bookingType').value;
    const guestName = document.getElementById('guestName').value;
    const bookingDate = document.getElementById('bookingDate').value;
    const dynamicValue = document.getElementById('dynamicInput').value;

    let dynamicHeaderLabel = "Details";
    if (bookingType === 'Stay / Room Booking') dynamicHeaderLabel = "Chosen Suite";
    if (bookingType === 'Wedding & Event') dynamicHeaderLabel = "Expected Guests";
    if (bookingType === 'Go-Karting Session') dynamicHeaderLabel = "Total Drivers";

    // Premium formatted royal message payload
    const message = `👑 *SARGAWAN PALACE RESORT* 👑\n` +
                    `*Bespoke Experience Reservation*\n\n` +
                    `▪️ *Inquiry Type:* ${bookingType}\n` +
                    `▪️ *Guest Name:* ${guestName}\n` +
                    `▪️ *Preferred Date:* ${bookingDate}\n` +
                    `▪️ *${dynamicHeaderLabel}:* ${dynamicValue}\n\n` +
                    `Please check internal ledger availability and confirm the slot.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.closeBookingModal();
    document.getElementById('royalBookingForm').reset();
    
    // Smooth redirect logic
    window.open(whatsappUrl, '_blank');
};
