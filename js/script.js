
// Configuration - CHANGE THESE TO YOUR DETAILS
const SHOP_CONFIG = {
    whatsappNumber: '+91 8903166611', // Format: country code + number (no + or spaces)
    email: 'achyutgrapix@gamil.com',
    shopName: 'Achyut Grapix'
};

let currentCategory = null;
let currentSubcategory = null;
let currentQuantity = 1;
let currentImageIndex = 0;
let currentProduct = null;

// Generate Order Number
function generateOrderNumber() {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `ORD-${dateStr}-${randomNum}`;
}
/*
// Build Order Message
function buildOrderMessage(product, selectedOptions) {
    const orderNumber = generateOrderNumber();
       // Get the dynamically calculated price from the page
    const priceEl = document.getElementById('product-price-large');
    const total = priceEl ? parseFloat(priceEl.textContent) : product.price;
    
    let message = `🛍️ *NEW ORDER FROM ${SHOP_CONFIG.shopName}*\n\n`;
    message += `📋 *Order Number:* ${orderNumber}\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString()}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📦 *PRODUCT DETAILS*\n`;
    message += `*Product:* ${product.name}\n`;

    
    if (Object.keys(selectedOptions).length > 0) {
        message += `*Selected Options:*\n`;
        for (const [key, value] of Object.entries(selectedOptions)) {
            message += `  • ${key}: ${value}\n`;
        }
        message += `\n`;
    }
    
    message += `💰 *Total Amount: ${total}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please confirm this order and provide delivery details. Thank you! 🙏`;
    
    return message;
}*/

// Build Order Message
function buildOrderMessage(product, selectedOptions) {
    const orderNumber = generateOrderNumber();

    // Get dynamically calculated total price
    const priceEl = document.getElementById('product-price-large');
    const total = priceEl ? parseFloat(priceEl.textContent) : product.price;

    let message = `🛍️ *NEW ORDER FROM ${SHOP_CONFIG.shopName}*\n\n`;
    message += `📋 *Order Number:* ${orderNumber}\n`;
    message += `📅 *Date:* ${new Date().toLocaleDateString()}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `📦 *PRODUCT DETAILS*\n`;
    message += `*Product:* ${product.name}\n`;
    message += `*Quantity:* ${currentQuantity}\n`;

    if (Object.keys(selectedOptions).length > 0) {
        message += `*Selected Options:*\n`;
        for (const [key, value] of Object.entries(selectedOptions)) {
            message += `  • ${key}: ${value}\n`;
        }
        message += `\n`;
    }

    message += `💰 *Total Amount:* ${total.toFixed(2)}\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `Please confirm this order and provide delivery details. Thank you! 🙏`;

    return message;
}





// Get Selected Options
function getSelectedOptions() {
    const options = {};
    if (!currentProduct) return options;
    
    for (const optionKey of Object.keys(currentProduct.options)) {
        const selectElement = document.getElementById(optionKey);
        if (selectElement) {
            options[optionKey] = selectElement.value;
        }
    }
    
    return options;
}

// Order via WhatsApp
function orderViaWhatsApp() {
    const selectedOptions = getSelectedOptions();
    const message = buildOrderMessage(currentProduct, selectedOptions, currentQuantity);
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${SHOP_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');
}

// Order via Email
function orderViaEmail() {
    const selectedOptions = getSelectedOptions();
    const message = buildOrderMessage(currentProduct, selectedOptions, currentQuantity);
    const orderNumber = generateOrderNumber();
    const subject = encodeURIComponent(`New Order ${orderNumber} - ${currentProduct.name}`);
    const body = encodeURIComponent(message);
    const mailtoURL = `mailto:${SHOP_CONFIG.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoURL;
}

// Back to Top
window.addEventListener('scroll', function() {
    const backToTop = document.getElementById('backToTop');
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const overlay = document.getElementById('menuOverlay');
    menu.classList.remove('active');
    overlay.classList.remove('active');
}

// Loading
function showLoading() {
    document.getElementById('loading').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

function transitionPage(callback) {
    showLoading();
    setTimeout(() => {
        callback();
        hideLoading();
    }, 300);
}

// Navigation
function showCategories() {
    transitionPage(() => {
        hideAllPages();
        document.getElementById('categories').style.display = 'grid';
        document.getElementById('breadcrumb').innerHTML = '<span onclick="showCategories()">Home</span>';
        
        const container = document.getElementById('categories');
        container.innerHTML = '';
        container.className = 'grid page-transition';
        
        data.categories.forEach(category => {
            const card = createCard(category, () => showSubcategories(category));
            container.appendChild(card);
        });
    });
}

function showAboutPage() {
    transitionPage(() => {
        hideAllPages();
        document.getElementById('aboutPage').style.display = 'block';
        document.getElementById('aboutPage').className = 'content-page page-transition';
        document.getElementById('breadcrumb').innerHTML = '<span onclick="showCategories()">Home</span> > About';
    });
}

function showContactPage() {
    transitionPage(() => {
        hideAllPages();
        document.getElementById('contactPage').style.display = 'block';
        document.getElementById('contactPage').className = 'content-page page-transition';
        document.getElementById('breadcrumb').innerHTML = '<span onclick="showCategories()">Home</span> > Contact';
    });
}

function hideAllPages() {
    document.getElementById('categories').style.display = 'none';
    document.getElementById('subcategories').style.display = 'none';
    document.getElementById('products').style.display = 'none';
    document.getElementById('productDetail').classList.remove('active');
    document.getElementById('aboutPage').style.display = 'none';
    document.getElementById('contactPage').style.display = 'none';
}

function submitContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    alert(`Thank you ${name}! Your message has been sent.`);
    event.target.reset();
}

function showSubcategories(category) {
    transitionPage(() => {
        currentCategory = category;
        hideAllPages();
        document.getElementById('subcategories').style.display = 'grid';
        document.getElementById('breadcrumb').innerHTML = `
            <span onclick="showCategories()">Home</span> > ${category.name}
        `;
        
        const container = document.getElementById('subcategories');
        container.innerHTML = '';
        container.className = 'grid page-transition';
        
        category.subcategories.forEach(subcategory => {
            const card = createCard(subcategory, () => showProducts(subcategory));
            container.appendChild(card);
        });
    });
}

function showProducts(subcategory) {
    transitionPage(() => {
        currentSubcategory = subcategory;
        hideAllPages();
        document.getElementById('products').style.display = 'grid';
        document.getElementById('breadcrumb').innerHTML = `
            <span onclick="showCategories()">Home</span> > 
            <span onclick="showSubcategories(currentCategory)">${currentCategory.name}</span> > 
            ${subcategory.name}
        `;
        
        const container = document.getElementById('products');
        container.innerHTML = '';
        container.className = 'grid page-transition';
        
        const products = data.products[subcategory.id] || [];
        products.forEach(product => {
            const card = createProductCard(product);
            container.appendChild(card);
            
        });
    });
    
}
/*
// Quick View
function openQuickView(product, event) {
    event.stopPropagation();
    currentProduct = product;
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    let optionsHTML = '';
    for (const [key, values] of Object.entries(product.options)) {
        optionsHTML += `
            <div class="option-group">
                <label for="${key}">${key}:</label>
                <select id="${key}" onchange="updateDynamicPrice(currentProduct)">
                    ${Object.entries(values).map(([value, price]) => 
                        `<option value="${value}" data-price="${price}">${value}</option>`
                    ).join('')}
                </select>
            </div>
        `;
    }
    const badgeHTML = product.badge ? `<span class="badge ${product.badge}">${product.badge}</span>` : '';
    
    content.innerHTML = `
        <div class="zoom-container">
            ${badgeHTML}
            <img src="${product.images[0]}" alt="${product.name}" class="zoom-image" onmousemove="zoomImage(event)" onmouseleave="resetZoom(event)">
        </div>
        <div class="product-info">
            <h1>${product.name}</h1>
            <div class="product-price-large" id="product-price-large">${product.price.toFixed(2)}</div>
            <p style="margin-bottom: 2rem; color: #666;">${product.description}</p>
            ${optionsHTML}
            <button class="btn btn-email" onclick="viewFullProduct(${product.id})" style="width: 100%;">View Full Details</button>
        </div>
    `;
    
    modal.classList.add('active');
    updateDynamicPrice();
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
}

function viewFullProduct(productId) {
    closeQuickView();
    const products = data.products[currentSubcategory.id] || [];
    const product = products.find(p => p.id === productId);
    if (product) {        
        showProductDetail(product);
    }
}
*/
// Image Zoom
function zoomImage(event) {
    const img = event.currentTarget;
    const rect = img.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
}

function resetZoom(event) {
    event.currentTarget.style.transformOrigin = 'center center';
}


function showProductDetail(product) {
    transitionPage(() => {
        currentProduct = product;
        currentImageIndex = 0;
        hideAllPages();

        const detailContainer = document.getElementById('productDetail');
        detailContainer.classList.add('active');
        detailContainer.className = 'product-detail active page-transition';
        
        document.getElementById('breadcrumb').innerHTML = `
            <span onclick="showCategories()">Home</span> > 
            <span onclick="showSubcategories(currentCategory)">${currentCategory.name}</span> > 
            <span onclick="showProducts(currentSubcategory)">${currentSubcategory.name}</span> > 
            ${product.name}
        `;
        
        const thumbnailsHTML = product.images.map((img, index) => 
            `<img src="${img}" alt="View ${index + 1}" class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeImage(${index}, ${product.id})">`
        ).join('');
        
        let optionsHTML = '';
        for (const [key, values] of Object.entries(product.options)) {
            
            optionsHTML += `
                <div class="option-group">
                    <label for="${key}">${key}:</label>
                    <select id="${key}" onchange="updateDynamicPrice(currentProduct)">
                        ${Object.entries(values).map(([value, price]) => 
                            `<option value="${value}" data-price="${price}">${value}</option>`
                        ).join('')}
                    </select>
                </div>
            `;
            
        }

        const badgeHTML = product.badge ? `<span class="badge ${product.badge}">${product.badge}</span>` : '';
        
        detailContainer.innerHTML = `
            <div class="image-gallery">
                <div class="main-image-container">
                    ${badgeHTML}
                    <img src="${product.images[0]}" alt="${product.name}" class="product-image-large" id="mainImage" onmousemove="zoomImage(event)" onmouseleave="resetZoom(event)">
                </div>
                <div class="thumbnail-container">
                    ${thumbnailsHTML}
                </div>
            </div>
            <div class="product-info">
                <button class="btn btn-back" onclick="showProducts(currentSubcategory)">← Back to Products</button>
                <h1>${product.name}</h1>
                <div class="product-price-large" id="product-price-large">
                    ₹ ${product.price.toFixed(2)}</div>                   
                    
                ${optionsHTML}              

                <p class="delivery"><span class="warning">⏱️</span> 2 Days Delivery (From Ordered Date)</p>
                <div class="order-buttons">
                    <button class="btn btn-whatsapp" onclick="orderViaWhatsApp()">
                        <span style="font-size: 1.3rem;">💬</span> Order via WhatsApp
                    </button>
                    <button class="btn btn-email" onclick="orderViaEmail()">
                        <span style="font-size: 1.3rem;">📧</span> Order via Email
                    </button>
                </div>
            </div>
            <div><p style="margin-bottom: 2rem; color: #666;">${product.description}</p></div>
        `;
        updateDynamicPrice()
    });
}


// Image Gallery
function changeImage(index, productId) {
    currentImageIndex = index;
    const mainImage = document.getElementById('mainImage');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    const products = data.products[currentSubcategory.id] || [];
    const product = products.find(p => p.id === productId);
    
    if (product && product.images[index]) {
        mainImage.src = product.images[index];
        thumbnails.forEach((thumb, i) => {
            if (i === index) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
            }
        });
    }
}


// Card Creation
function createCard(item, onClick) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = onClick;
    
    card.innerHTML = `
        <div class="card-image-container">
            <img src="${item.image}" alt="${item.name}" class="card-image">
            <div><button class="quick-view-btn">Buy Now</button></div>
        </div>
        <div class="card-content">
            <div class="card-title">${item.name}</div>
            <div class="card-description">${item.description}</div>            
        </div>
        
    `;
    
    return card;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.onclick = () => showProductDetail(product);
    
    const badgeHTML = product.badge ? `<span class="badge ${product.badge}">${product.badge}</span>` : '';
    const productStr = JSON.stringify(product).replace(/"/g, '&quot;');
    
    card.innerHTML = `
        <div class="card-image-container">
            ${badgeHTML}
            <img src="${product.images[0]}" alt="${product.name}" class="card-image"> 
            <div><button class="quick-view-btn">Buy Now</button></div>
        </div>
        <div class="card-content">
            <div class="card-title">${product.name}</div>
            <div class="card-description">${product.description}</div>
            <div class="card-price">${product.price.toFixed(2)}</div>
        </div>
    `;
    return card;
    
}


// Update Dynamic Price
function updateDynamicPrice() {
    if (!currentProduct) return;

    let basePrice = 0 ;
    let quantity = 1;
    let totalPrice = 0;

    for (const [key, values] of Object.entries(currentProduct.options)) {
        const select = document.getElementById(key);
        if (!select) continue;

        const selectedOption = select.options[select.selectedIndex || 0];
        const addPrice = parseFloat(selectedOption.getAttribute("data-price")) || 0;
        if (key.toLowerCase() === "quantity") {
            quantity = parseInt(selectedOption.getAttribute("data-price")) || 1;
            currentQuantity = quantity; // update global
        } else {
            basePrice += addPrice;
        }
    }

    totalPrice = basePrice * quantity;

    // Update the price on the page
    let priceEl = ''
     priceEl = document.getElementById("product-price-large");
    console.log(priceEl);
    if (priceEl) {
    priceEl.textContent = `₹${totalPrice.toFixed(2)}`;
    }
}




// Initialize
// Load JSON and Initialize
fetch("./data/product.json")
  .then(response => {
      if (!response.ok) throw new Error("Network response was not OK");
      return response.json();
  })
  .then(jsonData => {
      data = jsonData;
      showCategories();
  })
  .catch(error => {
      console.error("❌ Error loading product.json:", error);
      alert("⚠️ Failed to load product data. Check console for details.");
  });


