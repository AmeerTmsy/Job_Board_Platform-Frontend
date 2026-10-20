import AdminReviewList from '@/myComponents/AdminReviewList';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Building2, SearchX, WifiOff, ArrowUpRight } from 'lucide-react';
import CompanyCard from '@/myComponents/CompanyCard';
import { useInfiniteList } from '@/myHooks/useInfiniteList';
import InfiniteScroll from '@/myComponents/InfiniteScroll';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import SearchBar from '@/myComponents/searchBar';
export default function Companies() {
    const { user } = useSelector(state => state.user);
    return user?.userType === 'admin' ? <AdminReviewList companies /> : <CompanyDiscovery />;
}

function CompanyDiscovery() {
    const { user } = useSelector(state => state.user);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [industry, setIndustry] = useState('All industries');
    const params = new URLSearchParams(search);
    if (user?.userType !== 'admin') params.set('verifiedCompany', 'approved');
    else if (status !== 'all') params.set('verifiedCompany', status);
    if (industry !== 'All industries') params.set('industry', industry);
    params.set('facets', 'industry');
    const pagination = useInfiniteList(`companies?${params}`);
    const { items: visible, loading, error, total, facets } = pagination;
    const industries = ['All industries', ...new Set([...(facets.industries || []), ...(industry === 'All industries' ? [] : [industry])])];
    const notFound = error && /not found|no companies/i.test(error);
    return <main className="companies-page"><section className="companies-hero"><div><span className="eyebrow"><span /> GREAT WORK STARTS WITH GREAT PEOPLE</span><h1>Find your people.<br /><em>Build something great.</em></h1><p>Behind every opportunity is a team. Discover the companies<br className="desktop-break" /> shaping what’s next and find where you belong.</p><SearchBar field="Company" setUrlParam={value => { setSearch(value); setIndustry('All industries'); }} /></div><div className="companies-art" aria-hidden="true"><span className="eyebrow">GOOD COMPANY. GREAT POSSIBILITIES.</span><div className="team-symbols"><span>✳</span><span><Building2 size={47} strokeWidth={1.3} /></span><span>↗</span></div><strong>Different teams.<br />Shared ambition.</strong><span className="companies-art-footer">A PLACE TO DO YOUR BEST WORK <ArrowUpRight size={22} /></span></div></section>
    <section className="companies-directory" aria-labelledby="companies-heading"><div className="section-heading"><div><span className="eyebrow">MEET YOUR NEXT TEAM</span><h2 id="companies-heading">Good company to keep.</h2><p>Explore teams, get inspired, and see what’s possible.</p></div><span className="listing-count">{loading && !visible.length ? 'Discovering teams…' : `${total} companies`}</span></div><div className="company-directory-controls"><div className="category-tabs"><button className="selected" type="button" onClick={() => { setSearch(''); setIndustry('All industries'); setStatus('all'); }}>Explore all <ArrowUpRight size={15} /></button></div><label className="industry-filter">Industry<select value={industry} onChange={event => setIndustry(event.target.value)}>{industries.map(item => <option key={item}>{item}</option>)}</select></label></div>
    {user?.userType === 'admin' && <div className="category-tabs" aria-label="Company verification filters">{['all', 'approved', 'pending', 'rejected'].map(item => <button key={item} aria-pressed={status === item} onClick={() => { setStatus(item); setIndustry('All industries'); }}>{item}</button>)}</div>}
    {loading && !visible.length ? <div className="jobs-grid" aria-label="Loading companies">{Array.from({ length: 6 }, (_, index) => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : !visible.length ? <div className="empty-jobs">{error && !notFound ? <WifiOff size={32} /> : <SearchX size={32} />}<h3>{error && !notFound ? 'We couldn’t load the companies.' : 'Your next team is still out there.'}</h3><p>{error && !notFound ? 'Please try again in a moment.' : 'Try another search or explore all industries.'}</p><button className="primary-link" onClick={() => { setSearch(''); setIndustry('All industries'); setStatus('all'); }}>Explore all companies</button></div> : <div className="jobs-grid">{visible.map(company => <CompanyCard key={company._id} company={company} />)}</div>}<InfiniteScroll {...pagination} count={visible.length} /></section></main>;
}
