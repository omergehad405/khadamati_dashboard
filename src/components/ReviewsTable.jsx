import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

const ReviewsTable = () => {
    const { t } = useTranslation();
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/reviews');
                setReviews(res.data.data.reviews);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleDelete = async (workerId, reviewId) => {
        if (window.confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
            try {
                await axios.delete(`https://khadamati-backend-mifb.onrender.com/api/reviews/${workerId}/${reviewId}`);
                setReviews(reviews.filter(rev => rev._id !== reviewId));
            } catch (err) {
                alert('Deletion failed');
            }
        }
    };

    return (
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
            <div className="px-10 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                    <h2 className="text-3xl font-black text-slate-900">Global Review Management</h2>
                    <p className="text-slate-400 font-bold mt-1 uppercase text-xs tracking-widest">Moderating User Feedback Across All Services</p>
                </div>
                <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-slate-100">
                    <span className="text-emerald-600 font-black text-xl">{reviews.length}</span>
                    <span className="text-slate-400 font-bold ml-2 text-sm uppercase">Total Reviews</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="text-left bg-slate-50 text-slate-400 uppercase text-xs font-black tracking-widest">
                            <th className="px-10 py-6">Review Content</th>
                            <th className="px-10 py-6">Worker (Target)</th>
                            <th className="px-10 py-6">Rating</th>
                            <th className="px-10 py-6">Date</th>
                            <th className="px-10 py-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {reviews.map(rev => (
                            <tr key={rev._id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-10 py-6 max-w-md">
                                    <div className="flex flex-col">
                                        <p className="font-black text-slate-800 text-base leading-tight">"{rev.comment}"</p>
                                        <p className="text-slate-400 font-bold text-[10px] mt-1 uppercase tracking-widest">By {rev.reviewerName} ({rev.reviewerEmail})</p>
                                    </div>
                                </td>
                                <td className="px-10 py-6">
                                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-200">
                                        {rev.workerName}
                                    </span>
                                </td>
                                <td className="px-10 py-6">
                                    <div className="flex items-center gap-1 text-amber-500">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < rev.rating ? 'fill-current' : 'text-slate-200'}`} viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-10 py-6 text-slate-500 font-bold text-sm whitespace-nowrap">
                                    {new Date(rev.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-10 py-6 text-right">
                                    <button
                                        onClick={() => handleDelete(rev.workerId, rev._id)}
                                        className="bg-red-50 hover:bg-red-600 text-red-500 hover:text-white px-5 py-2 rounded-2xl transition-all duration-300 font-black text-[10px] uppercase tracking-widest"
                                    >
                                        Delete
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
            {!loading && reviews.length === 0 && (
                <div className="py-20 text-center text-slate-400 font-bold italic">No platform reviews found yet.</div>
            )}
        </div>
    );
};

export default ReviewsTable;
