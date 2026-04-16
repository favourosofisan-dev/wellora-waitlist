const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const waitlistForm = document.getElementById("waitlist-form");
const emailInput = document.getElementById("emailInput");
const joinBtn = document.getElementById("joinBtn");
const message = document.getElementById("message");

if (mobileMenuBtn && siteNav) {
    mobileMenuBtn.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        mobileMenuBtn.classList.toggle("is-open", isOpen);
        mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

document.querySelectorAll('.site-nav a, .footer-links a, a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const href = link.getAttribute("href");
        if (!href || !href.startsWith("#") || href === "#") {
            return;
        }

        const target = document.querySelector(href);
        if (!target) {
            return;
        }

        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });

        if (siteNav?.classList.contains("is-open")) {
            siteNav.classList.remove("is-open");
            mobileMenuBtn?.classList.remove("is-open");
            mobileMenuBtn?.setAttribute("aria-expanded", "false");
        }
    });
});

if (waitlistForm) {
    waitlistForm.addEventListener("submit", (event) => {
        const email = emailInput?.value.trim() ?? "";

        if (email === "") {
            event.preventDefault();

            if (message) {
                message.textContent = "Please enter your email first";
            }

            emailInput?.focus();
            return;
        }

        if (message) {
            message.textContent = "You're now on the Wellora early access list";
        }
    });
}

if (joinBtn && emailInput && message) {
    joinBtn.addEventListener("click", () => {
        if (emailInput.value.trim() !== "") {
            message.textContent = "You're now on the Wellora early access list";
        }
    });
}

window.addEventListener("scroll", () => {
    if (!siteHeader) {
        return;
    }

    siteHeader.style.boxShadow = window.scrollY > 10
        ? "0 10px 28px rgba(36, 22, 14, 0.08)"
        : "none";
});
