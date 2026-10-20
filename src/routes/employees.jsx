import { useState } from 'react';
import { Users, ArrowUpRight, SearchX, WifiOff } from 'lucide-react';
import { useInfiniteList } from '@/myHooks/useInfiniteList';
import InfiniteScroll from '@/myComponents/InfiniteScroll';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import SearchBar from '@/myComponents/searchBar';
import EmployeeCard from '@/myComponents/employeeCard';

export default function Employees() {
    const [query, setQuery] = useState('');
    const [experience, setExperience] = useState('all');
    const [sort, setSort] = useState('default');
    const params = new URLSearchParams(query);
    if (experience === 'early') { params.set('minExperience', '0'); params.set('maxExperience', '2'); }
    if (experience === 'mid') { params.set('minExperience', '2'); params.set('maxExperience', '5'); }
    if (experience === 'senior') params.set('minExperience', '5');
    params.set('sort', sort);
    const pagination = useInfiniteList(`users?${params}`);
    const { items: candidates, loading, error, total } = pagination;
    const failed = error && !/not found|no users/i.test(error);
    return <main className="companies-page talent-page"><section className="companies-hero talent-hero"><div><span className="eyebrow"><span /> BIG IDEAS NEED GREAT PEOPLE</span><h1>Your next great hire.<br /><em>A whole new possibility.</em></h1><p>Meet people with the perspective, experience, and ambition<br className="desktop-break" /> to help your team build what’s next.</p><SearchBar field="Employee" setUrlParam={value => { setQuery(value); setExperience('all'); }} /></div><div className="talent-art" aria-hidden="true"><span className="eyebrow">DIFFERENT PERSPECTIVES. SHARED AMBITION.</span><div className="talent-art-people"><span>✳</span><span><Users size={48} strokeWidth={1.3} /></span><span>↗</span></div><strong>Good people.<br />Great things ahead.</strong><span className="companies-art-footer">BUILD SOMETHING BETTER, TOGETHER <ArrowUpRight size={22} /></span></div></section>
        <section className="companies-directory" aria-labelledby="talent-heading"><div className="section-heading"><div><span className="eyebrow">MEET YOUR NEXT TEAMMATE</span><h2 id="talent-heading">People worth getting to know.</h2><p>Discover the person behind the profile.</p></div><span className="listing-count">{loading && !candidates.length ? 'Discovering talent…' : failed ? 'Candidates unavailable' : `${total} ${total === 1 ? 'candidate' : 'candidates'}`}</span></div><div className="talent-controls"><div className="category-tabs" aria-label="Experience filters">{[['all', 'All experience'], ['early', '0–1 years'], ['mid', '2–4 years'], ['senior', '5+ years']].map(([value, label]) => <button key={value} aria-pressed={experience === value} onClick={() => setExperience(value)}>{label}</button>)}</div><label className="industry-filter">Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value="default">Default order</option><option value="name">Name A–Z</option><option value="experience">Most experienced</option></select></label></div>
        {loading && !candidates.length ? <div className="jobs-grid" aria-label="Loading candidates">{[0, 1, 2, 3, 4, 5].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : !candidates.length ? <div className="empty-jobs">{failed ? <WifiOff size={32} /> : <SearchX size={32} />}<h3>{failed ? 'We couldn’t load the candidates.' : 'The right person is still out there.'}</h3><p>{failed ? 'Please try again in a moment.' : 'Try another search or broaden your experience filter.'}</p>{!failed && <button className="primary-link" onClick={() => { setQuery(''); setExperience('all'); setSort('default'); }}>Explore all candidates</button>}</div> : <div className="jobs-grid">{candidates.map(employee => <EmployeeCard key={employee._id} employee={employee} />)}</div>}<InfiniteScroll {...pagination} count={candidates.length} /></section>
    </main>;
}
