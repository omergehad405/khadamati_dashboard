import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import WorkersTable from './components/WorkersTable'
import UsersTable from './components/UsersTable'

const SidebarItem = ({ to, icon, label, t }) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
        <Link
            to={to}
            className={`flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold group ${isActive
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 translate-x-1'
                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                }`}
        >
            <span className={`transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-emerald-500'}`}>
                {icon}
            </span>
            {t(label)}
        </Link>
    );
};

import AnalyticsPage from './components/AnalyticsPage'
import ReviewsTable from './components/ReviewsTable'

function AppContent() {
    const { i18n, t } = useTranslation();
    const [stats, setStats] = useState({
        totalWorkers: 0,
        totalUsers: 0,
        totalReviews: 0,
        averageRating: 0,
        totalCities: 0,
        recentWorkers: [],
        recentUsers: [],
        jobTypeStats: [],
        cityStats: []
    });
    const [statsLoading, setStatsLoading] = useState(true);

    useEffect(() => {
        document.dir = i18n.dir();
        document.documentElement.lang = i18n.language;
    }, [i18n, i18n.language]);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/stats');
                setStats(res.data.data);
            } catch (err) {
                console.error('Failed to fetch stats:', err);
            } finally {
                setStatsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Workers', val: stats.totalWorkers, color: 'emerald', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
        { label: 'Active Users', val: stats.totalUsers, color: 'teal', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
        { label: 'Total Reviews', val: stats.totalReviews, color: 'amber', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
            {/* Minimal Header */}
            <header className="h-20 glass-effect sticky top-0 z-50 flex items-center justify-between px-8 border-b border-slate-200">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                        <span className="text-white font-black text-xl">K</span>
                    </div>
                    <span className="text-xl font-black tracking-tight text-slate-800 uppercase">
                        KHADAMATI <span className="text-emerald-600">ADMIN</span>
                    </span>
                </div>

                <div className="flex items-center gap-6">
                    <button
                        onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')}
                        className="emerald-glass px-6 py-2.5 rounded-full text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition-all border border-emerald-200 flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5c1.382 1.154 2.33 2.536 2.848 4.053m4.401 0a18.022 18.022 0 00-3.353-8.947m-3.9 8.947l.001-.001z"></path></svg>
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </button>
                    <div className="flex items-center gap-3 border-l pl-6 border-slate-200">
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shadow-sm border-2 border-white">
                            <img src="https://placehold.co/100x100?text=A" alt="Admin" />
                        </div>
                        <div className="hidden lg:block">
                            <p className="text-sm font-black text-slate-800 leading-none">Super Admin</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Management</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Modern Sidebar */}
                <aside className="w-80 bg-white border-r border-slate-100 p-6 hidden lg:block">
                    <nav className="space-y-2">
                        <SidebarItem
                            to="/"
                            t={t}
                            label="Home"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>}
                        />
                        <SidebarItem
                            to="/analytics"
                            t={t}
                            label="Analytics"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>}
                        />
                        <SidebarItem
                            to="/workers"
                            t={t}
                            label="Workers"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>}
                        />
                        <SidebarItem
                            to="/users"
                            t={t}
                            label="Users"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>}
                        />
                        <SidebarItem
                            to="/reviews"
                            t={t}
                            label="Reviews"
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>}
                        />
                    </nav>

                    <div className="mt-auto pt-10">
                        <div className="p-6 bg-emerald-900 rounded-3xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/20 rounded-full blur-2xl -mr-10 -mt-10"></div>
                            <h4 className="font-black text-white text-sm relative z-10">System v2.1.0</h4>
                            <p className="text-[10px] text-emerald-300 font-bold mt-1 relative z-10 uppercase tracking-widest">Enterprise Edition</p>
                            <div className="mt-4 flex items-center gap-2 relative z-10">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></div>
                                <span className="text-[10px] text-emerald-100 font-bold">Cloud Sync Active</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
                    <div className="max-w-7xl mx-auto animate-fade-in">
                        <Routes>
                            <Route path="/" element={
                                <div className="space-y-12">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div>
                                            <h2 className="text-5xl font-black text-slate-900 leading-tight tracking-tight">
                                                {t('WelcomeBack')}, <span className="text-emerald-600">Admin</span>
                                            </h2>
                                            <p className="text-slate-400 font-bold mt-2 text-lg">Real-time overview of your service marketplace.</p>
                                        </div>
                                        <div className="bg-white px-8 py-5 rounded-[2rem] shadow-sm border border-slate-100 flex items-center gap-4">
                                            <div className="flex -space-x-3">
                                                {[1, 2, 3].map(i => (
                                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Active Admin" />
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="border-l pl-4 border-slate-200">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Global Reach</p>
                                                <p className="text-sm font-black text-slate-800 mt-1 uppercase">{statsLoading ? '...' : `${stats.totalCities} ${stats.totalCities === 1 ? 'City' : 'Cities'} Online`}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                        {statCards.map((stat, i) => (
                                            <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-slate-100 transition-all duration-500 group relative overflow-hidden">
                                                <div className={`absolute -right-8 -bottom-8 w-32 h-32 bg-${stat.color}-50 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-700`}></div>
                                                <div className={`w-16 h-16 rounded-3xl bg-${stat.color}-50 flex items-center justify-center text-${stat.color}-600 mb-8 group-hover:rotate-12 transition-all duration-500 shadow-sm border border-${stat.color}-100/50 relative z-10`}>
                                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon}></path></svg>
                                                </div>
                                                <h3 className="text-slate-400 font-black text-xs uppercase tracking-widest relative z-10">{t(stat.label)}</h3>
                                                {statsLoading ? (
                                                    <div className="h-12 w-24 bg-slate-100 animate-pulse rounded-2xl mt-3 relative z-10"></div>
                                                ) : (
                                                    <p className="text-5xl font-black text-slate-900 mt-3 tracking-tighter relative z-10">
                                                        {typeof stat.val === 'number' && stat.val >= 1000 ? `${(stat.val / 1000).toFixed(1)}k` : stat.val}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Middle Section: Insights & Category Stats */}
                                    <div className="grid lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-2 bg-emerald-950 rounded-[3rem] p-12 relative overflow-hidden shadow-2xl shadow-emerald-200 animate-fade-in group">
                                            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 opacity-20 rounded-full -mr-48 -mt-48 blur-3xl group-hover:opacity-30 transition-opacity duration-700"></div>
                                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

                                            <div className="relative z-10">
                                                <span className="bg-emerald-500/20 text-emerald-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-emerald-500/30">Intelligence</span>
                                                <h3 className="text-4xl font-black text-white mt-6 mb-4 max-w-lg">Platform Growth Insights</h3>
                                                {statsLoading ? (
                                                    <p className="text-emerald-100/40 text-lg font-medium leading-relaxed mb-10 max-w-xl">Loading live data...</p>
                                                ) : (
                                                    <p className="text-emerald-100/60 text-lg font-medium leading-relaxed mb-10 max-w-xl">
                                                        {stats.cityStats?.[0] && <><span className="text-white font-black">{stats.cityStats[0]._id}</span> leads all regions with <span className="text-white font-black">{stats.cityStats[0].count}</span> registered workers. </>}
                                                        {stats.jobTypeStats?.[0] && <>Top service demand is <span className="text-emerald-400 font-black italic">{stats.jobTypeStats[0]._id}</span>{stats.jobTypeStats?.[1] ? <> followed by <span className="text-emerald-400 font-black italic">{stats.jobTypeStats[1]._id}</span></> : ''} with <span className="text-white font-black underline decoration-emerald-500 decoration-4 underline-offset-4">{stats.totalWorkers} providers</span> across <span className="text-white font-black">{stats.totalCities} {stats.totalCities === 1 ? 'city' : 'cities'}</span>.</>}
                                                    </p>
                                                )}
                                                <div className="flex flex-wrap gap-4">
                                                    <Link to="/analytics" className="bg-white text-emerald-900 font-black px-10 py-5 rounded-2xl hover:bg-emerald-50 transition-all shadow-xl hover:-translate-y-1 active:scale-95 text-sm uppercase tracking-widest text-center">
                                                        View Full Analytics
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 flex flex-col items-center text-center justify-center relative overflow-hidden group">
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                            <div className="w-24 h-24 rounded-[2rem] bg-indigo-50 flex items-center justify-center text-indigo-600 mb-8 shadow-sm group-hover:scale-110 transition-transform duration-500">
                                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
                                            </div>
                                            <h3 className="text-xl font-black text-slate-900 mb-2 uppercase tracking-tight">Service Power</h3>
                                            <p className="text-slate-400 font-bold mb-8 text-sm">Most dominant professional categories</p>

                                            <div className="w-full space-y-4 relative z-10">
                                                {stats.jobTypeStats?.slice(0, 3).map((cat, i) => (
                                                    <div key={i} className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-colors">
                                                        <span className="font-black text-slate-700 text-xs uppercase tracking-widest">{cat._id}</span>
                                                        <span className="bg-white px-3 py-1 rounded-lg text-[10px] font-black text-emerald-600 shadow-sm border border-slate-100">{cat.count} Providers</span>
                                                    </div>
                                                ))}
                                                {(!stats.jobTypeStats || stats.jobTypeStats.length === 0) && (
                                                    <p className="text-xs text-slate-300 font-bold italic">Gathering data...</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom: Recent Activity Tables */}
                                    <div className="grid lg:grid-cols-2 gap-8">
                                        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                                            <div className="px-10 py-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">New Professionals</h3>
                                                    <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest">Awaiting Identity Verification</p>
                                                </div>
                                                <Link to="/workers" className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Full Register</Link>
                                            </div>
                                            <div className="p-4">
                                                {stats.recentWorkers?.map((w, i) => (
                                                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-[2.5rem] transition-all group">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-16 h-16 rounded-[1.5rem] overflow-hidden shadow-md border-2 border-white bg-slate-100">
                                                                <img src={w.images?.[0] ? `https://khadamati-backend-mifb.onrender.com${w.images[0]}` : "https://placehold.co/100x100?text=W"} alt="" className="w-full h-full object-cover" />
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-800 text-base leading-tight group-hover:text-emerald-700 transition-colors">{w.name}</p>
                                                                <p className="text-[10px] bg-emerald-100 text-emerald-800 inline-block px-2 py-0.5 rounded uppercase font-black mt-2 border border-emerald-200 tracking-widest">{w.jobType}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right hidden sm:block">
                                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Joined</p>
                                                            <p className="text-sm font-black text-slate-700 mt-0.5">{new Date(w.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!stats.recentWorkers || stats.recentWorkers.length === 0) && (
                                                    <div className="py-20 text-center text-slate-400 font-bold italic">No recent registrations.</div>
                                                )}
                                            </div>
                                        </div>

                                        <div className="bg-white rounded-[3rem] shadow-sm border border-slate-100 overflow-hidden">
                                            <div className="px-10 py-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                                <div>
                                                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Platform Clients</h3>
                                                    <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest">Engagement Overview</p>
                                                </div>
                                                <Link to="/users" className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Audience Insights</Link>
                                            </div>
                                            <div className="p-4">
                                                {stats.recentUsers?.map((u, i) => (
                                                    <div key={i} className="flex items-center justify-between p-6 hover:bg-slate-50 rounded-[2.5rem] transition-all group">
                                                        <div className="flex items-center gap-5">
                                                            <div className="w-16 h-16 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-slate-300 font-black text-2xl border border-slate-100 group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-all">
                                                                {u.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <p className="font-black text-slate-800 text-base leading-tight">{u.name}</p>
                                                                <p className="text-[10px] text-slate-400 font-bold mt-1.5 uppercase tracking-tighter">{u.email}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right hidden sm:block">
                                                            <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full ${u.role === 'admin' ? 'bg-amber-50 text-amber-600 border border-amber-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                                                                {u.role}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {(!stats.recentUsers || stats.recentUsers.length === 0) && (
                                                    <div className="py-20 text-center text-slate-400 font-bold italic">No recent user signups.</div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            } />
                            <Route path="/workers" element={<WorkersTable />} />
                            <Route path="/users" element={<UsersTable />} />
                            <Route path="/reviews" element={<ReviewsTable />} />
                            <Route path="/analytics" element={<AnalyticsPage />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    )
}

export default App
