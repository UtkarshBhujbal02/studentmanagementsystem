let cachedStudents = [];

document.addEventListener('DOMContentLoaded', () => {
    loadStudents();

    document.getElementById('search-input').addEventListener('input', (e) => {
        searchStudents(e.target.value);
    });

    document.getElementById('open-add-modal-btn').addEventListener('click', openAddModal);
    
    document.getElementById('student-form').addEventListener('submit', (e) => {
        e.preventDefault();
        saveStudent();
    });

    document.getElementById('confirm-delete-btn').addEventListener('click', confirmDelete);
});

async function loadStudents() {
    const tbody = document.getElementById('students-table-body');
    showLoading(tbody);
    try {
        cachedStudents = await apiGet('/api/students');
        renderRows(cachedStudents);
    } catch (err) {
        if (err.message.includes('401')) {
            window.location.href = 'login.html';
        }
        showToast('Failed to load students', 'error');
        showEmptyState(tbody);
    }
}

function renderRows(students) {
    const tbody = document.getElementById('students-table-body');
    if (!students || students.length === 0) {
        showEmptyState(tbody);
        return;
    }
    
    tbody.innerHTML = students.map(s => `
        <tr>
            <td>${s.id}</td>
            <td>${escapeHtml(s.name)}</td>
            <td>${escapeHtml(s.email)}</td>
            <td>${s.age}</td>
            <td>${escapeHtml(s.course)}</td>
            <td>${new Date(s.createdDate).toLocaleDateString()}</td>
            <td>
                <button class="btn-ghost" style="padding: 4px 8px; font-size: 12px; margin-right: 4px;" onclick="openEditModal(${s.id})">Edit</button>
                <button class="btn-danger" style="padding: 4px 8px; font-size: 12px;" onclick="deleteStudent(${s.id}, '${escapeHtml(s.name.replace(/'/g, "\\'"))}')">Delete</button>
            </td>
        </tr>
    `).join('');
}

function searchStudents(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = cachedStudents.filter(s => 
        s.name.toLowerCase().includes(lowerQuery) || 
        s.email.toLowerCase().includes(lowerQuery)
    );
    renderRows(filtered);
}

function openAddModal() {
    document.getElementById('student-form').reset();
    document.getElementById('student-id').value = '';
    document.getElementById('modal-title').textContent = 'Add New Student';
    document.getElementById('save-btn').textContent = 'Save Student';
    openModal('student-modal');
}

async function openEditModal(id) {
    const s = cachedStudents.find(x => x.id === id);
    if (!s) return;
    
    document.getElementById('student-id').value = s.id;
    document.getElementById('name').value = s.name;
    document.getElementById('email').value = s.email;
    document.getElementById('age').value = s.age;
    document.getElementById('course').value = s.course;

    document.getElementById('modal-title').textContent = 'Edit Student';
    document.getElementById('save-btn').textContent = 'Update Student';
    openModal('student-modal');
}

async function saveStudent() {
    const id = document.getElementById('student-id').value;
    const body = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        age: parseInt(document.getElementById('age').value, 10),
        course: document.getElementById('course').value
    };

    try {
        if (id) {
            await apiPut(`/api/students/${id}`, body);
            showToast('Student updated successfully');
        } else {
            await apiPost('/api/students', body);
            showToast('Student added successfully');
        }
        closeModal('student-modal');
        loadStudents();
    } catch (err) {
        showToast('Error saving student', 'error');
    }
}

function deleteStudent(id, name) {
    document.getElementById('delete-student-id').value = id;
    document.getElementById('delete-text').textContent = `Are you sure you want to delete ${name}? This action cannot be undone.`;
    openModal('delete-modal');
}

async function confirmDelete() {
    const id = document.getElementById('delete-student-id').value;
    try {
        await apiDelete(`/api/students/${id}`);
        showToast('Student deleted successfully');
        closeModal('delete-modal');
        loadStudents();
    } catch (err) {
        showToast('Error deleting student', 'error');
    }
}

function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
