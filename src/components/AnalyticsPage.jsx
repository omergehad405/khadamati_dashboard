import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <div className="py-20 flex justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div></div>;

    return (
        <div className="space-y-12 animate-fade-in">
            <header>
                <h2 className="text-4xl font-black text-slate-900 leading-tight">Platform <span className="text-emerald-600">Intelligence</span></h2>
                <p className="text-slate-400 font-bold mt-2 text-lg">Detailed analytical breakdown of Khadamati statistics.</p>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Profession Distribution */}
                <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Profession Distribution</h3>
                        <span className="bg-emerald-50 text-emerald-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100">Market Share</span>
                    </div>
                    <div className="space-y-6">
                        {stats.jobTypeStats?.map((cat, i) => {
                            const percentage = Math.round((cat.count / stats.totalWorkers) * 100);
                            return (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="font-black text-slate-700 text-sm uppercase">{cat._id}</span>
                                        <span className="text-slate-400 font-black text-xs">{percentage}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                        <div
                                            className="h-full bg-emerald-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Regional Reports - Dynamic */}
                <div className="bg-emerald-950 p-10 rounded-[3rem] shadow-2xl shadow-emerald-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <h3 className="text-xl font-black text-white px-4 py-2 border border-emerald-500/30 rounded-2xl inline-block uppercase tracking-widest text-[10px] mb-8 relative z-10">Regional Reports</h3>

                    <div className="space-y-5 relative z-10">
                        {stats.cityStats && stats.cityStats.length > 0 ? (() => {
                            const max = stats.cityStats[0].count;
                            return stats.cityStats.map((city, i) => {
                                const pct = Math.round((city.count / max) * 100);
                                return (
                                    <div key={i} className={i > 0 ? 'pt-5 border-t border-white/10' : ''}>
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-white font-black text-lg">{city._id}</h4>
                                            <span className="bg-white/10 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-white/10">
                                                {city.count} Worker{city.count !== 1 ? 's' : ''}
                                            </span>
                                        </div>
                                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-emerald-400 rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${pct}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            });
                        })() : (
                            <p className="text-emerald-300/60 font-bold text-sm italic">No regional data available.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Growth Cards - Dynamic */}
            <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2">Worker / User Ratio</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">
                        {stats.totalUsers > 0 ? (stats.totalWorkers / stats.totalUsers).toFixed(2) : '—'}
                    </p>
                    <div className="mt-4 text-slate-400 text-[10px] font-black uppercase">
                        {stats.totalWorkers} workers for {stats.totalUsers} users
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2">Avg Platform Rating</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">
                        {stats.averageRating > 0 ? `${stats.averageRating}/5` : '—'}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-4 h-4 ${i < Math.round(stats.averageRating) ? 'fill-current' : 'text-slate-200 fill-current'}`} viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100">
                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest mb-2">Active Cities</p>
                    <p className="text-4xl font-black text-slate-800 tracking-tight">{stats.totalCities || '—'}</p>
                    <p className="text-[10px] text-slate-400 font-bold mt-4 uppercase">
                        {stats.totalCities > 0 ? `Serving ${stats.totalCities} cities nationwide` : 'No city data yet'}
                    </p>
                </div>
            </div>

        </div>
    );
};

export default AnalyticsPage;
