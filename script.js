// script.js
// Full, ready-to-use JS for UrbanDrive project
// Includes: cars data, theme, favourites, fleet, booking, payment, confirm,
// offline city autocomplete + distance/time/fare, auth (signup/login + OTP), quick-book

"use strict";

/* ==========================
   DATA: cars
   ========================== */
const cars = [
    {
        id: "ertiga",
        name: "Maruti Ertiga",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        seats: 7,
        image: "maruti.avif",
        prices: { "24hrs": 2280, "4 days": 9120, "10 days": 22800 },
        tag: "Popular",
        badgeClass: "badge-popular"
    },
    {
        id: "swift",
        name: "Maruti Swift",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        image: "swift.avif",
        prices: { "24hrs": 1584, "4 days": 6336, "10 days": 15840 },
        tag: "Best Seller",
        badgeClass: "badge-best"
    },
    {
        id: "innova",
        name: "Innova Crysta",
        makeYear: 2019,
        fuel: "Diesel",
        transmission: "Manual",
        seats: 7,
        image: "innova.jpg",
        prices: { "24hrs": 3984, "4 days": 15936, "10 days": 39840 },
        tag: "Premium",
        badgeClass: "badge-premium"
    },
    {
        id: "creta",
        name: "Hyundai Creta",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        image: "hyndai.webp",
        prices: { "24hrs": 2976, "4 days": 11904, "10 days": 29760 },
        tag: "New",
        badgeClass: "badge-new"
    },
    {
        id: "city",
        name: "Honda City",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        image: "HONDA.AVIF",
        prices: { "24hrs": 2300, "4 days": 9200, "10 days": 23000 },
        tag: "Comfort",
        badgeClass: "badge-popular"
    },
    {
        id: "hector",
        name: "MG Hector",
        makeYear: 2023,
        fuel: "Diesel",
        transmission: "Manual",
        seats: 7,
        image: "MG1.WEBP",
        prices: { "24hrs": 3200, "4 days": 12800, "10 days": 32000 },
        tag: "Tech",
        badgeClass: "badge-trending"
    },
    {
        id: "i20",
        name: "Hyundai i20 Sportz",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        image: "i20.webp",
        prices: { "24hrs": 1700, "4 days": 6800, "10 days": 17000 },
        tag: "Hatchback",
        badgeClass: "badge-economy"
    },
    {
        id: "kiger",
        name: "Renault Kiger",
        makeYear: 2024,
        fuel: "Petrol",
        transmission: "Manual",
        seats: 5,
        image: "kiger.avif",
        prices: { "24hrs": 1900, "4 days": 7600, "10 days": 19000 },
        tag: "Compact SUV",
        badgeClass: "badge-popular"
    },
    {
        id: "virtus",
        name: "Volkswagen Virtus",
        makeYear: 2023,
        fuel: "Petrol",
        transmission: "Automatic",
        seats: 5,
        image: "Volkswagen.avif",
        prices: { "24hrs": 2700, "4 days": 10800, "10 days": 27000 },
        tag: "Premium Sedan",
        badgeClass: "badge-premium"
    },
    {
        id: "nexonev",
        name: "Tata Nexon EV (Long Range)",
        makeYear: 2024,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        image: "nexonev.avif",
        prices: { "24hrs": 2500, "4 days": 10000, "10 days": 25000 },
        tag: "EV",
        badgeClass: "badge-premium"
    },
    {
        id: "tiagoev",
        name: "Tata Tiago EV",
        makeYear: 2023,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        image: "tiagoev.avif",
        prices: { "24hrs": 1600, "4 days": 6400, "10 days": 16000 },
        tag: "Budget EV",
        badgeClass: "badge-economy"
    },
    {
        id: "atto3",
        name: "BYD Atto 3",
        makeYear: 2024,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        image: "atto3.avif",
        prices: { "24hrs": 3200, "4 days": 12800, "10 days": 32000 },
        tag: "Premium EV",
        badgeClass: "badge-trending"
    },
    {
        id: "konaev",
        name: "Hyundai Kona Electric",
        makeYear: 2023,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        image: "konaev.avif",
        prices: { "24hrs": 2800, "4 days": 11200, "10 days": 28000 },
        tag: "Compact EV",
        badgeClass: "badge-popular"
    },
    {
        id: "cometev",
        name: "MG Comet EV",
        makeYear: 2024,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 4,
        image: "cometev.avif",
        prices: { "24hrs": 1400, "4 days": 5600, "10 days": 14000 },
        tag: "City EV",
        badgeClass: "badge-economy"
    },
    {
        id: "bmwi4",
        name: "BMW i4 Electric",
        makeYear: 2024,
        fuel: "Electric",
        transmission: "Automatic",
        seats: 5,
        image: "bmwi4.avif",
        prices: { "24hrs": 6500, "4 days": 26000, "10 days": 65000 },
        tag: "Luxury EV",
        badgeClass: "badge-premium"
    }
];

/* ==========================
   Helpers
   ========================== */
function formatRupees(amount) {
    if (amount == null) return "₹ 0";
    return "₹ " + Number(amount).toLocaleString("en-IN");
}

/* ==========================
   THEME TOGGLE (ALL PAGES)
   ========================== */
const bodyEl = document.body;
const themeToggleBtn = document.getElementById("themeToggle");

function applyTheme(theme) {
    if (!bodyEl) return;
    if (theme === "light") {
        bodyEl.classList.remove("theme-dark");
        bodyEl.classList.add("theme-light");
        if (themeToggleBtn) themeToggleBtn.querySelector(".icon").textContent = "☀️";
    } else {
        bodyEl.classList.remove("theme-light");
        bodyEl.classList.add("theme-dark");
        if (themeToggleBtn) themeToggleBtn.querySelector(".icon").textContent = "🌙";
    }
    try { localStorage.setItem("theme", theme); } catch {}
}

(function initTheme() {
    const saved = localStorage.getItem("theme");
    applyTheme(saved === "light" || saved === "dark" ? saved : "dark");
})();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
        const current = bodyEl.classList.contains("theme-light") ? "light" : "dark";
        applyTheme(current === "light" ? "dark" : "light");
    });
}

/* ==========================
   COLOR THEME SWITCHER (OPTIONAL)
   ========================== */
const themeOptions = document.querySelectorAll(".theme-option");

function applyColorTheme(themeClass) {
    if (!bodyEl) return;
    Array.from(bodyEl.classList).forEach(cls => {
        if (cls.startsWith("theme-") && cls !== "theme-light" && cls !== "theme-dark") {
            bodyEl.classList.remove(cls);
        }
    });
    if (themeClass && themeClass !== "theme-default") bodyEl.classList.add(themeClass);
    try { localStorage.setItem("colorTheme", themeClass || "theme-default"); } catch {}
}

(function initColorTheme() {
    const saved = localStorage.getItem("colorTheme");
    if (saved && saved !== "theme-default") bodyEl.classList.add(saved);
})();

if (themeOptions && themeOptions.length) {
    themeOptions.forEach(opt => {
        opt.addEventListener("click", () => {
            const key = opt.dataset.theme;
            const cls = key === "default" ? "theme-default" : "theme-" + key;
            applyColorTheme(cls);
        });
    });
}

/* ==========================
   FAVOURITES STORAGE
   ========================== */
let favourites = new Set();
try {
    favourites = new Set(JSON.parse(localStorage.getItem("favCars") || "[]"));
} catch { favourites = new Set(); }
function saveFavourites() {
    try { localStorage.setItem("favCars", JSON.stringify(Array.from(favourites))); } catch {}
}

/* ==========================
   FLEET PAGE (fleet.html)
   ========================== */
const searchInput = document.getElementById("searchInput");
const fuelFilter = document.getElementById("fuelFilter");
const sortSelect = document.getElementById("sortSelect");
const favToggle = document.getElementById("favToggle");
const statsBar = document.getElementById("statsBar");
const carGrid = document.getElementById("carGrid");

let showFavOnly = false;

function getPricePerDay(car) {
    return (car && car.prices && car.prices["24hrs"]) ? car.prices["24hrs"] : 0;
}

function updateStats(visibleCount) {
    if (!statsBar) return;
    const total = cars.length;
    const favCount = favourites.size;
    const parts = [];
    parts.push(`Showing <strong>${visibleCount}</strong> of <strong>${total}</strong> cars`);
    if (favCount > 0) parts.push(`Favourites: <strong>${favCount}</strong>`);
    if (showFavOnly) parts.push('<span class="text-danger ms-1">[Favourites filter active]</span>');
    statsBar.innerHTML = parts.join(" • ");
}

function renderCars() {
    if (!carGrid) return;
    carGrid.innerHTML = "";

    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const fuel = fuelFilter ? fuelFilter.value : "all";
    const sort = sortSelect ? sortSelect.value : "default";

    let filtered = cars.filter(car => {
        const matchesSearch = !query || (car.name || "").toLowerCase().includes(query);
        const carFuel = (car.fuel || "").toLowerCase();
        const filterFuel = (fuel || "").toLowerCase();
        const matchesFuel = filterFuel === "all" || carFuel === filterFuel;
        const matchesFav = !showFavOnly || favourites.has(car.id);
        return matchesSearch && matchesFuel && matchesFav;
    });

    if (sort === "price-asc") filtered.sort((a,b) => getPricePerDay(a) - getPricePerDay(b));
    else if (sort === "price-desc") filtered.sort((a,b) => getPricePerDay(b) - getPricePerDay(a));
    else if (sort === "seats-desc") filtered.sort((a,b) => b.seats - a.seats);
    else if (sort === "year-desc") filtered.sort((a,b) => b.makeYear - a.makeYear);

    filtered.forEach(car => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-lg-4";
        const isFav = favourites.has(car.id);

        col.innerHTML = `
            <article class="car-card h-100">
                <button type="button" class="fav-btn ${isFav ? "active" : ""}" data-id="${car.id}" title="Toggle favourite">
                    <span>${isFav ? "❤" : "♡"}</span>
                </button>

                <div class="car-badge ${car.badgeClass}">
                    ${car.tag}
                </div>

                <div class="card-header-strip">
                    Make Year ${car.makeYear}
                </div>

                <div class="car-image-wrap">
                    <img src="${car.image}" alt="${car.name}">
                </div>

                <div class="car-info-row">
                    <span>⛽ ${car.fuel}</span>
                    <span>⚙ ${car.transmission}</span>
                    <span>👤 ${car.seats} seats</span>
                </div>

                <div class="car-title">
                    ${car.name}
                </div>

                <div class="price-block">
                    <div class="price-line"><span>24hrs</span><span>${formatRupees(car.prices["24hrs"])}</span></div>
                    <div class="price-line"><span>4 days</span><span>${formatRupees(car.prices["4 days"])}</span></div>
                    <div class="price-line"><span>10 days</span><span>${formatRupees(car.prices["10 days"])}</span></div>
                </div>

                <div class="card-footer-actions d-flex justify-content-between gap-2 p-2">
                    <a href="booking.html?car=${car.id}" class="btn btn-sm btn-outline-secondary w-50">Book</a>
                    <button type="button" class="btn btn-sm btn-primary w-50" data-action="quick-book" data-id="${car.id}">Quick Book</button>
                </div>
            </article>
        `;
        carGrid.appendChild(col);
    });

    updateStats(filtered.length);
}

if (carGrid) {
    renderCars();
    if (searchInput) searchInput.addEventListener("input", renderCars);
    if (fuelFilter) fuelFilter.addEventListener("change", renderCars);
    if (sortSelect) sortSelect.addEventListener("change", renderCars);
    if (favToggle) {
        favToggle.addEventListener("click", () => {
            showFavOnly = !showFavOnly;
            favToggle.classList.toggle("active", showFavOnly);
            renderCars();
        });
    }

    carGrid.addEventListener("click", (event) => {
        const favBtn = event.target.closest(".fav-btn");
        if (favBtn) {
            const id = favBtn.getAttribute("data-id");
            if (favourites.has(id)) favourites.delete(id); else favourites.add(id);
            saveFavourites();
            renderCars();
            return;
        }

        const actionBtn = event.target.closest("[data-action='quick-book']");
        if (actionBtn) {
            const id = actionBtn.getAttribute("data-id");
            const url = new URL("booking.html", window.location.href);
            url.searchParams.set("car", id);
            url.searchParams.set("quick", "1");
            window.location.href = url.toString();
        }
    });
}

/* ==========================
   BOOKING PAGE (booking.html)
   ========================== */

/* ===== Require login before booking begins =====
   If user not logged in, redirect to login.html?next=<currentURL>
   Uses localStorage key "ud_current_user" (defined later in this file)
*/
function ensureLoggedInForBooking() {
    try {
        const raw = localStorage.getItem("ud_current_user");
        if (raw) return true; // already logged in
    } catch {}
    // not logged in -> redirect to login with next param set to current URL
    const next = encodeURIComponent(window.location.href);
    window.location.href = `login.html?next=${next}`;
    return false;
}

// attempt to protect booking page immediately (if booking page present)
try {
    if (document.getElementById("bookingForm") || document.getElementById("bookingCarName")) {
        if (!ensureLoggedInForBooking()) {
            // redirected — stop further execution on this page
            throw "redirected-to-login";
        }
    }
} catch (e) {
    // stop further execution if redirected
}

const bookingCarName = document.getElementById("bookingCarName");
const bookingSummary = document.getElementById("bookingSummary");

if (bookingCarName && bookingSummary) {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("car");
    const selectedCar = cars.find(c => c.id === carId) || cars[0];

    bookingCarName.textContent = selectedCar.name;

    bookingSummary.innerHTML = `
        <div class="d-flex align-items-center gap-3 mb-2">
            <img src="${selectedCar.image}" alt="${selectedCar.name}"
                 style="width:90px;height:60px;object-fit:cover;border-radius:12px;border:1px solid rgba(148,163,184,0.6);">
            <div>
                <div class="small text-secondary">
                    ${selectedCar.makeYear} • ${selectedCar.fuel} • ${selectedCar.transmission}
                </div>
                <div class="fw-semibold">${selectedCar.name}</div>
            </div>
        </div>
        <ul class="small mb-1">
            <li>24hrs: <strong>${formatRupees(selectedCar.prices["24hrs"])}</strong></li>
            <li>4 days: <strong>${formatRupees(selectedCar.prices["4 days"])}</strong></li>
            <li>10 days: <strong>${formatRupees(selectedCar.prices["10 days"])}</strong></li>
        </ul>
        <p class="small text-muted mb-0">Select package in the form and continue to payment.</p>
    `;

    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const formData = new FormData(bookingForm);
            const plan = formData.get("plan") || "24hrs";

            const url = new URL("payment.html", window.location.href);
            url.searchParams.set("car", selectedCar.id);
            url.searchParams.set("plan", plan);

            const fieldsToSend = [
                "pickupDate",
                "dropoffDate",
                "pickupCity",
                "dropoffCity",
                "fullName",
                "email",
                "mobile",
                "notes"
            ];

            fieldsToSend.forEach((name) => {
                const value = formData.get(name);
                if (value) url.searchParams.set(name, value);
            });

            // redirect to payment page with full details
            window.location.href = url.toString();
        });
    }
}

/* ==========================
   PAYMENT PAGE (payment.html)
   ========================== */
const paymentCarName   = document.getElementById("paymentCarName");
const paymentSummary   = document.getElementById("paymentSummary");
const paymentAmountEl  = document.getElementById("paymentAmount");
const payButton        = document.getElementById("payButton");
const paymentMessage   = document.getElementById("paymentConfirmation");

if (paymentCarName && paymentSummary && paymentAmountEl) {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("car");
    const plan  = params.get("plan") || "24hrs";

    const pickupCity  = params.get("pickupCity")  || "Not specified";
    const dropoffCity = params.get("dropoffCity") || "Not specified";
    const pickupDate  = params.get("pickupDate")  || "-";
    const dropoffDate = params.get("dropoffDate") || "-";
    const fullName    = params.get("fullName")    || "Guest";
    const email       = params.get("email")       || "";
    const mobileParam = params.get("mobile")      || "";

    const car = cars.find(c => c.id === carId) || cars[0];
    const amount = car.prices[plan];

    paymentCarName.textContent = car.name;

    paymentSummary.innerHTML = `
        <div class="d-flex align-items-center gap-3 mb-2">
            <img src="${car.image}" alt="${car.name}"
                 style="width:90px;height:60px;object-fit:cover;border-radius:12px;border:1px solid rgba(148,163,184,0.6);">
            <div>
                <div class="small text-secondary">
                    ${car.makeYear} • ${car.fuel} • ${car.transmission}
                </div>
                <div class="fw-semibold">${car.name}</div>
            </div>
        </div>
        <ul class="small mb-1">
            <li>Customer name: <strong>${fullName}</strong></li>
            <li>Route: <strong>${pickupCity} → ${dropoffCity}</strong></li>
            <li>Trip dates: <strong>${pickupDate} to ${dropoffDate}</strong></li>
            <li>Selected package: <strong>${plan}</strong></li>
        </ul>
    `;

    paymentAmountEl.textContent = formatRupees(amount);
}

/* ==========================
   COUPON / PROMO ENGINE
   ========================== */
// (coupon block same as earlier, left unchanged for brevity of logic)
const COUPONS = {
    "FIRST50": {
        code: "FIRST50",
        type: "flat",
        value: 50,
        minAmount: 0,
        maxDiscount: null,
        onePerUser: true,
        expires: "2026-12-31"
    },
    "WEEKEND20": {
        code: "WEEKEND20",
        type: "percent",
        value: 20,
        minAmount: 2000,
        maxDiscount: 1500,
        onePerUser: false,
        expires: "2026-12-31",
        allowedDays: [5,6,0]
    },
    "LONGTRIP10": {
        code: "LONGTRIP10",
        type: "percent",
        value: 10,
        minAmount: 10000,
        maxDiscount: null,
        onePerUser: false,
        expires: "2026-12-31",
        minDays: 4
    },
    "EV200": {
        code: "EV200",
        type: "flat",
        value: 200,
        minAmount: 0,
        maxDiscount: null,
        onePerUser: false,
        expires: "2026-12-31",
        requireFuel: "electric"
    },
    "STUDENT100": {
        code: "STUDENT100",
        type: "flat",
        value: 100,
        minAmount: 0,
        maxDiscount: null,
        onePerUser: true,
        expires: "2026-12-31"
    }
};

const COUPON_USAGE_KEY = "ud_coupon_usage";
function loadCouponUsage() {
    try { return JSON.parse(localStorage.getItem(COUPON_USAGE_KEY)) || {}; } catch { return {}; }
}
function saveCouponUsage(obj) {
    try { localStorage.setItem(COUPON_USAGE_KEY, JSON.stringify(obj)); } catch {}
}
function isExpired(dateStr) {
    if (!dateStr) return false;
    const now = new Date();
    const d = new Date(dateStr + "T23:59:59");
    return now > d;
}

function validateAndApplyCoupon(code, amount, context = {}) {
    if (!code) return { ok:false, message:"Enter a coupon code." };
    const key = code.trim().toUpperCase();
    const c = COUPONS[key];
    if (!c) return { ok:false, message:"Invalid coupon code." };
    if (isExpired(c.expires)) return { ok:false, message:"Coupon expired." };

    if (c.minAmount && amount < c.minAmount) {
        return { ok:false, message:`Minimum order ₹${c.minAmount} required.` };
    }

    if (c.allowedDays && Array.isArray(c.allowedDays)) {
        const today = new Date().getDay();
        if (!c.allowedDays.includes(today)) {
            return { ok:false, message:"This coupon is valid only on weekends." };
        }
    }

    if (c.minDays) {
        const plan = context.plan || "";
        const daysMapping = { "24hrs": 1, "4 days": 4, "10 days": 10 };
        const days = daysMapping[plan] || 0;
        if (days < c.minDays) return { ok:false, message:`Coupon requires minimum ${c.minDays} days booking.` };
    }

    if (c.requireFuel) {
        const car = context.car;
        if (!car || !car.fuel || car.fuel.toLowerCase() !== c.requireFuel.toLowerCase()) {
            return { ok:false, message:"Coupon valid for EV cars only." };
        }
    }

    if (c.onePerUser) {
        const usage = loadCouponUsage();
        const userKey = (context.user && (context.user.email || context.user.mobile)) || "guest";
        if (usage[userKey] && usage[userKey][key]) {
            return { ok:false, message:"You have already used this coupon." };
        }
    }

    let discount = 0;
    if (c.type === "flat") discount = c.value;
    else if (c.type === "percent") discount = Math.round((c.value/100) * amount);

    if (c.maxDiscount) discount = Math.min(discount, c.maxDiscount);
    discount = Math.min(discount, amount);

    return { ok:true, message:"Coupon applied.", discountAmount: discount, couponObj: c };
}

function markCouponUsed(code, user) {
    try {
        if (!code) return;
        const key = code.trim().toUpperCase();
        const usage = loadCouponUsage();
        const userKey = (user && (user.email || user.mobile)) || "guest";
        usage[userKey] = usage[userKey] || {};
        usage[userKey][key] = true;
        saveCouponUsage(usage);
    } catch {}
}

/* UI hookup for coupon on payment page */
function initCouponUI() {
    const couponInput = document.getElementById("couponCode");
    const applyBtn = document.getElementById("applyCouponBtn");
    const messageEl = document.getElementById("couponMessage");
    const discountEl = document.getElementById("paymentDiscount");
    const finalEl = document.getElementById("paymentFinalAmount");

    if (!couponInput || !applyBtn || !messageEl || !discountEl || !finalEl) return;

    const baseAmountEl = document.getElementById("paymentAmount");
    let baseAmount = 0;
    if (baseAmountEl) {
        const raw = baseAmountEl.textContent || baseAmountEl.innerText || "";
        baseAmount = parseInt((raw.replace(/[^0-9]/g, "")) || "0", 10);
    }

    // applied coupon stored in session for this flow
    let applied = { code: null, discount: 0 };

    applyBtn.addEventListener("click", () => {
        const code = couponInput.value.trim();
        const params = new URLSearchParams(window.location.search);
        const carId = params.get("car");
        const plan  = params.get("plan") || "24hrs";
        const car = cars.find(c => c.id === carId) || null;
        let rawUser = null;
        try { rawUser = JSON.parse(localStorage.getItem("ud_current_user")); } catch { rawUser = null; }

        const res = validateAndApplyCoupon(code, baseAmount, { user: rawUser, plan, car });
        if (!res.ok) {
            messageEl.textContent = res.message;
            messageEl.className = "small text-danger";
            applied = { code: null, discount: 0 };
            discountEl.textContent = "₹ 0";
            finalEl.textContent = formatRupees(baseAmount);
            try { sessionStorage.removeItem("ud_applied_coupon"); } catch {}
            return;
        }

        applied = { code: code.toUpperCase(), discount: res.discountAmount || 0 };
        messageEl.textContent = `${res.message} You saved ₹ ${applied.discount}.`;
        messageEl.className = "small text-success";

        discountEl.textContent = formatRupees(applied.discount);
        finalEl.textContent = formatRupees(baseAmount - applied.discount);

        try { sessionStorage.setItem("ud_applied_coupon", JSON.stringify(applied)); } catch {}
    });

    // show base values on load
    discountEl.textContent = "₹ 0";
    finalEl.textContent = formatRupees(baseAmount);
}

/* enhance pay button — coupon-aware redirect to confirm */
(function enhancePayButton() {
    const payBtn = document.getElementById("payButton");
    if (!payBtn) return;

    // remove existing listeners by cloning (to avoid duplicate redirects if any)
    const newPayBtn = payBtn.cloneNode(true);
    payBtn.parentNode.replaceChild(newPayBtn, payBtn);

    newPayBtn.addEventListener("click", (e) => {
        // gather params (same as earlier)
        const params = new URLSearchParams(window.location.search);
        const carId = params.get("car");
        const plan  = params.get("plan") || "24hrs";
        const pickupCity  = params.get("pickupCity")  || "Not specified";
        const dropoffCity = params.get("dropoffCity") || "Not specified";
        const pickupDate  = params.get("pickupDate")  || "-";
        const dropoffDate = params.get("dropoffDate") || "-";
        const fullName    = params.get("fullName")    || "Guest";

        const car = (carId && cars.find(c => c.id === carId)) || cars[0];

        // base amount from page if present
        let baseAmount = (car && car.prices && car.prices[plan]) ? car.prices[plan] : 0;
        const baseAmountEl = document.getElementById("paymentAmount");
        if (baseAmountEl) {
            const raw = baseAmountEl.textContent || baseAmountEl.innerText || "";
            const parsed = parseInt((raw.replace(/[^0-9]/g, "")) || baseAmount, 10);
            if (!Number.isNaN(parsed)) baseAmount = parsed;
        }

        // applied coupon from session
        let applied = null;
        try { applied = JSON.parse(sessionStorage.getItem("ud_applied_coupon") || "null"); } catch { applied = null; }
        const discount = applied && applied.discount ? Number(applied.discount) : 0;
        const finalAmount = Math.max(0, baseAmount - discount);

        const url = new URL("confirm.html", window.location.href);
        url.searchParams.set("car", car.id);
        url.searchParams.set("plan", plan);
        url.searchParams.set("pickupCity", pickupCity);
        url.searchParams.set("dropoffCity", dropoffCity);
        url.searchParams.set("pickupDate", pickupDate);
        url.searchParams.set("dropoffDate", dropoffDate);
        url.searchParams.set("fullName", fullName);
        url.searchParams.set("amount", finalAmount);
        if (applied && applied.code) {
            url.searchParams.set("coupon", applied.code);
            url.searchParams.set("discount", discount);
        }

        // redirect to confirmation
        window.location.href = url.toString();
    });
})();

// initialize coupon UI on DOM ready (if payment page)
try {
    initCouponUI();
} catch (e) { /* ignore if not on payment page */ }

/* ==========================
   CONFIRMATION PAGE (confirm.html)
   ========================== */
const confirmCarNameEl = document.getElementById("confirmCarName");
const confirmAmountEl  = document.getElementById("confirmAmount");
const confirmDetailsEl = document.getElementById("confirmDetails");

if (confirmCarNameEl && confirmAmountEl && confirmDetailsEl) {
    const params = new URLSearchParams(window.location.search);
    const carId = params.get("car");
    const plan  = params.get("plan") || "24hrs";

    const pickupCity  = params.get("pickupCity")  || "Not specified";
    const dropoffCity = params.get("dropoffCity") || "Not specified";
    const pickupDate  = params.get("pickupDate")  || "-";
    const dropoffDate = params.get("dropoffDate") || "-";
    const fullName    = params.get("fullName")    || "Guest";

    const car = cars.find(c => c.id === carId) || cars[0];

    let amount = parseInt(params.get("amount"), 10);
    if (Number.isNaN(amount)) amount = car.prices[plan];

    // generate booking id and save booking
    function generateBookingID() {
        const t = Date.now().toString(36);
        const r = Math.random().toString(36).slice(2,7).toUpperCase();
        return `UD-${t}-${r}`;
    }
    const bookingId = params.get("bookingId") || generateBookingID();

    confirmCarNameEl.textContent = `${car.name} — Booking #${bookingId}`;
    confirmAmountEl.textContent = formatRupees(amount);

    const couponCode = params.get("coupon");
    const discount = Number(params.get("discount")) || 0;

    let html = `
        <ul class="list-unstyled mb-0">
            <li>Customer: <strong>${fullName}</strong></li>
            <li>Route: <strong>${pickupCity} → ${dropoffCity}</strong></li>
            <li>Trip dates: <strong>${pickupDate} to ${dropoffDate}</strong></li>
            <li>Package: <strong>${plan}</strong></li>
            <li>Total amount: <strong>${formatRupees(amount)}</strong></li>
        </ul>
    `;

    if (couponCode) {
        html += `<div class="mt-3 small text-success">Coupon <strong>${couponCode}</strong> applied. Discount: <strong>${formatRupees(discount)}</strong></div>`;
    }

    confirmDetailsEl.innerHTML = html;

    // save booking history
    (function saveBookingRecord() {
        try {
            const rec = {
                id: bookingId,
                car: car.id,
                carName: car.name,
                fullName,
                pickupCity,
                dropoffCity,
                pickupDate,
                dropoffDate,
                amount,
                coupon: couponCode || null,
                discount,
                createdAt: new Date().toISOString()
            };
            const arr = JSON.parse(localStorage.getItem("ud_bookings") || "[]");
            arr.unshift(rec);
            localStorage.setItem("ud_bookings", JSON.stringify(arr.slice(0,50)));
        } catch (e) { /* ignore */ }
    })();

    // mark coupon used for one-per-user coupons
    if (couponCode) {
        try {
            const currentUser = JSON.parse(localStorage.getItem("ud_current_user") || "null");
            markCouponUsed(couponCode, currentUser);
        } catch (e) { /* ignore */ }
    }
}

/* ==========================
   AUTH (Login & Signup using LocalStorage)
   ========================== */
const USERS_KEY = "ud_users";
const CURRENT_USER_KEY = "ud_current_user";

function getUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}
function saveUsers(users) { try { localStorage.setItem(USERS_KEY, JSON.stringify(users)); } catch {} }

const authLink = document.getElementById("authLink");

function refreshAuthUI() {
    if (!authLink) return;
    const rawUser = localStorage.getItem(CURRENT_USER_KEY);
    if (!rawUser) {
        authLink.textContent = "Login / Signup";
        authLink.href = "login.html";
        authLink.onclick = null;
    } else {
        let user;
        try { user = JSON.parse(rawUser); } catch { user = null; }
        const firstName = user && user.fullName ? user.fullName.split(" ")[0] : "User";
        authLink.textContent = `Hi, ${firstName} (Logout)`;
        authLink.href = "#";
        authLink.onclick = (e) => {
            e.preventDefault();
            if (confirm("Do you want to logout?")) {
                localStorage.removeItem(CURRENT_USER_KEY);
                refreshAuthUI();
            }
        };
    }
}
refreshAuthUI();

/* SIGNUP */
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(signupForm);
        const fullName = (fd.get("fullName") || "").trim();
        const email = ((fd.get("email") || "").trim()).toLowerCase();
        const mobile = (fd.get("mobile") || "").trim();
        const password = fd.get("password") || "";
        const confirmPassword = fd.get("confirmPassword") || "";

        if (!fullName || !email || !password) {
            signupMessage.textContent = "Please fill required fields.";
            signupMessage.className = "small text-danger";
            return;
        }
        if (password !== confirmPassword) {
            signupMessage.textContent = "Passwords do not match.";
            signupMessage.className = "small text-danger";
            return;
        }
        const users = getUsers();
        if (users.some(u => u.email === email)) {
            signupMessage.textContent = "An account with this email already exists.";
            signupMessage.className = "small text-danger";
            return;
        }

        const newUser = { fullName, email, mobile, password };
        users.push(newUser);
        saveUsers(users);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));

        signupMessage.textContent = "Account created! Redirecting…";
        signupMessage.className = "small text-success";
        setTimeout(()=> window.location.href="index.html", 700);
    });
}


/* LOGIN */
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

(function showLoginNextNote(){
    const noteEl = document.getElementById("loginNextNote");
    if (!noteEl) return;
    const params = new URLSearchParams(window.location.search);
    const next = params.get("next");
    if (next) {
        noteEl.textContent = "You must login before proceeding to booking/payment.";
        noteEl.classList.remove("d-none");
    } else noteEl.classList.add("d-none");
})();

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(loginForm);
        const email = ((fd.get("email") || "").trim()).toLowerCase();
        const password = fd.get("password") || "";

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            loginMessage.textContent = "Invalid email or password.";
            loginMessage.className = "small text-danger";
            return;
        }

        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
        loginMessage.textContent = "Login successful! Redirecting…";
        loginMessage.className = "small text-success";

        // redirect to `next` if provided, otherwise index.html
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next");
        setTimeout(()=> {
            if (next) {
                try { window.location.href = decodeURIComponent(next); return; } catch(e) {}
            }
            window.location.href = "index.html";
        }, 600);
    });
}

/* ==========================
   OTP LOGIN SYSTEM (Demo)
   ========================== */
const mobileForm = document.getElementById("mobileForm");
const stepMobile = document.getElementById("stepMobile");
const stepOtp = document.getElementById("stepOtp");
const mobileMessage = document.getElementById("mobileMessage");
const otpForm = document.getElementById("otpForm");
const otpMessage = document.getElementById("otpMessage");

let generatedOTP = "";
let loginMobile = "";

if (mobileForm) {
    mobileForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const fd = new FormData(mobileForm);
        const mobile = (fd.get("mobile") || "").trim();
        if (mobile.length !== 10) {
            if (mobileMessage) { mobileMessage.textContent = "Enter a valid 10-digit mobile number."; mobileMessage.classList.remove("d-none"); }
            return;
        }
        if (mobileMessage) mobileMessage.classList.add("d-none");
        generatedOTP = Math.floor(1000 + Math.random()*9000).toString();
        loginMobile = mobile;
        console.log("Generated OTP:", generatedOTP);
        if (stepMobile) stepMobile.classList.add("d-none");
        if (stepOtp) stepOtp.classList.remove("d-none");
    });
}

if (otpForm) {
    otpForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const boxes = document.querySelectorAll(".otp-box");
        const entered = Array.from(boxes).map(b => b.value).join("");
        if (entered !== generatedOTP) {
            if (otpMessage) { otpMessage.textContent = "Incorrect OTP."; otpMessage.classList.remove("d-none"); }
            return;
        }
        if (otpMessage) otpMessage.classList.add("d-none");
        const userObj = { fullName: "User", email: "", mobile: loginMobile };
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userObj));

        // redirect to next if exists
        const params = new URLSearchParams(window.location.search);
        const next = params.get("next");
        setTimeout(()=> {
            if (next) {
                try { window.location.href = decodeURIComponent(next); return; } catch(e) {}
            }
            window.location.href = "index.html";
        }, 400);
    });
}

/* ==========================
   OFFLINE CITY AUTOCOMPLETE + DISTANCE/TIME/Fare Estimator (IMPROVED)
   (This block provides pickup/drop suggestions and uses haversine)
   ========================== */

// small offline city DB (expandable)
const CITY_DB = [
  // --- Ahmednagar ---
  { name: "Ahmednagar", lat: 19.0948, lng: 74.7480 },
  { name: "Ahmednagar (Taluka)", lat: 19.0948, lng: 74.7480 },
  { name: "Sangamner", lat: 19.0948, lng: 74.7480 },
  { name: "Rahuri", lat: 19.0948, lng: 74.7480 },
  { name: "Shrirampur", lat: 19.0948, lng: 74.7480 },
  { name: "Kopargaon", lat: 19.0948, lng: 74.7480 },
  { name: "Nagar", lat: 19.0948, lng: 74.7480 },
  { name: "Shevgaon", lat: 19.0948, lng: 74.7480 },
  { name: "Pathardi", lat: 19.0948, lng: 74.7480 },
  { name: "Nevasa", lat: 19.0948, lng: 74.7480 },
  { name: "Parner", lat: 19.0948, lng: 74.7480 },
  { name: "Akole", lat: 19.0948, lng: 74.7480 },
  { name: "Rahata", lat: 19.0948, lng: 74.7480 },

  // --- Akola ---
  { name: "Akola", lat: 20.7096, lng: 76.9994 },
  { name: "Balapur", lat: 20.7096, lng: 76.9994 },
  { name: "Murtijapur", lat: 20.7096, lng: 76.9994 },
  { name: "Akot", lat: 20.7096, lng: 76.9994 },
  { name: "Telhara", lat: 20.7096, lng: 76.9994 },
  { name: "Patur", lat: 20.7096, lng: 76.9994 },

  // --- Amravati ---
  { name: "Amravati", lat: 20.9374, lng: 77.7796 },
  { name: "Achalpur", lat: 20.9374, lng: 77.7796 },
  { name: "Chandur Bazar", lat: 20.9374, lng: 77.7796 },
  { name: "Chandur Railway", lat: 20.9374, lng: 77.7796 },
  { name: "Daryapur", lat: 20.9374, lng: 77.7796 },
  { name: "Dhamangaon Railway", lat: 20.9374, lng: 77.7796 },
  { name: "Morshi", lat: 20.9374, lng: 77.7796 },
  { name: "Warud", lat: 20.9374, lng: 77.7796 },
  { name: "Anjangaon Surji", lat: 20.9374, lng: 77.7796 },
  { name: "Bhatkuli", lat: 20.9374, lng: 77.7796 },
  { name: "Nandgaon Khandeshwar", lat: 20.9374, lng: 77.7796 },

  // --- Aurangabad ---
  { name: " Cha Sambhaji Nagar", lat: 19.8762, lng: 75.3433 },
  { name: "Gangapur", lat: 19.8762, lng: 75.3433 },
  { name: "Kannad", lat: 19.8762, lng: 75.3433 },
  { name: "Khuldabad", lat: 19.8762, lng: 75.3433 },
  { name: "Paithan", lat: 19.8762, lng: 75.3433 },
  { name: "Phulambri", lat: 19.8762, lng: 75.3433 },
  { name: "Sillod", lat: 19.8762, lng: 75.3433 },
  { name: "Vaijapur", lat: 19.8762, lng: 75.3433 },

  // --- Beed ---
  { name: "Beed", lat: 18.9891, lng: 75.7601 },
  { name: "Ambejogai", lat: 18.9891, lng: 75.7601 },
  { name: "Ashti", lat: 18.9891, lng: 75.7601 },
  { name: "Dharur", lat: 18.9891, lng: 75.7601 },
  { name: "Georai", lat: 18.9891, lng: 75.7601 },
  { name: "Kaij", lat: 18.9891, lng: 75.7601 },
  { name: "Majalgaon", lat: 18.9891, lng: 75.7601 },
  { name: "Parli", lat: 18.9891, lng: 75.7601 },
  { name: "Patoda", lat: 18.9891, lng: 75.7601 },
  { name: "Shirur Kasar", lat: 18.9891, lng: 75.7601 },
  { name: "Wadwani", lat: 18.9891, lng: 75.7601 },

  // --- Bhandara ---
  { name: "Bhandara", lat: 21.1682, lng: 79.6480 },
  { name: "Tumsar", lat: 21.1682, lng: 79.6480 },
  { name: "Pauni", lat: 21.1682, lng: 79.6480 },
  { name: "Mohadi", lat: 21.1682, lng: 79.6480 },
  { name: "Sakoli", lat: 21.1682, lng: 79.6480 },
  { name: "Lakhani", lat: 21.1682, lng: 79.6480 },
  { name: "Lakhandur", lat: 21.1682, lng: 79.6480 },

  // --- Buldhana ---
  { name: "Buldhana", lat: 20.5296, lng: 76.1842 },
  { name: "Chikhli", lat: 20.5296, lng: 76.1842 },
  { name: "Deulgaon Raja", lat: 20.5296, lng: 76.1842 },
  { name: "Jalgaon Jamod", lat: 20.5296, lng: 76.1842 },
  { name: "Khamgaon", lat: 20.5296, lng: 76.1842 },
  { name: "Lonar", lat: 20.5296, lng: 76.1842 },
  { name: "Mehkar", lat: 20.5296, lng: 76.1842 },
  { name: "Malkapur", lat: 20.5296, lng: 76.1842 },
  { name: "Shegaon", lat: 20.5296, lng: 76.1842 },
  { name: "Sindkhed Raja", lat: 20.5296, lng: 76.1842 },

  // --- Chandrapur ---
  { name: "Chandrapur", lat: 19.9615, lng: 79.2961 },
  { name: "Ballarpur", lat: 19.9615, lng: 79.2961 },
  { name: "Bhadravati", lat: 19.9615, lng: 79.2961 },
  { name: "Brahmapuri", lat: 19.9615, lng: 79.2961 },
  { name: "Nagbhid", lat: 19.9615, lng: 79.2961 },
  { name: "Sindewahi", lat: 19.9615, lng: 79.2961 },
  { name: "Saoli", lat: 19.9615, lng: 79.2961 },
  { name: "Mul", lat: 19.9615, lng: 79.2961 },
  { name: "Pombhurna", lat: 19.9615, lng: 79.2961 },
  { name: "Korpana", lat: 19.9615, lng: 79.2961 },
  { name: "Jiwati", lat: 19.9615, lng: 79.2961 },

  // --- Dhule ---
  { name: "Dhule", lat: 20.9042, lng: 74.7749 },
  { name: "Sakri", lat: 20.9042, lng: 74.7749 },
  { name: "Shirpur", lat: 20.9042, lng: 74.7749 },
  { name: "Shindkheda", lat: 20.9042, lng: 74.7749 },

  // --- Gadchiroli ---
  { name: "Gadchiroli", lat: 19.9641, lng: 80.1983 },
  { name: "Aheri", lat: 19.9641, lng: 80.1983 },
  { name: "Armori", lat: 19.9641, lng: 80.1983 },
  { name: "Chamorshi", lat: 19.9641, lng: 80.1983 },
  { name: "Desaiganj (Wadsa)", lat: 19.9641, lng: 80.1983 },
  { name: "Dhanora", lat: 19.9641, lng: 80.1983 },
  { name: "Etapalli", lat: 19.9641, lng: 80.1983 },
  { name: "Kurkheda", lat: 19.9641, lng: 80.1983 },
  { name: "Korchi", lat: 19.9641, lng: 80.1983 },
  { name: "Sironcha", lat: 19.9641, lng: 80.1983 },

  // --- Gondia ---
  { name: "Gondia", lat: 21.4624, lng: 80.2209 },
  { name: "Tirora", lat: 21.4624, lng: 80.2209 },
  { name: "Goregaon", lat: 21.4624, lng: 80.2209 },
  { name: "Amgaon", lat: 21.4624, lng: 80.2209 },
  { name: "Salekasa", lat: 21.4624, lng: 80.2209 },
  { name: "Arjuni Morgaon", lat: 21.4624, lng: 80.2209 },
  { name: "Deori", lat: 21.4624, lng: 80.2209 },

  // --- Hingoli ---
  { name: "Hingoli", lat: 19.7190, lng: 77.1424 },
  { name: "Sengaon", lat: 19.7190, lng: 77.1424 },
  { name: "Kalamnuri", lat: 19.7190, lng: 77.1424 },
  { name: "Aundha Nagnath", lat: 19.7190, lng: 77.1424 },
  { name: "Basmath", lat: 19.7190, lng: 77.1424 },

  // --- Jalgaon ---
  { name: "Jalgaon", lat: 21.0077, lng: 75.5626 },
  { name: "Bhusawal", lat: 21.0077, lng: 75.5626 },
  { name: "Pachora", lat: 21.0077, lng: 75.5626 },
  { name: "Dharangaon", lat: 21.0077, lng: 75.5626 },
  { name: "Chalisgaon", lat: 21.0077, lng: 75.5626 },
  { name: "Amalner", lat: 21.0077, lng: 75.5626 },
  { name: "Bodwad", lat: 21.0077, lng: 75.5626 },
  { name: "Yawal", lat: 21.0077, lng: 75.5626 },
  { name: "Erandol", lat: 21.0077, lng: 75.5626 },
  { name: "Jamalpur", lat: 21.0077, lng: 75.5626 },
  { name: "Raver", lat: 21.0077, lng: 75.5626 },
  { name: "Chopda", lat: 21.0077, lng: 75.5626 },
  { name: "Shirpur (Jalgaon)", lat: 21.0077, lng: 75.5626 },

  // --- Jalna ---
  { name: "Jalna", lat: 19.8297, lng: 75.8800 },
  { name: "Ambad", lat: 19.8297, lng: 75.8800 },
  { name: "Bhokardan", lat: 19.8297, lng: 75.8800 },
  { name: "Badnapur", lat: 19.8297, lng: 75.8800 },
  { name: "Partur", lat: 19.8297, lng: 75.8800 },
  { name: "Ghansawangi", lat: 19.8297, lng: 75.8800 },
  { name: "Mantha", lat: 19.8297, lng: 75.8800 },

  // --- Kolhapur ---
  { name: "Kolhapur", lat: 16.7050, lng: 74.2433 },
  { name: "Karveer", lat: 16.7050, lng: 74.2433 },
  { name: "Shirol", lat: 16.7050, lng: 74.2433 },
  { name: "Hatkanangale", lat: 16.7050, lng: 74.2433 },
  { name: "Panhala", lat: 16.7050, lng: 74.2433 },
  { name: "Shahuwadi", lat: 16.7050, lng: 74.2433 },
  { name: "Gaganbavda", lat: 16.7050, lng: 74.2433 },
  { name: "Radhanagari", lat: 16.7050, lng: 74.2433 },
  { name: "Kagal", lat: 16.7050, lng: 74.2433 },
  { name: "Bhudargad", lat: 16.7050, lng: 74.2433 },
  { name: "Ajra", lat: 16.7050, lng: 74.2433 },
  { name: "Chandgad", lat: 16.7050, lng: 74.2433 },

  // --- Latur ---
  { name: "Latur", lat: 18.4088, lng: 76.5604 },
  { name: "Ausa", lat: 18.4088, lng: 76.5604 },
  { name: "Nilanga", lat: 18.4088, lng: 76.5604 },
  { name: "Udgir", lat: 18.4088, lng: 76.5604 },
  { name: "Chakur", lat: 18.4088, lng: 76.5604 },
  { name: "Deoni", lat: 18.4088, lng: 76.5604 },
  { name: "Renapur", lat: 18.4088, lng: 76.5604 },
  { name: "Shirur Anantpal", lat: 18.4088, lng: 76.5604 },
  { name: "Jalkot", lat: 18.4088, lng: 76.5604 },

  // --- Mumbai City ---
  { name: "Mumbai City", lat: 18.9388, lng: 72.8354 },

  // --- Mumbai Suburban ---
  { name: "Mumbai Suburban", lat: 19.1197, lng: 72.8468 },
  { name: "Borivali", lat: 19.1197, lng: 72.8468 },
  { name: "Andheri", lat: 19.1197, lng: 72.8468 },
  { name: "Kurla", lat: 19.1197, lng: 72.8468 },

  // --- Nagpur ---
  { name: "Nagpur", lat: 21.1458, lng: 79.0882 },
  { name: "Kamptee", lat: 21.1458, lng: 79.0882 },
  { name: "Hingna", lat: 21.1458, lng: 79.0882 },
  { name: "Umred", lat: 21.1458, lng: 79.0882 },
  { name: "Kalmeshwar", lat: 21.1458, lng: 79.0882 },
  { name: "Katol", lat: 21.1458, lng: 79.0882 },
  { name: "Narkhed", lat: 21.1458, lng: 79.0882 },
  { name: "Savner", lat: 21.1458, lng: 79.0882 },
  { name: "Parseoni", lat: 21.1458, lng: 79.0882 },
  { name: "Mauda", lat: 21.1458, lng: 79.0882 },
  { name: "Ramtek", lat: 21.1458, lng: 79.0882 },
  { name: "Bhiwapur", lat: 21.1458, lng: 79.0882 },

  // --- Nanded ---
  { name: "Nanded", lat: 19.1383, lng: 77.3210 },
  { name: "Mukhed", lat: 19.1383, lng: 77.3210 },
  { name: "Deglur", lat: 19.1383, lng: 77.3210 },
  { name: "Kandhar", lat: 19.1383, lng: 77.3210 },
  { name: "Naigaon", lat: 19.1383, lng: 77.3210 },
  { name: "Umri", lat: 19.1383, lng: 77.3210 },
  { name: "Hadgaon", lat: 19.1383, lng: 77.3210 },
  { name: "Biloli", lat: 19.1383, lng: 77.3210 },
  { name: "Kinwat", lat: 19.1383, lng: 77.3210 },
  { name: "Ardhapur", lat: 19.1383, lng: 77.3210 },
  { name: "Bhokar", lat: 19.1383, lng: 77.3210 },

  // --- Nandurbar ---
  { name: "Nandurbar", lat: 21.3662, lng: 74.2405 },
  { name: "Shahada", lat: 21.3662, lng: 74.2405 },
  { name: "Taloda", lat: 21.3662, lng: 74.2405 },
  { name: "Akkalkuwa", lat: 21.3662, lng: 74.2405 },
  { name: "Dhadgaon", lat: 21.3662, lng: 74.2405 },
  { name: "Navapur", lat: 21.3662, lng: 74.2405 },

  // --- Nashik ---
  { name: "Nashik", lat: 19.9975, lng: 73.7898 },
  { name: "Malegaon", lat: 19.9975, lng: 73.7898 },
  { name: "Nandgaon", lat: 19.9975, lng: 73.7898 },
  { name: "Sinnar", lat: 19.9975, lng: 73.7898 },
  { name: "Chandvad", lat: 19.9975, lng: 73.7898 },
  { name: "Igatpuri", lat: 19.9975, lng: 73.7898 },
  { name: "Yeola", lat: 19.9975, lng: 73.7898 },
  { name: "Dindori", lat: 19.9975, lng: 73.7898 },
  { name: "Kalwan", lat: 19.9975, lng: 73.7898 },
  { name: "Peth", lat: 19.9975, lng: 73.7898 },
  { name: "Surgana", lat: 19.9975, lng: 73.7898 },
  { name: "Baglan", lat: 19.9975, lng: 73.7898 },
  { name: "Trimbak", lat: 19.9975, lng: 73.7898 },

  // --- Osmanabad ---
  { name: "Osmanabad", lat: 18.1863, lng: 76.0419 },
  { name: "Tuljapur", lat: 18.1863, lng: 76.0419 },
  { name: "Bhoom", lat: 18.1863, lng: 76.0419 },
  { name: "Kalamb", lat: 18.1863, lng: 76.0419 },
  { name: "Lohara", lat: 18.1863, lng: 76.0419 },
  { name: "Paranda", lat: 18.1863, lng: 76.0419 },
  { name: "Umarga", lat: 18.1863, lng: 76.0419 },
  { name: "Washi", lat: 18.1863, lng: 76.0419 },

  // --- Palghar ---
  { name: "Palghar", lat: 19.6964, lng: 72.7690 },
  { name: "Vasai", lat: 19.6964, lng: 72.7690 },
  { name: "Dahanu", lat: 19.6964, lng: 72.7690 },
  { name: "Talasari", lat: 19.6964, lng: 72.7690 },
  { name: "Jawhar", lat: 19.6964, lng: 72.7690 },
  { name: "Mokhada", lat: 19.6964, lng: 72.7690 },
  { name: "Vada", lat: 19.6964, lng: 72.7690 },
  { name: "Wada", lat: 19.6964, lng: 72.7690 },

  // --- Parbhani ---
  { name: "Parbhani", lat: 19.2700, lng: 76.7600 },
  { name: "Gangakhed", lat: 19.2700, lng: 76.7600 },
  { name: "Jintur", lat: 19.2700, lng: 76.7600 },
  { name: "Selu", lat: 19.2700, lng: 76.7600 },
  { name: "Manwat", lat: 19.2700, lng: 76.7600 },
  { name: "Pathri", lat: 19.2700, lng: 76.7600 },
  { name: "Sonpeth", lat: 19.2700, lng: 76.7600 },
  { name: "Purna", lat: 19.2700, lng: 76.7600 },

  // --- Pune ---
  { name: "Pune", lat: 18.5204, lng: 73.8567 },
  { name: "Pune City", lat: 18.5204, lng: 73.8567 },
  { name: "Haveli", lat: 18.5204, lng: 73.8567 },
  { name: "Bhor", lat: 18.5204, lng: 73.8567 },
  { name: "Baramati", lat: 18.5204, lng: 73.8567 },
  { name: "Indapur", lat: 18.5204, lng: 73.8567 },
  { name: "Junnar", lat: 18.5204, lng: 73.8567 },
  { name: "Shirur", lat: 18.5204, lng: 73.8567 },
  { name: "Ambegaon", lat: 18.5204, lng: 73.8567 },
  { name: "Khed", lat: 18.5204, lng: 73.8567 },
  { name: "Mawal", lat: 18.5204, lng: 73.8567 },
  { name: "Mulshi", lat: 18.5204, lng: 73.8567 },
  { name: "Daund", lat: 18.5204, lng: 73.8567 },
  { name: "Purandar", lat: 18.5204, lng: 73.8567 },
  { name: "Velhe", lat: 18.5204, lng: 73.8567 },

  // --- Raigad ---
  { name: "Raigad", lat: 18.5200, lng: 73.1000 },
  { name: "Alibag", lat: 18.5200, lng: 73.1000 },
  { name: "Panvel", lat: 18.5200, lng: 73.1000 },
  { name: "Pen", lat: 18.5200, lng: 73.1000 },
  { name: "Uran", lat: 18.5200, lng: 73.1000 },
  { name: "Karjat", lat: 18.5200, lng: 73.1000 },
  { name: "Khalapur", lat: 18.5200, lng: 73.1000 },
  { name: "Mangaon", lat: 18.5200, lng: 73.1000 },
  { name: "Mahad", lat: 18.5200, lng: 73.1000 },
  { name: "Poladpur", lat: 18.5200, lng: 73.1000 },
  { name: "Shrivardhan", lat: 18.5200, lng: 73.1000 },
  { name: "Mhasla", lat: 18.5200, lng: 73.1000 },
  { name: "Sudhagad Pali", lat: 18.5200, lng: 73.1000 },
  { name: "Roha", lat: 18.5200, lng: 73.1000 },
  { name: "Tala", lat: 18.5200, lng: 73.1000 },

  // --- Ratnagiri ---
  { name: "Ratnagiri", lat: 16.9902, lng: 73.3120 },
  { name: "Chiplun", lat: 16.9902, lng: 73.3120 },
  { name: "Guhagar", lat: 16.9902, lng: 73.3120 },
  { name: "Rajapur", lat: 16.9902, lng: 73.3120 },
  { name: "Sangameshwar", lat: 16.9902, lng: 73.3120 },
  { name: "Dapoli", lat: 16.9902, lng: 73.3120 },
  { name: "Lanja", lat: 16.9902, lng: 73.3120 },
  { name: "Mandangad", lat: 16.9902, lng: 73.3120 },
  { name: "Khed (Ratnagiri)", lat: 16.9902, lng: 73.3120 },

  // --- Sangli ---
  { name: "Sangli", lat: 16.8544, lng: 74.5642 },
  { name: "Miraj", lat: 16.8544, lng: 74.5642 },
  { name: "Tasgaon", lat: 16.8544, lng: 74.5642 },
  { name: "Kavathe Mahankal", lat: 16.8544, lng: 74.5642 },
  { name: "Jat", lat: 16.8544, lng: 74.5642 },
  { name: "Palus", lat: 16.8544, lng: 74.5642 },
  { name: "Khanapur (Vita)", lat: 16.8544, lng: 74.5642 },
  { name: "Walwa", lat: 16.8544, lng: 74.5642 },
  { name: "Shirala", lat: 16.8544, lng: 74.5642 },

  // --- Satara ---
  { name: "Satara", lat: 17.6887, lng: 73.9939 },
  { name: "Karad", lat: 17.6887, lng: 73.9939 },
  { name: "Phaltan", lat: 17.6887, lng: 73.9939 },
  { name: "Khatav", lat: 17.6887, lng: 73.9939 },
  { name: "Koregaon", lat: 17.6887, lng: 73.9939 },
  { name: "Patan", lat: 17.6887, lng: 73.9939 },
  { name: "Man", lat: 17.6887, lng: 73.9939 },
  { name: "Mahabaleshwar", lat: 17.6887, lng: 73.9939 },
  { name: "Wai", lat: 17.6887, lng: 73.9939 },

  // --- Sindhudurg ---
  { name: "Sindhudurg", lat: 16.3492, lng: 73.5594 },
  { name: "Kudal", lat: 16.3492, lng: 73.5594 },
  { name: "Sawantwadi", lat: 16.3492, lng: 73.5594 },
  { name: "Vengurla", lat: 16.3492, lng: 73.5594 },
  { name: "Malvan", lat: 16.3492, lng: 73.5594 },
  { name: "Devgad", lat: 16.3492, lng: 73.5594 },
  { name: "Kankavli", lat: 16.3492, lng: 73.5594 },
  { name: "Dodamarg", lat: 16.3492, lng: 73.5594 },

  // --- Solapur ---
  { name: "Solapur", lat: 17.6599, lng: 75.9064 },
  { name: "Solapur North", lat: 17.6599, lng: 75.9064 },
  { name: "Solapur South", lat: 17.6599, lng: 75.9064 },
  { name: "Pandharpur", lat: 17.6599, lng: 75.9064 },
  { name: "Barshi", lat: 17.6599, lng: 75.9064 },
  { name: "Akkalkot", lat: 17.6599, lng: 75.9064 },
  { name: "Karmala", lat: 17.6599, lng: 75.9064 },
  { name: "Sangola", lat: 17.6599, lng: 75.9064 },
  { name: "Mohol", lat: 17.6599, lng: 75.9064 },
  { name: "Malshiras", lat: 17.6599, lng: 75.9064 },
  { name: "Mangalwedha", lat: 17.6599, lng: 75.9064 },
  { name: "Madha", lat: 17.6599, lng: 75.9064 },

  // --- Thane ---
  { name: "Thane", lat: 19.2183, lng: 72.9781 },
  { name: "Kalyan", lat: 19.2183, lng: 72.9781 },
  { name: "Ulhasnagar", lat: 19.2183, lng: 72.9781 },
  { name: "Ambarnath", lat: 19.2183, lng: 72.9781 },
  { name: "Bhiwandi", lat: 19.2183, lng: 72.9781 },
  { name: "Shahapur", lat: 19.2183, lng: 72.9781 },
  { name: "Murbad", lat: 19.2183, lng: 72.9781 },

  // --- Wardha ---
  { name: "Wardha", lat: 20.7453, lng: 78.6022 },
  { name: "Hinganghat", lat: 20.7453, lng: 78.6022 },
  { name: "Samudrapur", lat: 20.7453, lng: 78.6022 },
  { name: "Arvi", lat: 20.7453, lng: 78.6022 },
  { name: "Deoli", lat: 20.7453, lng: 78.6022 },
  { name: "Karanja", lat: 20.7453, lng: 78.6022 },

  // --- Washim ---
  { name: "Washim", lat: 20.1110, lng: 77.1330 },
  { name: "Karanja (Washim)", lat: 20.1110, lng: 77.1330 },
  { name: "Risod", lat: 20.1110, lng: 77.1330 },
  { name: "Malegaon (Washim)", lat: 20.1110, lng: 77.1330 },
  { name: "Mangrulpir", lat: 20.1110, lng: 77.1330 },

  // --- Yavatmal ---
  { name: "Yavatmal", lat: 20.3899, lng: 78.1307 },
  { name: "Umarkhed", lat: 20.3899, lng: 78.1307 },
  { name: "Pusad", lat: 20.3899, lng: 78.1307 },
  { name: "Ghatanji", lat: 20.3899, lng: 78.1307 },
  { name: "Wani", lat: 20.3899, lng: 78.1307 },
  { name: "Arni", lat: 20.3899, lng: 78.1307 },
  { name: "Ralegaon", lat: 20.3899, lng: 78.1307 },
  { name: "Darwha", lat: 20.3899, lng: 78.1307 },
  { name: "Kalamb", lat: 20.3899, lng: 78.1307 },
  { name: "Mahagaon", lat: 20.3899, lng: 78.1307 },
  { name: "Ner", lat: 20.3899, lng: 78.1307 }
];
// ------------------------------
// Make every taluka in CITY_DB get a unique deterministic coord
// Paste this IMMEDIATELY AFTER your const CITY_DB = [ ... ]; block
// (This block DOES NOT redefine haversineKm — it uses your existing one)
// ------------------------------

(function(){
  // list of Maharashtra districts (used to detect district blocks)
  const _DISTRICTS = [
    "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
    "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
    "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
    "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
    "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
    "Washim","Yavatmal"
  ];

  function _degToRad(d){ return d * Math.PI / 180; }
  function kmToDegFactors(latDeg) {
    const latDegPerKm = 1 / 111.32;
    const lonDegPerKm = 1 / (111.32 * Math.cos(_degToRad(latDeg)));
    return { latFactor: latDegPerKm, lngFactor: lonDegPerKm };
  }

  // build district centroids from existing CITY_DB where district entries exist
  const _districtCentroids = {};
  _DISTRICTS.forEach(d => {
    const found = CITY_DB.find(p => p.name === d);
    if (found) _districtCentroids[d] = { lat: found.lat, lng: found.lng };
  });

  // partition CITY_DB into blocks (assumes each district name appears as block header)
  const blocks = {};
  let currentDistrict = null;
  for (let i = 0; i < CITY_DB.length; i++) {
    const item = CITY_DB[i];
    if (_DISTRICTS.includes(item.name)) {
      currentDistrict = item.name;
      if (!blocks[currentDistrict]) blocks[currentDistrict] = [];
      blocks[currentDistrict].push(item);
    } else {
      if (!currentDistrict) {
        // try to match by centroid equality as fallback
        const matching = Object.keys(_districtCentroids).find(dn=>{
          const c = _districtCentroids[dn];
          return c && c.lat === item.lat && c.lng === item.lng;
        });
        currentDistrict = matching || "_UNKNOWN_";
        if (!blocks[currentDistrict]) blocks[currentDistrict] = [];
        blocks[currentDistrict].push(item);
      } else {
        blocks[currentDistrict].push(item);
      }
    }
  }

  // generate new CITY_DB entries with deterministic offsets for talukas
  const NEW_CITY_DB = [];
  for (const dist of Object.keys(blocks)) {
    const arr = blocks[dist];
    if (!arr || arr.length === 0) continue;

    const centroid = _districtCentroids[dist] || { lat: arr[0].lat, lng: arr[0].lng };
    const lat0 = centroid.lat;
    const lng0 = centroid.lng;

    if (dist !== "_UNKNOWN_") {
      NEW_CITY_DB.push({ name: dist, lat: +lat0.toFixed(6), lng: +lng0.toFixed(6) });
    }

    let talukaItems = arr.slice();
    if (talukaItems.length > 0 && talukaItems[0].name === dist) talukaItems = talukaItems.slice(1);

    const N = Math.max(1, talukaItems.length);
    for (let i = 0; i < talukaItems.length; i++) {
      const t = talukaItems[i];
      const angle = 2 * Math.PI * i / N;
      // tweak these to control how far talukas spread around centroid
      const baseKm = 0.9;    // minimum offset in km
      const maxExtraKm = 4.1; // additional up to ~5 km
      const radiusKm = baseKm + (maxExtraKm * (i / Math.max(1, N - 1)));

      const factors = kmToDegFactors(lat0);
      const dLatDeg = radiusKm * Math.cos(angle) * factors.latFactor;
      const dLngDeg = radiusKm * Math.sin(angle) * factors.lngFactor;

      const newLat = +(lat0 + dLatDeg).toFixed(6);
      const newLng = +(lng0 + dLngDeg).toFixed(6);

      NEW_CITY_DB.push({ name: t.name, lat: newLat, lng: newLng });
    }
  }

  // replace CITY_DB in-place so existing code keeps working
  CITY_DB.length = 0;
  NEW_CITY_DB.forEach(x => CITY_DB.push(x));

  console.log("CITY_DB transformed → unique taluka coords. Total:", CITY_DB.length);
  // quick sanity examples (if names exist)
  function _find(n){ return CITY_DB.find(p => p.name.toLowerCase() === (n||"").toLowerCase()); }
  if (_find("Pandharpur") && _find("Barshi")) {
    console.log("Sample distance Pandharpur↔Barshi:", typeof haversineKm === 'function' ? haversineKm(_find("Pandharpur").lat,_find("Pandharpur").lng,_find("Barshi").lat,_find("Barshi").lng) : "haversine missing");
  }
  if (_find("Karmala") && _find("Akkalkot")) {
    console.log("Sample distance Karmala↔Akkalkot:", typeof haversineKm === 'function' ? haversineKm(_find("Karmala").lat,_find("Karmala").lng,_find("Akkalkot").lat,_find("Akkalkot").lng) : "haversine missing");
  }

  // helper lookups you can use later
  window.findCoordsFromCityDb = function(name){
    if (!name) return null;
    const n = name.toString().toLowerCase().replace(/\(.*?\)/g,"").replace(/\s+/g," ").trim();
    return CITY_DB.find(p => p.name.toLowerCase() === name.toLowerCase() || p.name.toLowerCase().startsWith(n)) || null;
  };
  window.distanceBetweenNames = function(a,b){
    const A = window.findCoordsFromCityDb(a);
    const B = window.findCoordsFromCityDb(b);
    if (!A || !B) return null;
    return typeof haversineKm === 'function' ? haversineKm(A.lat,A.lng,B.lat,B.lng) : null;
  };

})();

// ------------------------------
// Transform existing CITY_DB so every taluka gets a unique deterministic offset
// Paste this block IMMEDIATELY AFTER your const CITY_DB and your haversineKm definition
// ------------------------------

const _DISTRICTS = [
  "Ahmednagar","Akola","Amravati","Aurangabad","Beed","Bhandara","Buldhana",
  "Chandrapur","Dhule","Gadchiroli","Gondia","Hingoli","Jalgaon","Jalna",
  "Kolhapur","Latur","Mumbai City","Mumbai Suburban","Nagpur","Nanded",
  "Nandurbar","Nashik","Osmanabad","Palghar","Parbhani","Pune","Raigad",
  "Ratnagiri","Sangli","Satara","Sindhudurg","Solapur","Thane","Wardha",
  "Washim","Yavatmal"
];

function _degToRad(d){ return d * Math.PI / 180; }
function kmToDegFactors(latDeg) {
  const latDegPerKm = 1 / 111.32;
  const lonDegPerKm = 1 / (111.32 * Math.cos(_degToRad(latDeg)));
  return { latFactor: latDegPerKm, lngFactor: lonDegPerKm };
}

/* Build district centroids map from CITY_DB (assumes district entries exist) */
const _districtCentroids = {};
_DISTRICTS.forEach(d => {
  const found = CITY_DB.find(p => p.name === d);
  if (found) _districtCentroids[d] = { lat: found.lat, lng: found.lng };
});

/* Partition CITY_DB into blocks by district */
const blocks = {};
let currentDistrict = null;
for (let i = 0; i < CITY_DB.length; i++) {
  const item = CITY_DB[i];
  if (_DISTRICTS.includes(item.name)) {
    currentDistrict = item.name;
    if (!blocks[currentDistrict]) blocks[currentDistrict] = [];
    blocks[currentDistrict].push(item);
  } else {
    if (!currentDistrict) {
      const matching = Object.keys(_districtCentroids).find(dn=>{
        const c = _districtCentroids[dn];
        return c && c.lat === item.lat && c.lng === item.lng;
      });
      currentDistrict = matching || "_UNKNOWN_";
      if (!blocks[currentDistrict]) blocks[currentDistrict] = [];
      blocks[currentDistrict].push(item);
    } else {
      blocks[currentDistrict].push(item);
    }
  }
}

/* Generate NEW_CITY_DB with deterministic offsets (does NOT define haversine) */
const NEW_CITY_DB = [];

for (const dist of Object.keys(blocks)) {
  const arr = blocks[dist];
  if (!arr || arr.length === 0) continue;

  const centroid = _districtCentroids[dist] || { lat: arr[0].lat, lng: arr[0].lng };
  const lat0 = centroid.lat;
  const lng0 = centroid.lng;

  if (dist !== "_UNKNOWN_") {
    NEW_CITY_DB.push({ name: dist, lat: +lat0.toFixed(6), lng: +lng0.toFixed(6) });
  }

  let talukaItems = arr.slice();
  if (talukaItems.length > 0 && talukaItems[0].name === dist) talukaItems = talukaItems.slice(1);

  const N = Math.max(1, talukaItems.length);
  for (let i = 0; i < talukaItems.length; i++) {
    const t = talukaItems[i];
    const angle = 2 * Math.PI * i / N;
    const baseKm = 0.9;
    const maxExtraKm = 4.1;
    const radiusKm = baseKm + (maxExtraKm * (i / Math.max(1, N - 1)));

    const factors = kmToDegFactors(lat0);
    const dLatDeg = radiusKm * Math.cos(angle) * factors.latFactor;
    const dLngDeg = radiusKm * Math.sin(angle) * factors.lngFactor;

    const newLat = +(lat0 + dLatDeg).toFixed(6);
    const newLng = +(lng0 + dLngDeg).toFixed(6);

    NEW_CITY_DB.push({ name: t.name, lat: newLat, lng: newLng });
  }
}

/* Replace original CITY_DB contents in-place */
CITY_DB.length = 0;
NEW_CITY_DB.forEach(x => CITY_DB.push(x));

console.log("CITY_DB transformed. New length:", CITY_DB.length);
console.log("Example entries (first 12):", CITY_DB.slice(0,12));
console.log("Sample distances (Solapur examples):",
  "Pandharpur<->Barshi:", typeof haversineKm === 'function' ? haversineKm(
    (CITY_DB.find(p=>p.name==="Pandharpur")||{}).lat,
    (CITY_DB.find(p=>p.name==="Pandharpur")||{}).lng,
    (CITY_DB.find(p=>p.name==="Barshi")||{}).lat,
    (CITY_DB.find(p=>p.name==="Barshi")||{}).lng
  ) : "haversine not defined",
  "Solapur North<->Solapur South:", typeof haversineKm === 'function' ? haversineKm(
    (CITY_DB.find(p=>p.name==="Solapur North")||{}).lat,
    (CITY_DB.find(p=>p.name==="Solapur North")||{}).lng,
    (CITY_DB.find(p=>p.name==="Solapur South")||{}).lat,
    (CITY_DB.find(p=>p.name==="Solapur South")||{}).lng
  ) : "haversine not defined"
);

/* helper lookups */
function findCoordsFromCityDb(name) {
  if (!name) return null;
  const n = (name||"").toString().toLowerCase().replace(/\(.*?\)/g,"").replace(/\s+/g," ").trim();
  const found = CITY_DB.find(p => p.name.toLowerCase() === name.toLowerCase() || p.name.toLowerCase().startsWith(n));
  return found ? { lat: found.lat, lng: found.lng, name: found.name } : null;
}
function distanceBetweenNames(aName, bName) {
  const a = findCoordsFromCityDb(aName);
  const b = findCoordsFromCityDb(bName);
  if (!a || !b) return null;
  return typeof haversineKm === 'function' ? haversineKm(a.lat, a.lng, b.lat, b.lng) : null;
}


// haversine
function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const toRad = v => v * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return +(R * c).toFixed(1);
}
function formatTimeFromKm(km, speed = 60) {
    if (!km || km <= 0) return "0 min";
    const hours = km / speed;
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    if (h && m) return `${h} hr ${m} min`;
    if (h) return `${h} hr`;
    return `${m} min`;
}

// DOM refs for booking autocomplete
const pickupInput = document.getElementById("pickupCity");
const dropInput = document.getElementById("dropoffCity");
const pickupSug = document.getElementById("pickupSuggestions");
const dropSug = document.getElementById("dropoffSuggestions");
const tripMetricsEl = document.getElementById("tripMetrics");
const planSelect = document.getElementById("plan");

let pickupSel = null;
let dropSel = null;

function searchCity(q) {
    if (!q) return [];
    const s = q.trim().toLowerCase();
    return CITY_DB.filter(c => c.name.toLowerCase().includes(s)).slice(0,8);
}
function renderSuggestions(listEl, matches, onSelect) {
    if (!listEl) return;
    if (!matches || matches.length === 0) {
        listEl.classList.add("d-none");
        listEl.innerHTML = "";
        return;
    }
    listEl.classList.remove("d-none");
    listEl.innerHTML = "";
    matches.forEach(c => {
        const d = document.createElement("div");
        d.textContent = c.name;
        d.addEventListener("click", () => {
            onSelect(c);
            listEl.classList.add("d-none");
            updateTripMetrics();
        });
        listEl.appendChild(d);
    });
}

if (pickupInput) {
    pickupInput.addEventListener("input", (e) => {
        pickupSel = null;
        renderSuggestions(pickupSug, searchCity(e.target.value), (c)=> {
            pickupSel = c; pickupInput.value = c.name;
        });
    });
    pickupInput.addEventListener("blur", () => setTimeout(()=>pickupSug?.classList.add("d-none"), 160));
}
if (dropInput) {
    dropInput.addEventListener("input", (e) => {
        dropSel = null;
        renderSuggestions(dropSug, searchCity(e.target.value), (c)=> {
            dropSel = c; dropInput.value = c.name;
        });
    });
    dropInput.addEventListener("blur", () => setTimeout(()=>dropSug?.classList.add("d-none"), 160));
}

// pricing defaults
const DEFAULT_RATE_PER_KM = 12;   // ₹ per km
const DEFAULT_HOURLY_RATE = 600;  // ₹ per hour

function getSelectedCarFromURL() {
    try {
        const params = new URLSearchParams(window.location.search);
        const carId = params.get("car");
        if (!carId) return null;
        return cars.find(c => c.id === carId) || null;
    } catch { return null; }
}

function computeFareEstimates(km, minutes) {
    const car = getSelectedCarFromURL();
    const plan = planSelect ? planSelect.value : null;

    const ratePerKm = (car && car.customRatePerKm) ? car.customRatePerKm : DEFAULT_RATE_PER_KM;
    const hourlyRate = (car && car.hourlyRate) ? car.hourlyRate : DEFAULT_HOURLY_RATE;

    const perKmFare = Math.round(km * ratePerKm);
    const hours = Math.max(0.01, minutes / 60);
    const perHourFare = Math.round(hours * hourlyRate);

    let packagePrice = null;
    if (car && plan && car.prices && car.prices[plan]) packagePrice = car.prices[plan];

    return {
        perKmFare,
        perHourFare,
        packagePrice,
        chosenFare: packagePrice != null ? packagePrice : Math.min(perKmFare, perHourFare)
    };
}

function updateTripMetrics() {
    if (!tripMetricsEl) return;

    // try to match typed city to DB if user didn't select suggestion
    if (!pickupSel && pickupInput && pickupInput.value.trim()) {
        const m = CITY_DB.find(c => c.name.toLowerCase() === pickupInput.value.trim().toLowerCase());
        if (m) pickupSel = m;
    }
    if (!dropSel && dropInput && dropInput.value.trim()) {
        const m = CITY_DB.find(c => c.name.toLowerCase() === dropInput.value.trim().toLowerCase());
        if (m) dropSel = m;
    }

    if (!pickupSel || !dropSel) {
        tripMetricsEl.innerHTML = "Select both pickup and drop cities from suggestions.";
        return;
    }

    const km = haversineKm(pickupSel.lat, pickupSel.lng, dropSel.lat, dropSel.lng);
    const travelTime = formatTimeFromKm(km, 60);
    const minutes = Math.round((km / 60) * 60); // approx minutes using 60 km/h

    const fares = computeFareEstimates(km, minutes);

    let html = `Distance: <strong>${km} km</strong> • Travel time: <strong>${travelTime}</strong><br/>`;

    if (fares.packagePrice != null) {
        html += `Package (${planSelect.value}): <strong>₹ ${fares.packagePrice}</strong><br/>`;
        html += `<small class="text-muted">Also: per-km ₹${fares.perKmFare}, per-hour ₹${fares.perHourFare} (for comparison)</small>`;
    } else {
        html += `Estimated fare (per-km): <strong>₹ ${fares.perKmFare}</strong><br/>`;
        html += `Estimated fare (per-hour): <strong>₹ ${fares.perHourFare}</strong><br/>`;
        html += `<small class="text-muted">Chosen estimate: <strong>₹ ${fares.chosenFare}</strong></small>`;
    }

    tripMetricsEl.innerHTML = html;
}

if (pickupInput) pickupInput.addEventListener("change", updateTripMetrics);
if (dropInput) dropInput.addEventListener("change", updateTripMetrics);
if (planSelect) planSelect.addEventListener("change", updateTripMetrics);

/* ==========================
   UTILITY: If booking page loads with ?car= and quick param -> prefill or scroll
   ========================== */
(function handleQuickParam() {
    try {
        const params = new URLSearchParams(window.location.search);
        if (params.get("quick") === "1") {
            // focus first input on booking page if present
            const el = document.querySelector("input[name='pickupDate']");
            if (el) el.scrollIntoView({behavior:"smooth", block:"center"});
        }
    } catch {}
})();
