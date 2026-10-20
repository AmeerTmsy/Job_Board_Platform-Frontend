import { useState } from 'react';
import PropTypes from 'prop-types';
import { Search, SearchX, WifiOff } from 'lucide-react';
import { useInfiniteList } from '@/myHooks/useInfiniteList';
import InfiniteScroll from './InfiniteScroll';
import JobCard from './JobCard';
import CompanyCard from './CompanyCard';
import { SkeletonCard } from './SkeletonCard';

export default function AdminReviewList({ companies = false }) {
    const [status, setStatus] = useState('pending');
    const [search, setSearch] = useState('');
    const [keyword, setKeyword] = useState('');
    const noun = companies ? 'companies' : 'jobs';
    const params = new URLSearchParams({ summary: '1' });
    if (status !== 'all') params.set(companies ? 'verifiedCompany' : 'verifiedJob', status);
    if (keyword) params.set('searchKey', keyword);
    const pagination = useInfiniteList(`${noun}?${params}`);
    const { items, loading, error, total, facets } = pagination;
    return <main className="admin-review-page"><div className="admin-review-heading"><div><span className="eyebrow">ADMIN</span><h1>{companies ? 'Companies' : 'Jobs'}</h1><p>Review submissions and approve or reject them.</p></div><span className="listing-count">{loading && !items.length ? 'Loading…' : `${total} results`}</span></div>
        <div className="admin-review-toolbar"><div className="category-tabs" aria-label={`${noun} verification filters`}>{[['pending', 'Pending'], ['approved', 'Approved'], ['rejected', 'Rejected'], ['all', 'All']].map(([value, label]) => <button key={value} aria-pressed={status === value} onClick={() => setStatus(value)}>{label}{facets.verificationCounts && <span className="filter-count">{facets.verificationCounts[value]}</span>}</button>)}</div><form className="management-search" onSubmit={event => { event.preventDefault(); setKeyword(search.trim()); }}><Search size={17} /><input type="search" aria-label={`Search ${noun}`} placeholder={`Search ${companies ? 'company name, industry, or location' : 'job title'}`} value={search} onChange={event => setSearch(event.target.value)} /><button type="submit">Search</button></form></div>
        {loading && !items.length ? <div className="jobs-grid" aria-label={`Loading ${noun}`}>{[0, 1, 2].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : !items.length ? <div className="empty-jobs">{error ? <WifiOff size={28} /> : <SearchX size={28} />}<h2>{error ? `Couldn’t load ${noun}.` : `No ${status === 'all' ? '' : `${status} `}${noun}${keyword ? ' match your search' : ''}.`}</h2><p>{error ? 'Try again below.' : status === 'pending' && !keyword ? 'There are no submissions waiting for review.' : 'Choose another status or search term.'}</p>{keyword && <button className="outline-action" onClick={() => { setSearch(''); setKeyword(''); }}>Clear search</button>}</div> : <div className="jobs-grid">{items.map(item => companies ? <CompanyCard key={item._id} company={item} /> : <JobCard key={item._id} job={item} />)}</div>}
        <InfiniteScroll {...pagination} count={items.length} />
    </main>;
}
AdminReviewList.propTypes = { companies: PropTypes.bool };
