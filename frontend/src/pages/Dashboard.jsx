import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGet, apiPost, apiPut, apiDelete } from '../utils/api';
import img2 from '../assets/designed-for-you.png';


export default function Dashboard() {
    const [students, setStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [toast, setToast] = useState(null);
    const navigate = useNavigate();

    // Modals state
    const [isStudentModalOpen, setStudentModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

    // Form state
    const [editingId, setEditingId] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', age: '', course: '' });
    const [studentToDelete, setStudentToDelete] = useState(null);

    useEffect(() => {
        loadStudents();
    }, []);

    const showToast = (message, type = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const loadStudents = async () => {
        setIsLoading(true);
        try {
            const data = await apiGet('/api/students');
            setStudents(data);
        } catch (err) {
            if (err.message.includes('401')) {
                navigate('/login');
            } else {
                showToast('Failed to load students', 'error');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const openAddModal = () => {
        setEditingId(null);
        setFormData({ name: '', email: '', age: '', course: '' });
        setStudentModalOpen(true);
    };

    const openEditModal = (student) => {
        setEditingId(student.id);
        setFormData({
            name: student.name,
            email: student.email,
            age: student.age,
            course: student.course
        });
        setStudentModalOpen(true);
    };

    const openDeleteModal = (student) => {
        setStudentToDelete(student);
        setDeleteModalOpen(true);
    };

    const handleSaveStudent = async (e) => {
        e.preventDefault();
        const payload = {
            ...formData,
            age: parseInt(formData.age, 10)
        };

        try {
            if (editingId) {
                await apiPut(`/api/students/${editingId}`, payload);
                showToast('Student updated successfully');
            } else {
                await apiPost('/api/students', payload);
                showToast('Student added successfully');
            }
            setStudentModalOpen(false);
            loadStudents();
        } catch (err) {
            showToast('Error saving student', 'error');
        }
    };

    const handleDeleteStudent = async () => {
        if (!studentToDelete) return;
        try {
            await apiDelete(`/api/students/${studentToDelete.id}`);
            showToast('Student deleted successfully');
            setDeleteModalOpen(false);
            loadStudents();
        } catch (err) {
            showToast('Error deleting student', 'error');
        }
    };

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
            {/* Decorative Images */}
            {/* <img src={img1} alt="" style={{ position: 'fixed', top: '0', left: '0', width: 'clamp(180px, 25vw, 350px)', zIndex: -1, opacity: 0.9, pointerEvents: 'none' }} /> */}
            <img src={img2} alt="" style={{ position: 'fixed', bottom: '0', right: '0', width: 'clamp(180px, 25vw, 350px)', zIndex: -1, opacity: 0.9, pointerEvents: 'none' }} />

            <header style={{ position: 'relative', zIndex: 1, background: '#fff' }}>
                <div className="flex items-center gap-2">
                    <h3 style={{ fontWeight: '600', fontSize: '18px', color: '#111' }}>StudentManagementSystem</h3>
                </div>
                <button onClick={handleLogout} className="btn-ghost">
                    Logout
                </button>
            </header>

            <div className="main-content" style={{ position: 'relative', zIndex: 1 }}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: '4px', color: '#111' }}>Students Directory</h2>
                        <p style={{ color: '#666', fontSize: '15px' }}>Manage and organize all student records</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <input
                            type="text"
                            placeholder="Search students..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ width: '250px' }}
                        />
                        <button onClick={openAddModal} className="btn-primary">
                            + Add Student
                        </button>
                    </div>
                </div>

                <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Course</th>
                                    <th>Date Added</th>
                                    <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    Array.from({ length: 5 }).map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan="7"><div className="skeleton"></div></td>
                                        </tr>
                                    ))
                                ) : filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="text-center" style={{ padding: '60px', color: '#666' }}>
                                            <p style={{ fontSize: '16px' }}>No students found.</p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredStudents.map((s, index) => (
                                        <tr key={s.id}>
                                            <td style={{ color: '#666' }}>{index + 1}</td>
                                            <td style={{ fontWeight: '500', color: '#111' }}>{s.name}</td>
                                            <td style={{ color: '#111' }}>{s.email}</td>
                                            <td style={{ color: '#111' }}>{s.age}</td>
                                            <td style={{ color: '#111' }}>{s.course}</td>
                                            <td style={{ color: '#666' }}>{new Date(s.createdDate).toLocaleDateString()}</td>
                                            <td style={{ textAlign: 'right' }}>
                                                <button className="btn-ghost" style={{ padding: '6px 12px', marginRight: '8px', fontSize: '12px' }} onClick={() => openEditModal(s)}>
                                                    Edit
                                                </button>
                                                <button className="btn-danger" style={{ padding: '6px 12px', fontSize: '12px' }} onClick={() => openDeleteModal(s)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isStudentModalOpen && (
                <div className="modal-overlay" style={{ display: 'flex' }} onClick={() => setStudentModalOpen(false)}>
                    <div className="modal" onClick={e => e.stopPropagation()}>
                        <h2 className="mb-6" style={{ fontSize: '20px', fontWeight: '600', color: '#111' }}>
                            {editingId ? 'Edit Student' : 'Add New Student'}
                        </h2>
                        <form onSubmit={handleSaveStudent}>
                            <div className="form-group">
                                <label style={{ color: '#111' }}>Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ color: '#111' }}>Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                            <div className="flex gap-4">
                                <div className="form-group" style={{ flex: 1 }}>
                                    <label style={{ color: '#111' }}>Age</label>
                                    <input
                                        type="number"
                                        required
                                        min="1"
                                        value={formData.age}
                                        onChange={e => setFormData({ ...formData, age: e.target.value })}
                                    />
                                </div>
                                <div className="form-group" style={{ flex: 2 }}>
                                    <label style={{ color: '#111' }}>Course</label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.course}
                                        onChange={e => setFormData({ ...formData, course: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="text-right mt-6 flex gap-2 justify-end">
                                <button type="button" className="btn-ghost" onClick={() => setStudentModalOpen(false)}>Cancel</button>
                                <button type="submit" className="btn-primary">
                                    {editingId ? 'Update Student' : 'Save Student'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isDeleteModalOpen && (
                <div className="modal-overlay" style={{ display: 'flex' }} onClick={() => setDeleteModalOpen(false)}>
                    <div className="modal" style={{ width: '400px' }} onClick={e => e.stopPropagation()}>
                        <h2 className="mb-4" style={{ fontSize: '20px', fontWeight: '600', color: '#111' }}>Delete Student</h2>
                        <p className="mb-6" style={{ color: '#666' }}>
                            Are you sure you want to delete <strong style={{ color: '#111' }}>{studentToDelete?.name}</strong>? This action cannot be undone.
                        </p>
                        <div className="text-right flex gap-2 justify-end">
                            <button type="button" className="btn-ghost" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn-danger" onClick={handleDeleteStudent}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`toast ${toast.type}`} style={{ display: 'block' }}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
