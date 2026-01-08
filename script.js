// Initialize Store Data from LocalStorage or default
let apps = JSON.parse(localStorage.getItem('ojhaStoreApps')) || [
    {
        id: 1,
        name: "CupidChat",
        dev: "Avishek Ojha",
        icon: "https://cdn-icons-png.flaticon.com/512/2589/2589175.png",
        rating: "4.8",
        desc: "The ultimate dating app experience."
    }
];

// Navigation Logic
function showSection(sectionId) {
    document.getElementById('store-section').classList.remove('active-section');
    document.getElementById('admin-section').classList.remove('active-section');
    
    document.getElementById(sectionId + '-section').classList.add('active-section');
    
    if(sectionId === 'store') renderStore();
    if(sectionId === 'admin') renderAdmin();
}

// Render the Main Store
function renderStore() {
    const grid = document.getElementById('appGrid');
    grid.innerHTML = '';

    apps.forEach(app => {
        grid.innerHTML += `
            <div class="app-card" onclick="alert('${app.name} by ${app.dev}\\n\\n${app.desc}')">
                <img src="${app.icon}" alt="${app.name}">
                <div class="app-name">${app.name}</div>
                <div class="app-dev" style="font-size:12px; color:#01875f">${app.dev}</div>
                <div class="app-rating">${app.rating} ★</div>
            </div>
        `;
    });
}

// Render Admin Panel List
function renderAdmin() {
    const adminList = document.getElementById('adminAppList');
    adminList.innerHTML = '';

    apps.forEach((app, index) => {
        adminList.innerHTML += `
            <div class="admin-item">
                <div>
                    <strong>${app.name}</strong> - ${app.dev}
                </div>
                <button class="delete-btn" onclick="deleteApp(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });
}

// Add New App Logic
document.getElementById('appForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const newApp = {
        id: Date.now(),
        name: document.getElementById('appName').value,
        dev: document.getElementById('appDev').value,
        icon: document.getElementById('appIcon').value,
        rating: document.getElementById('appRating').value,
        desc: document.getElementById('appDesc').value
    };

    apps.push(newApp);
    saveAndRefresh();
    this.reset();
    alert("App published successfully to Ojha Store!");
});

// Delete App
function deleteApp(index) {
    if(confirm("Are you sure you want to remove this app?")) {
        apps.splice(index, 1);
        saveAndRefresh();
    }
}

// Save to LocalStorage
function saveAndRefresh() {
    localStorage.setItem('ojhaStoreApps', JSON.stringify(apps));
    renderStore();
    renderAdmin();
}

// Initial Load
window.onload = renderStore;