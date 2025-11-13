// Global Variables
let currentSlideIndex = 0;
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let products = [];
let currentStep = 1;
const orderData = {};

// Sample Products Data with Indian Pricing (INR)
const sampleProducts = [
  // Men's Products
  {
    id: 1,
    name: "Classic White Dress Shirt",
    price: 2499,
    originalPrice: 3499,
    category: "men",
    subcategory: "shirts",
    image:
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "sale",
    rating: 4.5,
    reviews: 128,
    description:
      "Premium cotton dress shirt with modern fit. Perfect for business meetings and formal occasions. Features mother-of-pearl buttons and French seams for durability.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["white", "blue", "black"],
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    price: 1999,
    category: "men",
    subcategory: "pants",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "new",
    rating: 4.3,
    reviews: 95,
    description:
      "High-quality denim with perfect slim fit. Made from premium cotton blend with stretch for comfort. Classic 5-pocket design with reinforced stitching.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["blue", "black", "white"],
  },
  {
    id: 3,
    name: "Premium Leather Sneakers",
    price: 4999,
    category: "men",
    subcategory: "shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.7,
    reviews: 203,
    description:
      "Handcrafted leather sneakers with superior comfort. Features memory foam insole and rubber outsole for excellent grip. Perfect for casual and semi-formal occasions.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["black", "white", "blue"],
  },
  {
    id: 4,
    name: "Cotton Casual T-Shirt",
    price: 799,
    originalPrice: 1199,
    category: "men",
    subcategory: "shirts",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "hot",
    rating: 4.2,
    reviews: 87,
    description:
      "Soft cotton t-shirt with comfortable fit. Pre-shrunk fabric ensures lasting size and shape. Available in multiple colors for versatile styling.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "white", "blue", "red", "green"],
  },
  {
    id: 5,
    name: "Wool Blend Blazer",
    price: 6999,
    category: "men",
    subcategory: "jackets",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "new",
    rating: 4.6,
    reviews: 156,
    description:
      "Sophisticated wool blend blazer with tailored fit. Features notched lapels and two-button closure. Perfect for business and formal events.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["black", "blue"],
  },
  {
    id: 6,
    name: "Chino Pants",
    price: 1799,
    category: "men",
    subcategory: "pants",
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 92,
    description:
      "Classic chino pants with modern fit. Made from premium cotton twill with slight stretch. Versatile design suitable for casual and business casual wear.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["black", "blue", "green"],
  },

  // Women's Products
  {
    id: 7,
    name: "Elegant Summer Dress",
    price: 3499,
    originalPrice: 4999,
    category: "women",
    subcategory: "dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "sale",
    rating: 4.8,
    reviews: 234,
    description:
      "Beautiful floral summer dress with flowing silhouette. Made from lightweight chiffon with comfortable lining. Perfect for special occasions and summer events.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["blue", "red", "green"],
  },
  {
    id: 8,
    name: "Silk Blouse",
    price: 2799,
    category: "women",
    subcategory: "tops",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "new",
    rating: 4.5,
    reviews: 167,
    description:
      "Luxurious silk blouse with elegant drape. Features button-front closure and relaxed fit. Perfect for professional and formal settings.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["white", "black", "blue"],
  },
  {
    id: 9,
    name: "High Heel Pumps",
    price: 3999,
    category: "women",
    subcategory: "shoes",
    image:
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 89,
    description:
      "Classic pointed-toe pumps with 3-inch heel. Made from genuine leather with cushioned insole. Timeless design suitable for any formal occasion.",
    sizes: ["6", "7", "8", "9", "10"],
    colors: ["black", "red", "blue"],
  },
  {
    id: 10,
    name: "Casual Cotton Top",
    price: 1299,
    category: "women",
    subcategory: "tops",
    image:
      "https://images.unsplash.com/photo-1564257577-4b0b5b1b6c3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.1,
    reviews: 63,
    description:
      "Comfortable cotton top with relaxed fit. Features round neckline and short sleeves. Perfect for everyday casual wear and layering.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["white", "black", "blue", "red"],
  },
  {
    id: 11,
    name: "A-Line Midi Skirt",
    price: 1899,
    category: "women",
    subcategory: "skirts",
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "hot",
    rating: 4.6,
    reviews: 145,
    description:
      "Flattering A-line midi skirt with high waist. Made from premium ponte fabric with stretch. Versatile piece that pairs well with any top.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "blue", "red"],
  },
  {
    id: 12,
    name: "Denim Jacket",
    price: 2299,
    category: "women",
    subcategory: "jackets",
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 112,
    description:
      "Classic denim jacket with vintage wash. Features button closure and chest pockets. Perfect layering piece for casual outfits.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["blue", "black", "white"],
  },
  {
    id: 19,
    name: "Floral Maxi Dress",
    price: 2999,
    category: "women",
    subcategory: "dresses",
    image:
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "new",
    rating: 4.7,
    reviews: 156,
    description:
      "Beautiful floral maxi dress perfect for summer occasions. Lightweight fabric with comfortable fit and elegant design.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["blue", "pink", "white"],
  },
  {
    id: 20,
    name: "Designer Handbag",
    price: 4999,
    originalPrice: 6999,
    category: "women",
    subcategory: "bags",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "sale",
    rating: 4.8,
    reviews: 203,
    description:
      "Premium designer handbag with spacious interior and elegant design. Perfect for both casual and formal occasions.",
    sizes: ["One Size"],
    colors: ["black", "brown", "red"],
  },
  {
    id: 21,
    name: "Ethnic Kurta Set",
    price: 2499,
    category: "women",
    subcategory: "dresses",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "hot",
    rating: 4.6,
    reviews: 189,
    description:
      "Traditional ethnic kurta set with beautiful embroidery. Perfect for festivals and special occasions.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["blue", "red", "green", "pink"],
  },
  {
    id: 22,
    name: "Formal Blazer",
    price: 3999,
    category: "women",
    subcategory: "jackets",
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.4,
    reviews: 134,
    description:
      "Professional formal blazer with tailored fit. Perfect for office wear and business meetings.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "navy", "grey"],
  },
  {
    id: 23,
    name: "Comfortable Leggings",
    price: 899,
    category: "women",
    subcategory: "pants",
    image:
      "https://images.unsplash.com/photo-1506629905607-d405d7d3b0d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.2,
    reviews: 298,
    description:
      "High-quality stretchable leggings perfect for workouts and casual wear. Comfortable and durable fabric.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["black", "grey", "navy"],
  },

  // Accessories
  {
    id: 13,
    name: "Leather Handbag",
    price: 5999,
    originalPrice: 7999,
    category: "accessories",
    subcategory: "bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "sale",
    rating: 4.9,
    reviews: 298,
    description:
      "Premium leather handbag with spacious interior. Features multiple compartments and adjustable strap. Handcrafted with attention to detail.",
    sizes: ["One Size"],
    colors: ["black", "blue", "red"],
  },
  {
    id: 14,
    name: "Classic Wristwatch",
    price: 8999,
    category: "accessories",
    subcategory: "watches",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "new",
    rating: 4.7,
    reviews: 189,
    description:
      "Elegant wristwatch with Swiss movement. Features stainless steel case and leather strap. Water-resistant up to 50 meters.",
    sizes: ["One Size"],
    colors: ["black", "blue"],
  },
  {
    id: 15,
    name: "Designer Sunglasses",
    price: 2999,
    category: "accessories",
    subcategory: "sunglasses",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "hot",
    rating: 4.5,
    reviews: 156,
    description:
      "Stylish sunglasses with UV protection. Features polarized lenses and lightweight frame. Perfect for outdoor activities and fashion.",
    sizes: ["One Size"],
    colors: ["black", "blue", "red"],
  },
  {
    id: 16,
    name: "Silver Necklace",
    price: 2499,
    category: "accessories",
    subcategory: "jewelry",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.6,
    reviews: 134,
    description:
      "Elegant sterling silver necklace with pendant. Hypoallergenic and tarnish-resistant. Perfect for everyday wear or special occasions.",
    sizes: ["One Size"],
    colors: ["white"],
  },
  {
    id: 17,
    name: "Leather Wallet",
    price: 1499,
    category: "accessories",
    subcategory: "bags",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    rating: 4.3,
    reviews: 87,
    description:
      "Compact leather wallet with RFID protection. Features multiple card slots and bill compartment. Slim design fits comfortably in pocket.",
    sizes: ["One Size"],
    colors: ["black", "blue"],
  },
  {
    id: 18,
    name: "Silk Scarf",
    price: 1799,
    category: "accessories",
    subcategory: "jewelry",
    image:
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    badge: "hot",
    rating: 4.4,
    reviews: 98,
    description:
      "Luxurious silk scarf with beautiful print. Versatile accessory that can be worn multiple ways. Adds elegance to any outfit.",
    sizes: ["One Size"],
    colors: ["blue", "red", "green"],
  },
];

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp();
});

function initializeApp() {
  products = [...sampleProducts];
  setupEventListeners();

  // Debug: Check if products loaded
  console.log("Products loaded:", products.length);
  console.log(
    "Men products:",
    products.filter((p) => p.category === "men").length
  );
  console.log(
    "Women products:",
    products.filter((p) => p.category === "women").length
  );
  console.log(
    "Accessories:",
    products.filter((p) => p.category === "accessories").length
  );

  // Load products after a small delay to ensure DOM is ready
  setTimeout(() => {
    loadProducts();
    updateCartCount();
    updateWishlistCount();
    startSlideshow();
    setupNavigation();
  }, 100);
}

function setupEventListeners() {
  // Navigation
  document
    .getElementById("menuToggle")
    .addEventListener("click", toggleMobileMenu);

  // Search functionality
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const searchResults = document.getElementById("searchResults");

  searchInput.addEventListener("input", handleSearch);
  searchInput.addEventListener("focus", () => {
    if (searchInput.value.trim()) {
      searchResults.style.display = "block";
    }
  });

  searchBtn.addEventListener("click", performSearch);

  // Hide search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".search-container")) {
      searchResults.style.display = "none";
    }
  });

  // Cart and Wishlist
  document.getElementById("cartBtn").addEventListener("click", openCart);
  document
    .getElementById("wishlistBtn")
    .addEventListener("click", openWishlist);

  // Modal close buttons
  document.getElementById("closeCart").addEventListener("click", closeCart);
  document
    .getElementById("closeWishlist")
    .addEventListener("click", closeWishlist);
  document
    .getElementById("closeProductModal")
    .addEventListener("click", closeProductModal);
  document
    .getElementById("closeCheckout")
    .addEventListener("click", closeCheckout);

  // Cart actions
  document.getElementById("clearCartBtn").addEventListener("click", clearCart);
  document
    .getElementById("checkoutBtn")
    .addEventListener("click", openCheckout);

  // Product modal actions
  document
    .getElementById("addToCartBtn")
    .addEventListener("click", addToCartFromModal);
  document
    .getElementById("addToWishlistBtn")
    .addEventListener("click", addToWishlistFromModal);

  // Checkout navigation
  document
    .getElementById("nextStepBtn")
    .addEventListener("click", nextCheckoutStep);
  document
    .getElementById("prevStepBtn")
    .addEventListener("click", prevCheckoutStep);
  document
    .getElementById("placeOrderBtn")
    .addEventListener("click", placeOrder);

  // Filter tabs
  document.querySelectorAll(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");
      const section = this.getAttribute("data-section");
      filterProductsByCategory(section, filter);

      // Update active tab
      const sectionTabs = document.querySelectorAll(
        `[data-section="${section}"]`
      );
      sectionTabs.forEach((t) => t.classList.remove("active"));
      this.classList.add("active");
    });
  });

  // Load more buttons
  document
    .getElementById("loadMoreMen")
    .addEventListener("click", () => loadMoreProducts("men"));
  document
    .getElementById("loadMoreWomen")
    .addEventListener("click", () => loadMoreProducts("women"));
  document
    .getElementById("loadMoreAccessories")
    .addEventListener("click", () => loadMoreProducts("accessories"));

  // Color selection in product modal
  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", function () {
      document
        .querySelectorAll(".color-option")
        .forEach((opt) => opt.classList.remove("selected"));
      this.classList.add("selected");
    });
  });

  // Payment method selection
  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      // Hide all payment details
      document.querySelectorAll(".payment-details").forEach((detail) => {
        detail.classList.add("hidden");
      });

      // Show selected payment method details
      const selectedMethod = this.value;
      const detailsId = selectedMethod + "Details";
      const detailsElement = document.getElementById(detailsId);

      if (detailsElement) {
        detailsElement.classList.remove("hidden");
      }

      // Update checkout total for COD charges
      calculateCheckoutTotal();
    });
  });

  // Forms
  document
    .getElementById("contactForm")
    .addEventListener("submit", handleContactForm);
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", handleNewsletter);

  // Card number formatting
  const cardNumberInput = document.getElementById("cardNumber");
  if (cardNumberInput) {
    cardNumberInput.addEventListener("input", formatCardNumber);
  }

  const expiryDateInput = document.getElementById("expiryDate");
  if (expiryDateInput) {
    expiryDateInput.addEventListener("input", formatExpiryDate);
  }

  // Close modals when clicking outside
  window.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal");
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  });
}

// Navigation Functions
function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-link");

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section[id]");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Header background on scroll
    const header = document.getElementById("header");
    if (window.pageYOffset > 100) {
      header.style.background = "rgba(255, 255, 255, 0.95)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
    }
  });

  // Smooth scroll for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      // Close mobile menu if open
      const navMenu = document.getElementById("navMenu");
      navMenu.classList.remove("active");
      document.getElementById("menuToggle").classList.remove("active");
    });
  });
}

function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu");
  const menuToggle = document.getElementById("menuToggle");

  navMenu.classList.toggle("active");
  menuToggle.classList.toggle("active");
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
}

// Slideshow Functions
function startSlideshow() {
  setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(direction) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex += direction;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = slides.length - 1;
  }

  slides[currentSlideIndex].classList.add("active");
  dots[currentSlideIndex].classList.add("active");
}

function currentSlide(n) {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  slides[currentSlideIndex].classList.remove("active");
  dots[currentSlideIndex].classList.remove("active");

  currentSlideIndex = n - 1;

  slides[currentSlideIndex].classList.add("active");
  dots[currentSlideIndex].classList.add("active");
}

// Search Functions
function handleSearch() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  const searchResults = document.getElementById("searchResults");

  if (searchTerm.length < 2) {
    searchResults.style.display = "none";
    return;
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );

  displaySearchResults(filteredProducts.slice(0, 5)); // Show max 5 results
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("searchResults");

  if (results.length === 0) {
    searchResults.innerHTML =
      '<div style="padding: 1rem; text-align: center; color: #666;">No products found</div>';
    searchResults.style.display = "block";
    return;
  }

  searchResults.innerHTML = results
    .map(
      (product) => `
        <div class="search-result-item" onclick="openProductModal(${product.id})">
            <img src="${product.image}" alt="${product.name}" class="search-result-image">
            <div class="search-result-info">
                <h4>${product.name}</h4>
                <p>${product.category} • ${product.subcategory}</p>
            </div>
            <div class="search-result-price">₹${product.price}</div>
        </div>
    `
    )
    .join("");

  searchResults.style.display = "block";
}

function performSearch() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();
  if (!searchTerm) return;

  // Hide search results
  document.getElementById("searchResults").style.display = "none";

  // Filter all products and display them
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm) ||
      product.subcategory.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
  );

  // Create a temporary section to show search results
  showSearchResultsPage(filteredProducts, searchTerm);
}

function showSearchResultsPage(results, searchTerm) {
  // Scroll to men's section and replace content temporarily
  const menSection = document.getElementById("men");
  const originalContent = menSection.innerHTML;

  menSection.innerHTML = `
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">Search Results</h2>
                <p class="section-subtitle">Found ${
                  results.length
                } products for "${searchTerm}"</p>
                <button class="btn-secondary" onclick="restoreOriginalContent('men', \`${originalContent.replace(
                  /`/g,
                  "\\`"
                )}\`)">
                    Back to Men's Collection
                </button>
            </div>
            <div class="products-grid">
                ${results
                  .map((product) => createProductCardHTML(product))
                  .join("")}
            </div>
        </div>
    `;

  scrollToSection("men");
}

function restoreOriginalContent(sectionId, originalContent) {
  document.getElementById(sectionId).innerHTML = originalContent;
  loadProducts(); // Reload products
}

// Product Functions
function loadProducts() {
  loadProductsByCategory("men", "menProducts");
  loadProductsByCategory("women", "womenProducts");
  loadProductsByCategory("accessories", "accessoriesProducts");
}

function loadProductsByCategory(category, containerId, limit = 6) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container ${containerId} not found`);
    return;
  }

  const categoryProducts = products.filter(
    (product) => product.category === category
  );
  console.log(`Loading ${category} products:`, categoryProducts.length); // Debug log

  const productsToShow = categoryProducts.slice(0, limit);
  console.log(`Showing ${productsToShow.length} ${category} products`); // Debug log

  if (productsToShow.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #666;">
        <p>No products found in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = productsToShow
    .map((product) => createProductCardHTML(product))
    .join("");

  // Show/hide load more button
  const loadMoreBtn = document.getElementById(
    `loadMore${category.charAt(0).toUpperCase() + category.slice(1)}`
  );
  if (loadMoreBtn) {
    loadMoreBtn.style.display =
      categoryProducts.length > limit ? "block" : "none";
  }
}

function createProductCardHTML(product) {
  const badgeHTML = product.badge
    ? `<div class="product-badge ${
        product.badge
      }">${product.badge.toUpperCase()}</div>`
    : "";
  const originalPriceHTML = product.originalPrice
    ? `<span class="original-price">₹${product.originalPrice}</span>`
    : "";
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return `
        <div class="product-card fade-in-up" data-product-id="${
          product.id
        }" onclick="openProductModal(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${badgeHTML}
                <div class="wishlist-icon ${
                  isInWishlist ? "active" : ""
                }" onclick="event.stopPropagation(); toggleWishlist(${
    product.id
  })">
                    <i class="fas fa-heart"></i>
                </div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${generateStars(product.rating)}</div>
                    <span class="rating-text">(${
                      product.reviews
                    } reviews)</span>
                </div>
                <div class="product-price">
                    <span class="current-price">₹${product.price}</span>
                    ${originalPriceHTML}
                </div>
                <div class="product-actions">
                    <button class="add-to-cart" onclick="event.stopPropagation(); quickAddToCart(${
                      product.id
                    })">
                        Add to Cart
                    </button>
                    <button class="quick-view" onclick="event.stopPropagation(); openProductModal(${
                      product.id
                    })">
                        Quick View
                    </button>
                </div>
            </div>
        </div>
    `;
}

function generateStars(rating) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  let starsHTML = "";

  for (let i = 0; i < fullStars; i++) {
    starsHTML += '<i class="fas fa-star"></i>';
  }

  if (hasHalfStar) {
    starsHTML += '<i class="fas fa-star-half-alt"></i>';
  }

  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += '<i class="far fa-star"></i>';
  }

  return starsHTML;
}

function filterProductsByCategory(section, filter) {
  const containerId = section + "Products";
  const container = document.getElementById(containerId);

  let filteredProducts;
  if (filter === "all") {
    filteredProducts = products.filter(
      (product) => product.category === section
    );
  } else {
    filteredProducts = products.filter(
      (product) =>
        product.category === section && product.subcategory === filter
    );
  }

  container.innerHTML = filteredProducts
    .map((product) => createProductCardHTML(product))
    .join("");
}

function loadMoreProducts(category) {
  const containerId = category + "Products";
  const container = document.getElementById(containerId);
  const currentProducts = container.children.length;
  const categoryProducts = products.filter(
    (product) => product.category === category
  );
  const nextProducts = categoryProducts.slice(
    currentProducts,
    currentProducts + 6
  );

  nextProducts.forEach((product) => {
    container.innerHTML += createProductCardHTML(product);
  });

  // Hide load more button if all products are loaded
  const loadMoreBtn = document.getElementById(
    `loadMore${category.charAt(0).toUpperCase() + category.slice(1)}`
  );
  if (currentProducts + nextProducts.length >= categoryProducts.length) {
    loadMoreBtn.style.display = "none";
  }
}

// Product Modal Functions
function openProductModal(productId) {
  // Convert productId to number if it's a string
  const id =
    typeof productId === "string" ? Number.parseInt(productId) : productId;
  const product = products.find((p) => p.id === id);

  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  const modal = document.getElementById("productModal");

  // Populate modal content
  document.getElementById("modalProductImage").src = product.image;
  document.getElementById("modalProductName").textContent = product.name;
  document.getElementById("modalProductStars").innerHTML = generateStars(
    product.rating
  );
  document.getElementById(
    "modalProductRating"
  ).textContent = `(${product.reviews} reviews)`;
  document.getElementById(
    "modalProductPrice"
  ).textContent = `₹${product.price}`;

  const originalPriceElement = document.getElementById(
    "modalProductOriginalPrice"
  );
  if (originalPriceElement) {
    originalPriceElement.textContent = product.originalPrice
      ? `₹${product.originalPrice}`
      : "";
    originalPriceElement.style.display = product.originalPrice
      ? "inline"
      : "none";
  }

  document.getElementById("modalProductDescription").textContent =
    product.description;

  // Set up size options
  const sizeSelect = document.getElementById("sizeSelect");
  sizeSelect.innerHTML = product.sizes
    .map((size) => `<option value="${size}">${size}</option>`)
    .join("");

  // Reset form
  document.getElementById("quantityInput").value = 1;
  document
    .querySelectorAll(".color-option")
    .forEach((opt) => opt.classList.remove("selected"));
  const firstColorOption = document.querySelector(".color-option");
  if (firstColorOption) {
    firstColorOption.classList.add("selected");
  }

  // Store product ID
  modal.dataset.productId = product.id;

  modal.style.display = "block";
}

function closeProductModal() {
  document.getElementById("productModal").style.display = "none";
}

function changeQuantity(change) {
  const quantityInput = document.getElementById("quantityInput");
  const currentQuantity = Number.parseInt(quantityInput.value);
  let newQuantity = currentQuantity + change;

  if (newQuantity < 1) newQuantity = 1;
  if (newQuantity > 10) newQuantity = 10;

  quantityInput.value = newQuantity;
}

// Cart Functions
function quickAddToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    showNotification("Product added to cart!", "success");
  }
}

function addToCartFromModal() {
  const modal = document.getElementById("productModal");
  const productId = Number.parseInt(modal.dataset.productId);
  const product = products.find((p) => p.id === productId);

  if (product) {
    const size = document.getElementById("sizeSelect").value;
    const quantity = Number.parseInt(
      document.getElementById("quantityInput").value
    );
    const selectedColor = document.querySelector(".color-option.selected");
    const color = selectedColor
      ? selectedColor.dataset.color
      : product.colors[0];

    addToCart(product, quantity, size, color);
    showNotification("Product added to cart!", "success");
    closeProductModal();
  }
}

function addToCart(product, quantity = 1, size = "M", color = "black") {
  const existingItem = cart.find(
    (item) =>
      item.id === product.id && item.size === size && item.color === color
  );

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      size: size,
      color: color,
    });
  }

  updateCartCount();
  saveCartToStorage();
}

function removeFromCart(productId, size, color) {
  cart = cart.filter(
    (item) =>
      !(item.id === productId && item.size === size && item.color === color)
  );
  updateCartCount();
  saveCartToStorage();
  displayCartItems();
}

function updateCartQuantity(productId, size, color, newQuantity) {
  const item = cart.find(
    (item) =>
      item.id === productId && item.size === size && item.color === color
  );

  if (item) {
    if (newQuantity <= 0) {
      removeFromCart(productId, size, color);
    } else {
      item.quantity = newQuantity;
      updateCartCount();
      saveCartToStorage();
      displayCartItems();
    }
  }
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById("cartCount").textContent = totalItems;
}

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function openCart() {
  document.getElementById("cartModal").style.display = "block";
  displayCartItems();
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function displayCartItems() {
  const cartItemsContainer = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
    updateCartSummary(0, 0, 0, 0);
    return;
  }

  cartItemsContainer.innerHTML = cart
    .map(
      (item) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-details">Size: ${item.size}, Color: ${
        item.color
      }</div>
                <div class="cart-item-price">₹${(
                  item.price * item.quantity
                ).toFixed(2)}</div>
            </div>
            <div class="cart-item-controls">
                <div class="qty-controls">
                    <button class="qty-btn" onclick="updateCartQuantity(${
                      item.id
                    }, '${item.size}', '${item.color}', ${
        item.quantity - 1
      })">-</button>
                    <input type="number" class="qty-input" value="${
                      item.quantity
                    }" readonly>
                    <button class="qty-btn" onclick="updateCartQuantity(${
                      item.id
                    }, '${item.size}', '${item.color}', ${
        item.quantity + 1
      })">+</button>
                </div>
                <button class="remove-btn" onclick="removeFromCart(${
                  item.id
                }, '${item.size}', '${item.color}')">Remove</button>
            </div>
        </div>
    `
    )
    .join("");

  calculateCartSummary();
}

function calculateCartSummary() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // International shipping rates
  let shipping = 0;
  if (subtotal < 2500) {
    shipping = 299; // Domestic shipping
  } else if (subtotal < 5000) {
    shipping = 199; // Reduced domestic shipping
  } else {
    shipping = 0; // Free shipping for orders above ₹5000
  }

  const tax = subtotal * 0.18; // 18% GST in India
  const total = subtotal + shipping + tax;

  updateCartSummary(subtotal, shipping, tax, total);
}

function updateCartSummary(subtotal, shipping, tax, total) {
  document.getElementById("cartSubtotal").textContent = `₹${subtotal.toFixed(
    2
  )}`;
  document.getElementById("cartShipping").textContent =
    shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`;
  document.getElementById("cartTax").textContent = `₹${tax.toFixed(2)}`;
  document.getElementById("cartTotal").textContent = `₹${total.toFixed(2)}`;
}

function clearCart() {
  if (confirm("Are you sure you want to clear your cart?")) {
    cart.length = 0;
    updateCartCount();
    saveCartToStorage();
    displayCartItems();
    showNotification("Cart cleared!", "success");
  }
}

// Wishlist Functions
function toggleWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (!product) return;

  const existingIndex = wishlist.findIndex((item) => item.id === productId);

  if (existingIndex > -1) {
    wishlist.splice(existingIndex, 1);
    showNotification("Removed from wishlist", "success");
  } else {
    wishlist.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showNotification("Added to wishlist", "success");
  }

  updateWishlistCount();
  saveWishlistToStorage();

  // Update wishlist icons on product cards
  loadProducts();
}

function updateWishlistCount() {
  const totalItems = wishlist.length;
  document.getElementById("wishlistCount").textContent = totalItems;
}

function saveWishlistToStorage() {
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
}

function openWishlist() {
  document.getElementById("wishlistModal").style.display = "block";
  displayWishlistItems();
}

function closeWishlist() {
  document.getElementById("wishlistModal").style.display = "none";
}

function displayWishlistItems() {
  const wishlistItemsContainer = document.getElementById("wishlistItems");

  if (wishlist.length === 0) {
    wishlistItemsContainer.innerHTML = `
            <div class="empty-wishlist">
                <i class="fas fa-heart"></i>
                <h3>Your wishlist is empty</h3>
                <p>Add some products to get started!</p>
            </div>
        `;
    return;
  }

  wishlistItemsContainer.innerHTML = wishlist
    .map(
      (item) => `
        <div class="wishlist-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="wishlist-item-info">
                <div class="wishlist-item-name">${item.name}</div>
                <div class="wishlist-item-price">₹${item.price}</div>
            </div>
            <div class="wishlist-item-controls">
                <button class="add-to-cart-btn" onclick="addToCartFromWishlist(${item.id})">Add to Cart</button>
                <button class="remove-btn" onclick="toggleWishlist(${item.id})">Remove</button>
            </div>
        </div>
    `
    )
    .join("");
}

function addToCartFromWishlist(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    addToCart(product, 1, product.sizes[0], product.colors[0]);
    showNotification("Product added to cart!", "success");
    closeWishlist();
  }
}

// Checkout Functions
function openCheckout() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }

  currentStep = 1;
  document.getElementById("checkoutModal").style.display = "block";
  updateCheckoutDisplay();
  calculateCheckoutTotal();
}

function closeCheckout() {
  document.getElementById("checkoutModal").style.display = "none";
  currentStep = 1;
}

function updateCheckoutDisplay() {
  // Update step indicators
  document.querySelectorAll(".step").forEach((step, index) => {
    step.classList.remove("active", "completed");
    if (index + 1 === currentStep) {
      step.classList.add("active");
    } else if (index + 1 < currentStep) {
      step.classList.add("completed");
    }
  });

  // Show/hide checkout steps
  document.querySelectorAll(".checkout-step").forEach((step, index) => {
    if (index + 1 === currentStep) {
      step.classList.remove("hidden");
    } else {
      step.classList.add("hidden");
    }
  });

  // Update navigation buttons
  const prevBtn = document.getElementById("prevStepBtn");
  const nextBtn = document.getElementById("nextStepBtn");
  const placeOrderBtn = document.getElementById("placeOrderBtn");

  if (currentStep === 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "inline-block";
    placeOrderBtn.style.display = "none";
    nextBtn.textContent = "Continue to Payment";
  } else if (currentStep === 2) {
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    placeOrderBtn.style.display = "none";
    nextBtn.textContent = "Review Order";
  } else if (currentStep === 3) {
    prevBtn.style.display = "inline-block";
    nextBtn.style.display = "none";
    placeOrderBtn.style.display = "inline-block";
  }
}

function nextCheckoutStep() {
  if (currentStep === 1) {
    if (validateShippingForm()) {
      currentStep = 2;
      updateCheckoutDisplay();
    }
  } else if (currentStep === 2) {
    if (validatePaymentForm()) {
      currentStep = 3;
      updateCheckoutDisplay();
      displayOrderSummary();
    }
  }
}

function prevCheckoutStep() {
  if (currentStep > 1) {
    currentStep--;
    updateCheckoutDisplay();
  }
}

function validateShippingForm() {
  const requiredFields = [
    "firstName",
    "lastName",
    "email",
    "phone",
    "address",
    "city",
    "state",
    "zipCode",
  ];
  let isValid = true;

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field || !field.value.trim()) {
      isValid = false;
      if (field) {
        field.style.borderColor = "#e74c3c";
        setTimeout(() => {
          field.style.borderColor = "";
        }, 3000);
      }
    }
  });

  if (!isValid) {
    showNotification(
      "Please fill in all required shipping information.",
      "error"
    );
  }

  return isValid;
}

// Update the validatePaymentForm function to handle new payment methods
function validatePaymentForm() {
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );

  if (!paymentMethod) {
    showNotification("Please select a payment method.", "error");
    return false;
  }

  const method = paymentMethod.value;

  switch (method) {
    case "card":
      return validateCardDetails();
    case "upi":
      return validateUPIDetails();
    case "netbanking":
      return validateNetBankingDetails();
    case "wallet":
      return validateWalletDetails();
    case "cod":
      return validateCODDetails();
    case "paypal":
      return true; // PayPal validation happens on their end
    default:
      return false;
  }
}

function validateCardDetails() {
  const requiredFields = ["cardNumber", "expiryDate", "cvv", "cardholderName"];
  let isValid = true;

  requiredFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId);
    if (!field || !field.value.trim()) {
      isValid = false;
      if (field) {
        field.style.borderColor = "#e74c3c";
        setTimeout(() => {
          field.style.borderColor = "";
        }, 3000);
      }
    }
  });

  if (!isValid) {
    showNotification("Please fill in all required card information.", "error");
    return false;
  }

  // Validate card number (basic validation)
  const cardNumber = document
    .getElementById("cardNumber")
    .value.replace(/\s/g, "");
  if (cardNumber.length < 13 || cardNumber.length > 19) {
    showNotification("Please enter a valid card number.", "error");
    return false;
  }

  // Validate expiry date
  const expiryDate = document.getElementById("expiryDate").value;
  if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
    showNotification("Please enter a valid expiry date (MM/YY).", "error");
    return false;
  }

  // Validate CVV
  const cvv = document.getElementById("cvv").value;
  if (cvv.length < 3 || cvv.length > 4) {
    showNotification("Please enter a valid CVV.", "error");
    return false;
  }

  return true;
}

function validateUPIDetails() {
  const upiId = document.getElementById("upiId").value.trim();

  if (!upiId) {
    showNotification("Please enter your UPI ID.", "error");
    return false;
  }

  // Basic UPI ID validation
  if (!upiId.includes("@") || upiId.length < 5) {
    showNotification("Please enter a valid UPI ID.", "error");
    return false;
  }

  return true;
}

function validateNetBankingDetails() {
  const bank = document.getElementById("bankSelect").value;

  if (!bank) {
    showNotification("Please select your bank.", "error");
    return false;
  }

  return true;
}

function validateWalletDetails() {
  const wallet = document.getElementById("walletType").value;

  if (!wallet) {
    showNotification("Please select your digital wallet.", "error");
    return false;
  }

  return true;
}

function validateCODDetails() {
  // Check if COD is available for the selected country
  const country = document.getElementById("country").value;

  if (country !== "IN") {
    showNotification(
      "Cash on Delivery is only available for orders within India.",
      "error"
    );
    return false;
  }

  return true;
}

// Update the getPaymentData function to handle new payment methods
function getPaymentData() {
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  ).value;

  switch (paymentMethod) {
    case "card":
      return {
        method: "card",
        cardNumber: document.getElementById("cardNumber").value,
        expiryDate: document.getElementById("expiryDate").value,
        cvv: document.getElementById("cvv").value,
        cardholderName: document.getElementById("cardholderName").value,
      };
    case "upi":
      return {
        method: "upi",
        upiId: document.getElementById("upiId").value,
      };
    case "netbanking":
      return {
        method: "netbanking",
        bank: document.getElementById("bankSelect").value,
      };
    case "wallet":
      return {
        method: "wallet",
        walletType: document.getElementById("walletType").value,
      };
    case "cod":
      return {
        method: "cod",
      };
    default:
      return {
        method: "paypal",
      };
  }
}

// Update the getShippingData function to include country
function getShippingData() {
  return {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    state: document.getElementById("state").value,
    zipCode: document.getElementById("zipCode").value,
    country: document.getElementById("country").value,
    shippingOption: document.getElementById("shippingOption").value,
  };
}

// Update calculateCheckoutTotal to handle COD charges and international shipping
function calculateCheckoutTotal() {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Get selected shipping option
  const shippingSelect = document.getElementById("shippingOption");
  let shipping = 0;

  if (shippingSelect && shippingSelect.value) {
    shipping = Number.parseInt(shippingSelect.value);
  }

  // Add COD charges if COD is selected
  let codCharges = 0;
  const paymentMethod = document.querySelector(
    'input[name="paymentMethod"]:checked'
  );
  if (paymentMethod && paymentMethod.value === "cod") {
    codCharges = 49;
  }

  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax + codCharges;

  document.getElementById("checkoutTotal").textContent = total.toFixed(2);
}

function placeOrder() {
  if (cart.length === 0) {
    showNotification("Your cart is empty!", "error");
    return;
  }

  // Show loading spinner
  showLoadingSpinner();

  // Simulate order processing
  setTimeout(() => {
    hideLoadingSpinner();

    // Create order data
    const orderData = {
      orderId: generateOrderId(),
      items: [...cart],
      shipping: getShippingData(),
      payment: getPaymentData(),
      totals: {
        subtotal: cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
        shipping:
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100
            ? 0
            : 10,
        tax:
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
          0.08,
        total:
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) +
          (cart.reduce((sum, item) => sum + item.price * item.quantity, 0) > 100
            ? 0
            : 10) +
          cart.reduce((sum, item) => sum + item.price * item.quantity, 0) *
            0.08,
      },
      orderDate: new Date().toISOString(),
      status: "confirmed",
    };

    // Save order to localStorage (in a real app, this would be sent to a server)
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    // Clear cart
    cart.length = 0;
    updateCartCount();
    saveCartToStorage();

    // Close checkout modal
    closeCheckout();

    // Show success message
    showOrderSuccess(orderData);
  }, 2000); // Simulate 2 second processing time
}

function generateOrderId() {
  return (
    "ORD-" +
    Date.now() +
    "-" +
    Math.random().toString(36).substr(2, 5).toUpperCase()
  );
}

function showOrderSuccess(orderData) {
  const successModal = document.getElementById("successMessage");
  successModal.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Order Placed Successfully!</h3>
            <p><strong>Order ID:</strong> ${orderData.orderId}</p>
            <p>Thank you for your purchase! You will receive a confirmation email shortly.</p>
            <p><strong>Total:</strong> ₹${orderData.totals.total.toFixed(2)}</p>
            <div style="margin-top: 20px;">
                <button class="btn-primary" onclick="closeSuccessMessage()" style="margin-right: 10px;">Continue Shopping</button>
                <button class="btn-secondary" onclick="viewOrderDetails('${
                  orderData.orderId
                }')">View Order Details</button>
            </div>
        </div>
    `;
  successModal.style.display = "block";
}

function closeSuccessMessage() {
  document.getElementById("successMessage").style.display = "none";
}

function viewOrderDetails(orderId) {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find((o) => o.orderId === orderId);

  if (order) {
    alert(
      `Order Details:\n\nOrder ID: ${order.orderId}\nStatus: ${
        order.status
      }\nTotal: ₹${order.totals.total.toFixed(2)}\nDate: ${new Date(
        order.orderDate
      ).toLocaleDateString()}`
    );
  }

  closeSuccessMessage();
}

function showLoadingSpinner() {
  document.getElementById("loadingSpinner").style.display = "flex";
}

function hideLoadingSpinner() {
  document.getElementById("loadingSpinner").style.display = "none";
}

// Notification Function
function showNotification(message, type) {
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    if (document.body.contains(notification)) {
      document.body.removeChild(notification);
    }
  }, 3000);
}

// Form Functions
function handleContactForm(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  // Process form data here
  console.log("Contact Form Data:", data);
  showNotification("Thank you for your message!", "success");
  form.reset();
}

function handleNewsletter(event) {
  event.preventDefault();
  const form = event.target;
  const email = form.email.value.trim();

  if (!email) {
    showNotification("Please enter your email address.", "error");
    return;
  }

  // Process newsletter subscription here
  console.log("Newsletter Email:", email);
  showNotification("You have been subscribed to our newsletter!", "success");
  form.reset();
}

// Card Formatting Functions
function formatCardNumber(event) {
  let value = event.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
  event.target.value = value;
}

function formatExpiryDate(event) {
  let value = event.target.value.replace(/\D/g, "");
  value = value.replace(/(\d{2})(?=\d)/g, "$1/");
  event.target.value = value;
}

// Function declaration for addToWishlistFromModal
function addToWishlistFromModal() {
  const modal = document.getElementById("productModal");
  const productId = Number.parseInt(modal.dataset.productId);
  const product = products.find((p) => p.id === productId);

  if (product) {
    toggleWishlist(productId);
    showNotification("Added to wishlist!", "success");
    closeProductModal();
  }
}

// Update shipping options based on country selection
function updateShippingOptions() {
  const country = document.getElementById("country").value;
  const shippingSelect = document.getElementById("shippingOption");

  // Clear existing options
  shippingSelect.innerHTML = '<option value="">Select Shipping</option>';

  if (country === "IN") {
    // Domestic India shipping
    shippingSelect.innerHTML += `
      <option value="199">Standard Delivery (3-5 days) - ₹199</option>
      <option value="299">Express Delivery (1-2 days) - ₹299</option>
      <option value="0">Free Delivery (5-7 days) - Free (Orders above ₹2500)</option>
    `;
  } else if (country && country !== "IN") {
    // International shipping
    shippingSelect.innerHTML += `
      <option value="999">Standard International (7-14 days) - ₹999</option>
      <option value="1999">Express International (3-7 days) - ₹1999</option>
      <option value="0">Free International (14-21 days) - Free (Orders above ₹10000)</option>
    `;
  }

  calculateCheckoutTotal();
}

// Handle payment method selection
document.addEventListener("DOMContentLoaded", () => {
  // Add event listeners for payment method changes
  document.querySelectorAll('input[name="paymentMethod"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      // Hide all payment details
      document.querySelectorAll(".payment-details").forEach((detail) => {
        detail.classList.add("hidden");
      });

      // Show selected payment method details
      const selectedMethod = this.value;
      const detailsId = selectedMethod + "Details";
      const detailsElement = document.getElementById(detailsId);

      if (detailsElement) {
        detailsElement.classList.remove("hidden");
      }

      // Update checkout total for COD charges
      calculateCheckoutTotal();
    });
  });
});

function displayOrderSummary() {
  const orderSummaryContainer = document.getElementById("orderSummary");
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = Number.parseInt(
    document.getElementById("shippingOption").value
  );
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  orderSummaryContainer.innerHTML = `
    <div class="order-summary-item">
      <span>Subtotal</span>
      <span>₹${subtotal.toFixed(2)}</span>
    </div>
    <div class="order-summary-item">
      <span>Shipping</span>
      <span>${shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
    </div>
    <div class="order-summary-item">
      <span>Tax (18%)</span>
      <span>₹${tax.toFixed(2)}</span>
    </div>
    <div class="order-summary-item total">
      <span>Total</span>
      <span>₹${total.toFixed(2)}</span>
    </div>
  `;
}
