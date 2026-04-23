document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const errorMsg = document.getElementById('error-msg');
            
            errorMsg.style.display = 'none';

            try {
                const data = await apiPost('/api/auth/login', { username, password });
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } catch (err) {
                errorMsg.textContent = 'Invalid credentials';
                if (err.message.includes('401')) {
                    errorMsg.textContent = 'Invalid credentials';
                } else {
                    errorMsg.textContent = 'Login failed, try again';
                }
                errorMsg.style.display = 'block';
                document.getElementById('username').style.borderColor = '#DC2626';
                document.getElementById('password').style.borderColor = '#DC2626';
            }
        });
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = 'login.html';
        });
    }
});
