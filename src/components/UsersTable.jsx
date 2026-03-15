import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UsersTable = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/users');
                setUsers(res.data.data.users);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`https://khadamati-backend-mifb.onrender.com/api/users/${id}`);
                setUsers(users.filter(u => u._id !== id));
            } catch (err) {
                alert('Deletion failed');
            }
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">User Management</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Controlling Platform Clients</p>
                </div>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100">
                    <span className="text-emerald-600 font-black text-xl">{users.length}</span>
                    <span className="text-slate-400 font-bold ml-2 text-sm uppercase">Total Users</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left bg-slate-50 text-slate-400 uppercase text-xs font-black tracking-widest">
                            <th className="px-10 py-6">User Details</th>
                            <th className="px-10 py-6">Role</th>
                            <th className="px-10 py-6">Joined Date</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {users.map(u => (
                            <tr key={u._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xl group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                                            {u.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-lg leading-tight">{u.name}</p>
                                            <p className="text-slate-400 font-bold text-sm tracking-tight">{u.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-tighter ${u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
                                        }`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-10 py-6 text-slate-500 font-bold">
                                    {new Date(u.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(u._id)}
                                        className="bg-red-50 hover:bg-red-600 text-red-500 hover:text-white px-5 py-2.5 rounded-2xl transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-sm hover:shadow-lg hover:shadow-red-100"
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && !loading && (
                            <tr>
                                <td colSpan="4" className="px-10 py-20 text-center">
                                    <div className="max-w-xs mx-auto">
                                        <svg className="w-16 h-16 text-slate-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                                        <p className="text-slate-400 font-black uppercase text-sm">No registered users found</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div className="py-20 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            )}
        </div>
    );
};

export default UsersTable;
