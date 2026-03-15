import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkersTable = () => {
    const [workers, setWorkers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/workers');
                setWorkers(res.data.data.workers);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this worker completely from the platform?')) {
            try {
                await axios.delete(`https://khadamati-backend-mifb.onrender.com/api/workers/${id}`);
                setWorkers(workers.filter(w => w._id !== id));
            } catch (err) {
                alert('Deletion failed');
            }
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">Worker Management</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Managing Registered Service Providers</p>
                </div>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100 text-emerald-600 font-black text-xl">
                    {workers.length} <span className="text-slate-400 text-sm uppercase ml-1">Total</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left bg-slate-50 text-slate-400 uppercase text-xs font-black tracking-widest">
                            <th className="px-10 py-6">Worker Profile</th>
                            <th className="px-10 py-6">Profession</th>
                            <th className="px-10 py-6">Region</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {workers.map(w => (
                            <tr key={w._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                                            <img
                                                src={w.images?.length > 0 ? `https://khadamati-backend-mifb.onrender.com${w.images[0]}` : "https://placehold.co/100x100?text=Worker"}
                                                alt={w.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-800 text-lg leading-tight group-hover:text-emerald-700 transition-colors">{w.name}</p>
                                            <p className="text-slate-400 font-bold text-sm tracking-tight">{w.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span className="bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100">
                                        {w.jobType}
                                    </span>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-2 text-slate-500 font-bold">
                                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        {w.city}
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(w._id)}
                                        className="bg-red-50 hover:bg-red-600 text-red-500 hover:text-white px-5 py-2.5 rounded-2xl transition-all duration-300 font-black text-xs uppercase tracking-widest shadow-sm hover:shadow-lg hover:shadow-red-100"
                                    >
                                        Terminate
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {loading && (
                <div className="py-20 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            )}
            {workers.length === 0 && !loading && (
                <div className="py-20 text-center">
                    <p className="text-slate-400 font-bold">No workers currently registered.</p>
                </div>
            )}
        </div>
    );
};

export default WorkersTable;
