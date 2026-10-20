import { useState } from 'react';
import { ArrowUpRight, Compass, Sparkles, SearchX, WifiOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import JobCard from '../myComponents/JobCard';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import { useFetchList } from '@/myHooks/fetchList';
import { useSelector } from 'react-redux';
import SearchBar from '@/myComponents/searchBar';

export default function Jobs() {
    const { user } = useSelector(state => state.user);
    const [urlParam, setUrlParam] = useState('');
    const [category, setCategory] = useState('All opportunities');
    const finalUrl = user?.userType === 'admin' ? urlParam : `?verifiedJob=approved${urlParam ? `&${urlParam.slice(1)}` : ''}`;
    const [jobs, loading, error] = useFetchList(`jobs${finalUrl}`);
    const categories = ['All opportunities', 'Design', 'Engineering', 'Marketing', 'Product', 'Data'];
    return <main className="jobs-page">
        <section className="career-hero"><div className="hero-copy"><span className="eyebrow"><span /> YOUR NEXT CHAPTER STARTS HERE</span><h1>Good work.<br />Great possibilities<span>.</span></h1><p>Find a role that feels like you. Explore opportunities,<br className="desktop-break" /> meet ambitious teams, and make your next move.</p><SearchBar field="Job" setUrlParam={value => { setCategory('All opportunities'); setUrlParam(value); }} /><div className="search-hint">A fresh start, a bigger challenge, or something entirely new.</div></div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><span className="art-spark">✳</span><div className="art-note"><span className="note-icon"><Compass size={25} /></span><span>Room to grow.<br /><strong>Space to be you.</strong></span></div><div className="art-card"><span className="art-card-top">THE NEXT BIG THING <ArrowUpRight size={22} /></span><strong>Your<br />next move.</strong><div className="art-card-bottom"><span>MAKE IT A GOOD ONE</span><Sparkles size={28} /></div></div><div className="art-label"><span /> A world of opportunity</div></div></section>
        <section className="opportunities" aria-labelledby="jobs-heading"><div className="section-heading"><div><span className="eyebrow">FIND YOUR FIT</span><h2 id="jobs-heading">A new door is opening.</h2><p>Explore roles that take you somewhere.</p></div><span className="listing-count">{loading ? 'Finding opportunities…' : `${Array.isArray(jobs) ? jobs.length : 0} opportunities`}</span></div>
        <div className="category-tabs" aria-label="Job categories">{categories.map(item => <button key={item} aria-pressed={category === item} className={category === item ? 'selected' : ''} onClick={() => { setCategory(item); setUrlParam(item === 'All opportunities' ? '' : `?searchKey=${encodeURIComponent(item)}`); }}>{item}{item === 'All opportunities' && <ArrowUpRight size={15} />}</button>)}</div>
        {user?.userType === 'admin' && <div className="category-tabs" aria-label="Verification filters">{['all', 'approved', 'pending', 'rejected'].map(status => <button key={status} aria-pressed={urlParam === (status === 'all' ? '' : `?verifiedJob=${status}`)} onClick={() => { setCategory('All opportunities'); setUrlParam(status === 'all' ? '' : `?verifiedJob=${status}`); }}>{status}</button>)}</div>}
        {loading ? <div className="jobs-grid" aria-label="Loading jobs">{Array.from({ length: 6 }, (_, index) => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : error || !jobs?.length ? <div className="empty-jobs">{error && error !== 'Jobs not found' ? <WifiOff size={32} /> : <SearchX size={32} />}<h3>{error && error !== 'Jobs not found' ? 'We couldn’t load the opportunities.' : 'Your next opportunity is still out there.'}</h3><p>{error && error !== 'Jobs not found' ? 'Please try again in a moment.' : 'Try another keyword or explore all opportunities.'}</p><button className="primary-link" onClick={() => { setCategory('All opportunities'); setUrlParam(''); }}>View all opportunities</button></div> : <div className="jobs-grid">{jobs.map(item => <JobCard key={item._id} job={item} />)}</div>}
        </section><section className="career-banner"><div><span className="eyebrow">BIG AMBITIONS WELCOME</span><h2>Your talent deserves a great team.</h2><p>Take the first step toward what’s next.</p></div><Link className="primary-link" to={user?.userType ? `/${user.userType}/account` : '/sign_up'}>{user?.userType ? 'Your profile' : 'Create your profile'} <ArrowUpRight size={18} /></Link></section>
    </main>;
}
