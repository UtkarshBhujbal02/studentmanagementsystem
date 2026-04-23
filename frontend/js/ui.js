function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function showLoading(tbody) {
    tbody.innerHTML = '';
    for (let i = 0; i < 5; i++) {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td colspan="7"><div class="skeleton"></div></td>`;
        tbody.appendChild(tr);
    }
}

function showEmptyState(tbody) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 48px; color: #666;">No students found.</td></tr>`;
}

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(el => el.style.display = 'none');
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
});

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        closeAllModals();
    }
});

document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        closeModal(e.target.dataset.target);
    });
});
