// =======================================
// Krishi Sarthi — cost.js
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    // ── Refs ─────────────────────────────────────────────────
    const form    = document.querySelector(".form-card > form");
    const btn     = document.getElementById("calcBtn");
    const label   = btn?.querySelector(".calc-label");
    const overlay = document.getElementById("costLoadingOverlay");

    // ── Loading messages that cycle on the overlay ────────────
    const messages = [
        "Analysing your farm data…",
        "Calculating input costs…",
        "Running AI crop model…",
        "Generating recommendations…",
        "Almost there…",
    ];

    // ── Form submit → show loading ────────────────────────────
    if (form && btn) {
        form.addEventListener("submit", (e) => {
            // Let browser do native HTML5 validation first
            if (!form.checkValidity()) return;

            // Activate button loading state
            btn.classList.add("is-loading");
            btn.disabled = true;
            if (label) label.textContent = "Calculating…";

            // Show overlay
            if (overlay) {
                overlay.classList.add("active");
                cycleMessages(overlay.querySelector(".clo-title"));
            }
        });
    }

    // ── Cycle overlay messages ────────────────────────────────
    function cycleMessages(el) {
        if (!el) return;
        let i = 0;
        setInterval(() => {
            i = (i + 1) % messages.length;
            el.style.opacity = "0";
            el.style.transition = "opacity .3s";
            setTimeout(() => {
                el.textContent = messages[i];
                el.style.opacity = "1";
            }, 320);
        }, 2200);
    }

    // ── Animated progress bars ────────────────────────────────
    const fills = document.querySelectorAll(".bc-fill");

    if (fills.length) {
        const animate = () => {
            fills.forEach((el) => {
                const val   = parseFloat(el.dataset.val)   || 0;
                const total = parseFloat(el.dataset.total) || 1;
                const pct   = Math.min((val / total) * 100, 100).toFixed(1);

                requestAnimationFrame(() => { el.style.width = pct + "%"; });

                const item = el.closest(".bc-item");
                if (item) {
                    const pctEl = item.querySelector(".bc-pct");
                    if (pctEl) pctEl.textContent = pct + "%";
                }
            });
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) { animate(); observer.disconnect(); }
                });
            },
            { threshold: 0.2 }
        );

        const panel = document.querySelector(".breakdown-panel");
        if (panel) observer.observe(panel);
        else animate();
    }
});
