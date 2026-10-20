import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, Search, BriefcaseBusiness, Building2, WifiOff, SearchX, ArrowUpRight } from 'lucide-react';
import AccountLayout from './AccountLayout';
import EmployerJobCard from './employerJobCard';
import EmployerCompanyCard from './employerCompnayCard';
import { SkeletonCard } from './SkeletonCard';
import { useInfiniteList } from '@/myHooks/useInfiniteList';
import InfiniteScroll from './InfiniteScroll';

export default function EmployerCollection({ companies = false }) {
    const { user } = useSelector(state => state.user);
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('all');
    const [sort, setSort] = useState('default');
    const endpoint = companies ? 'companies' : 'jobs';
    const ownerField = companies ? 'createdBy' : 'jobCreatedBy';
    const statusField = companies ? 'verifiedCompany' : 'verifiedJob';
    const params = new URLSearchParams({ [ownerField]: user.id || user._id, summary: '1', sort: sort === 'name' && !companies ? 'title' : sort });
    if (status !== 'all') params.set(statusField, status);
    if (search.trim()) params.set('searchKey', search.trim());
    const pagination = useInfiniteList(`${endpoint}?${params}`);
    const { items: filtered, loading, error, total, facets } = pagination;
    const failed = error && !filtered.length;
    const createPath = companies ? '/employer/company_create' : '/employer/new_job_create';
    const noun = companies ? 'companies' : 'job listings';
    const Icon = companies ? Building2 : BriefcaseBusiness;
    const Card = companies ? EmployerCompanyCard : EmployerJobCard;
    return <AccountLayout eyebrow={companies ? 'GIVE YOUR TEAM A PLACE TO SHINE' : 'GOOD PEOPLE START WITH A GREAT OPPORTUNITY'} title={companies ? 'The teams you’re building.' : 'Your next great hire starts here.'} description={companies ? 'Your companies, their stories, and the possibilities you’re creating.' : 'Manage your roles, refine your listings, and make room for your next teammate.'}>
        <div className="employer-management-intro"><div><Icon size={22} /><p>{companies ? 'A great company story makes the right people feel at home.' : 'Put your opportunities in front of people who can move your team forward.'}</p></div><Link className="primary-link" to={createPath}><Plus size={17} />{companies ? 'Add a company' : 'Create a job'}</Link></div>
        <div className="employer-stats" aria-label={`${companies ? 'Company' : 'Job listing'} verification summary`}>{[['all', 'Total'], ['approved', 'Approved'], ['pending', 'Pending'], ['rejected', 'Rejected']].map(([value, label]) => <button key={value} aria-pressed={status === value} onClick={() => setStatus(value)}><span>{label}</span><strong>{loading && !filtered.length || failed ? '—' : facets.verificationCounts?.[value] ?? 0}</strong><span className={`stat-dot ${value}`} /></button>)}</div>
        <div className="management-controls"><label className="management-search"><Search size={17} /><input type="search" aria-label={`Search your ${noun}`} placeholder={companies ? 'Search company, industry, or location' : 'Search job title'} value={search} onChange={event => setSearch(event.target.value)} /></label><label className="industry-filter">Sort by<select value={sort} onChange={event => setSort(event.target.value)}><option value="default">Default order</option><option value="newest">Newest first</option><option value="name">{companies ? 'Company A–Z' : 'Job title A–Z'}</option></select></label></div>
        <div className="management-results"><p>{loading && !filtered.length ? `Loading your ${noun}…` : failed ? `Your ${noun} are unavailable` : `${total} ${companies ? total === 1 ? 'company' : 'companies' : total === 1 ? 'job listing' : 'job listings'}${status === 'all' ? '' : ` · ${status}`}`}</p>{(search || status !== 'all') && <button onClick={() => { setSearch(''); setStatus('all'); }}>Clear filters</button>}</div>
        {loading && !filtered.length ? <div className="account-jobs-grid" aria-label={`Loading ${noun}`}>{[0, 1, 2, 3].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : failed ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load your {noun}.</h2><p>Please try again in a moment.</p></div> : filtered.length ? <div className="account-jobs-grid">{filtered.map(item => <Card key={item._id} {...(companies ? { company: item } : { job: item })} />)}</div> : <div className="empty-jobs account-empty">{search || status !== 'all' ? <SearchX size={32} /> : <Icon size={32} />}<h2>{search || status !== 'all' ? 'No matches just yet.' : companies ? 'Give your next chapter a home.' : 'Your next teammate is out there.'}</h2><p>{search || status !== 'all' ? 'Try another keyword or explore all verification statuses.' : companies ? 'Add your company and introduce your team to the people who could help shape its future.' : 'Create your first job listing and tell people what makes the opportunity yours.'}</p>{search || status !== 'all' ? <button className="primary-link" onClick={() => { setSearch(''); setStatus('all'); }}>View all {noun}</button> : <Link className="primary-link" to={createPath}>{companies ? 'Add your first company' : 'Create your first job'}<ArrowUpRight size={17} /></Link>}</div>}
    <InfiniteScroll {...pagination} count={filtered.length} /></AccountLayout>;
}
EmployerCollection.propTypes = { companies: PropTypes.bool };
