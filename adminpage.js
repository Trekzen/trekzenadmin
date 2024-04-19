// adminpage.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getFirestore, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-firestore.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3GccrbGOWYeJb1IwwrAnoStVtouHmo-g",
    authDomain: "trekzen2024.firebaseapp.com",
    projectId: "trekzen2024",
    storageBucket: "trekzen2024.appspot.com",
    messagingSenderId: "539096075945",
    appId: "1:539096075945:web:88e4786b9f407a2e32e3b8",
    measurementId: "G-9ZD4X1PMM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function loadBusinessRequests() {
    const q = query(collection(db, "businesses"), where("approval", "==", "Not Approved Yet"));
    const querySnapshot = await getDocs(q);
    const businesses = [];

    querySnapshot.forEach((doc) => {
        businesses.push({ id: doc.id, ...doc.data() }); // Include id field
    });

    return businesses;
}

document.addEventListener('DOMContentLoaded', async function () {
    const businessRequestsContainer = document.getElementById('businessRequests');

    const businesses = await loadBusinessRequests();

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Business Name', 'Location', 'Type', 'Approval'];

    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    businesses.forEach(business => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = business.name || 'N/A';
        row.appendChild(nameCell);

        const locationCell = document.createElement('td');
        locationCell.textContent = business.location || 'N/A';
        row.appendChild(locationCell);

        const typeCell = document.createElement('td');
        typeCell.textContent = business.type || 'N/A';
        row.appendChild(typeCell);

        const approvalCell = document.createElement('td');
        approvalCell.textContent = business.approval || 'N/A';
        row.appendChild(approvalCell);

        // Add Edit button
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editApproval(business.id, approvalCell));
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Add Edit button styling
        editButton.style.backgroundColor = '#007bff'; // Blue background color
        editButton.style.color = '#fff'; // White text color
        editButton.style.border = 'none'; // Remove default border
        editButton.style.padding = '8px 12px'; // Add padding
        editButton.style.borderRadius = '4px'; // Add border radius
        editButton.style.cursor = 'pointer'; // Change cursor to pointer on hover

        tbody.appendChild(row);
    });

    // Add editApproval function
    async function editApproval(id, cell) {
        const newApproval = prompt('Enter new approval status:');
        if (newApproval !== null) {
            try {
                await updateApproval(id, newApproval);
                cell.textContent = newApproval;
            } catch (error) {
                console.error('Error updating approval:', error);
                alert('Failed to update approval.');
            }
        }
    }

    async function updateApproval(id, newApproval) {
        // Get reference to the document
        const businessRef = doc(db, 'businesses', id);

        // Update the document
        await updateDoc(businessRef, {
            approval: newApproval
        });
    }
    table.appendChild(tbody);
    businessRequestsContainer.appendChild(table);
});


//here starts code for new places
async function loadPlaceRequests() {
    const q = query(collection(db, "newplace"), where("approval", "==", "Not Approved Yet"));
    const querySnapshot = await getDocs(q);
    const places = [];

    querySnapshot.forEach((doc) => {
        places.push({ id: doc.id, ...doc.data() }); // Include id field
    });

    return places;
}

document.addEventListener('DOMContentLoaded', async function () {
    const placeRequestsContainer = document.getElementById('placeRequests');

    const places = await loadPlaceRequests();

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    const headers = ['Place Name', 'Location', 'Type', 'Approval'];

    const headerRow = document.createElement('tr');

    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    places.forEach(place => {
        const row = document.createElement('tr');

        const pnameCell = document.createElement('td');
        pnameCell.textContent = place.name || 'N/A';
        row.appendChild(pnameCell);

        const plocationCell = document.createElement('td');
        plocationCell.textContent = place.location || 'N/A';
        row.appendChild(plocationCell);

        const ptypeCell = document.createElement('td');
        ptypeCell.textContent = place.type || 'N/A';
        row.appendChild(ptypeCell);

        const papprovalCell = document.createElement('td');
        papprovalCell.textContent = place.approval || 'N/A';
        row.appendChild(papprovalCell);

        // Add Edit button
        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => peditApproval(place.id, papprovalCell));
        editCell.appendChild(editButton);
        row.appendChild(editCell);

        // Add Edit button styling
        editButton.style.backgroundColor = '#007bff'; // Blue background color
        editButton.style.color = '#fff'; // White text color
        editButton.style.border = 'none'; // Remove default border
        editButton.style.padding = '8px 12px'; // Add padding
        editButton.style.borderRadius = '4px'; // Add border radius
        editButton.style.cursor = 'pointer'; // Change cursor to pointer on hover

        tbody.appendChild(row);
    });

    // Add editApproval function
    async function peditApproval(id, cell) {
        const newApproval = prompt('Enter new approval status:');
        if (newApproval !== null) {
            try {
                await pupdateApproval(id, newApproval);
                cell.textContent = newApproval;
            } catch (error) {
                console.error('Error updating approval:', error);
                alert('Failed to update approval.');
            }
        }
    }

    async function pupdateApproval(id, newApproval) {
        // Get reference to the document
        const placeRef = doc(db, 'newplace', id);

        // Update the document
        await updateDoc(placeRef, {
            approval: newApproval
        });
    }
    table.appendChild(tbody);
    placeRequestsContainer.appendChild(table);
});