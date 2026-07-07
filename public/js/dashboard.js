// =========================================
// Krishi Sarthi
// dashboard.js
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Dashboard Loaded");

    // ==========================
    // Greeting
    // ==========================

    const greeting = document.getElementById("greeting");

    if (greeting) {

        const hour = new Date().getHours();

        if (hour < 12) {
            greeting.innerHTML = "🌅 Good Morning, Farmer!";
        } else if (hour < 17) {
            greeting.innerHTML = "☀️ Good Afternoon, Farmer!";
        } else {
            greeting.innerHTML = "🌙 Good Evening, Farmer!";
        }

    }

    // ==========================
    // Current Date
    // ==========================

    const date = document.getElementById("currentDate");

    if (date) {

        date.innerHTML = new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    }

    // ==========================
    // Animated Counters
    // ==========================

    const counters = document.querySelectorAll(".counter");

    counters.forEach(counter => {

        const target = Number(counter.dataset.target);

        let count = 0;

        const speed = Math.ceil(target / 80);

        function updateCounter() {

            if (count < target) {

                count += speed;

                counter.innerHTML = count;

                requestAnimationFrame(updateCounter);

            } else {

                counter.innerHTML = target;

            }

        }

        updateCounter();

    });

    // ==========================
    // Card Hover Animation
    // ==========================

    document.querySelectorAll(".dash-card").forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform = "translateY(-8px)";
            card.style.transition = "0.3s";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "translateY(0px)";

        });

    });

    // ==========================
    // Quick Buttons
    // ==========================

    document.querySelectorAll(".quick-btn").forEach(button => {

        button.addEventListener("click", () => {

            showToast(button.innerText);

        });

    });

    // ==========================
    // Weather Summary
    // ==========================

    const weather = document.getElementById("weatherSummary");

    if (weather) {

        weather.innerHTML = `
            🌤 Temperature : 30°C <br>
            💧 Humidity : 70% <br>
            🌬 Wind : 10 km/h
        `;

    }

    // ==========================
    // Recent Activity
    // ==========================

    const activity = document.getElementById("activity");

    if (activity) {

        activity.innerHTML = `
        <ul>
            <li>✅ Crop Recommendation Completed</li>
            <li>🌦 Weather Checked</li>
            <li>🍃 Disease Prediction Done</li>
            <li>💰 Profit Estimated</li>
        </ul>
        `;

    }

    // ==========================
    // Refresh Dashboard
    // ==========================

    const refresh = document.getElementById("refreshDashboard");

    if (refresh) {

        refresh.addEventListener("click", () => {

            showToast("Refreshing Dashboard...");

            setTimeout(() => {

                location.reload();

            },1000);

        });

    }

    // ==========================
    // Notification Button
    // ==========================

    const notification = document.getElementById("notificationBtn");

    if (notification) {

        notification.addEventListener("click", () => {

            showToast("No New Notifications");

        });

    }

    // ==========================
    // Welcome Toast
    // ==========================

    setTimeout(() => {

        showToast("Welcome to Krishi Sarthi Dashboard!");

    },800);

});