// Firebase Configuration
// Replace this with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Note: In a production environment, you would import Firebase SDK from CDN or npm
// For demo purposes, this shows the structure of the application

// Simulated Firebase-like functionality for demonstration
let currentUser = null;
let boxData = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    console.log('Firebase Box App initialized');
    checkAuthState();
});

// Authentication Functions
function checkAuthState() {
    // In a real app, this would check Firebase auth state
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showUserInterface();
    }
}

function signUp() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (!email || !password) {
        showMessage('Please enter email and password', 'error');
        return;
    }

    if (password.length < 6) {
        showMessage('Password should be at least 6 characters', 'error');
        return;
    }

    // Simulate Firebase auth
    currentUser = { email: email, uid: 'user_' + Date.now() };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showMessage('Account created successfully!', 'success');
    showUserInterface();
}

function signIn() {
    const email = document.getElementById('emailInput').value;
    const password = document.getElementById('passwordInput').value;

    if (!email || !password) {
        showMessage('Please enter email and password', 'error');
        return;
    }

    // Simulate Firebase auth
    currentUser = { email: email, uid: 'user_' + Date.now() };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showMessage('Signed in successfully!', 'success');
    showUserInterface();
}

function signOut() {
    currentUser = null;
    boxData = {};
    localStorage.removeItem('currentUser');
    localStorage.removeItem('boxData');
    
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('userInfo').style.display = 'none';
    document.getElementById('firebaseBox').style.display = 'none';
    document.getElementById('emailInput').value = '';
    document.getElementById('passwordInput').value = '';
    
    showMessage('Signed out successfully', 'success');
}

function showUserInterface() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('userInfo').style.display = 'block';
    document.getElementById('userEmail').textContent = currentUser.email;
    document.getElementById('firebaseBox').style.display = 'block';
    
    loadBoxData();
}

// Box Data Functions
function loadBoxData() {
    const savedData = localStorage.getItem('boxData_' + currentUser.uid);
    if (savedData) {
        boxData = JSON.parse(savedData);
        displayItems();
    }
}

function addItem() {
    const key = document.getElementById('itemKey').value;
    const value = document.getElementById('itemValue').value;

    if (!key || !value) {
        showMessage('Please enter both key and value', 'error');
        return;
    }

    boxData[key] = value;
    saveBoxData();
    displayItems();

    document.getElementById('itemKey').value = '';
    document.getElementById('itemValue').value = '';
    
    showMessage('Item added to box!', 'success');
}

function deleteItem(key) {
    delete boxData[key];
    saveBoxData();
    displayItems();
    showMessage('Item deleted from box', 'success');
}

function saveBoxData() {
    if (currentUser) {
        localStorage.setItem('boxData_' + currentUser.uid, JSON.stringify(boxData));
    }
}

function displayItems() {
    const container = document.getElementById('itemsContainer');
    
    if (Object.keys(boxData).length === 0) {
        container.innerHTML = '<p style="color: #999; font-style: italic;">Your box is empty. Add some items!</p>';
        return;
    }

    container.innerHTML = '';
    for (let key in boxData) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'item';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'item-content';
        
        const keyDiv = document.createElement('div');
        keyDiv.className = 'item-key';
        keyDiv.textContent = key;
        
        const valueDiv = document.createElement('div');
        valueDiv.className = 'item-value';
        valueDiv.textContent = boxData[key];
        
        contentDiv.appendChild(keyDiv);
        contentDiv.appendChild(valueDiv);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteItem(key));
        
        itemDiv.appendChild(contentDiv);
        itemDiv.appendChild(deleteBtn);
        container.appendChild(itemDiv);
    }
}

// Utility Functions
function showMessage(message, type) {
    const className = type === 'error' ? 'error-message' : 'success-message';
    const messageDiv = document.createElement('div');
    messageDiv.className = className;
    messageDiv.textContent = message;
    
    const authSection = document.getElementById('authSection');
    const existingMessage = authSection.querySelector('.error-message, .success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    authSection.insertBefore(messageDiv, authSection.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Export functions to global scope for onclick handlers
window.signUp = signUp;
window.signIn = signIn;
window.signOut = signOut;
window.addItem = addItem;
