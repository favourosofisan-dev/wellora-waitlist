const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const siteNav = document.querySelector(".site-nav");
const siteHeader = document.querySelector(".site-header");
const waitlistForm = document.getElementById("waitlist-form");
const emailInput = document.getElementById("emailInput");
const joinBtn = document.getElementById("joinBtn");
const message = document.getElementById("message");
const supabaseUrl = waitlistForm?.dataset.supabaseUrl ?? "";
const supabaseAnonKey = waitlistForm?.dataset.supabaseAnonKey ?? "";
const waitlistTable = waitlistForm?.dataset.supabaseTable ?? "";
const supabaseClient = window.supabase?.createClient(supabaseUrl, supabaseAnonKey);

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
    waitlistForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email = emailInput?.value.trim() ?? "";

        if (email === "") {
            if (message) {
                message.textContent = "Please enter your email first";
            }

            emailInput?.focus();
            return;
        }

        if (!supabaseClient) {
            if (message) {
                message.textContent = "The waitlist is temporarily unavailable. Please try again.";
            }
            return;
        }

        if (joinBtn) {
            joinBtn.disabled = true;
            joinBtn.textContent = "Joining...";
        }

        if (message) {
            message.textContent = "Saving your spot...";
        }

        const { error } = await supabaseClient
            .from(waitlistTable)
            .insert([{ email }]);

        if (error) {
            if (message) {
                message.textContent = error.code === "23505"
                    ? "This email is already on the waitlist."
                    : "Something went wrong. Please try again.";
            }

            if (joinBtn) {
                joinBtn.disabled = false;
                joinBtn.textContent = "Join Waitlist";
            }

            return;
        }

        if (message) {
            message.textContent = "You're now on the Wellora early access list.";
        }

        waitlistForm.reset();

        if (joinBtn) {
            joinBtn.disabled = false;
            joinBtn.textContent = "Join Waitlist";
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
