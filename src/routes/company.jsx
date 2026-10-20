import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowLeft, ArrowUpRight, MapPin, Building2, Globe, BriefcaseBusiness, WifiOff } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { useFetchDataDetail } from '@/myHooks/fetchDataDetail';
import { useFetchList } from '@/myHooks/fetchList';
import { SkeletonCard } from '@/myComponents/SkeletonCard';
import CompanyLogo from '@/myComponents/CompanyLogo';
import JobCard from '@/myComponents/JobCard';
import ModerationActions from '@/myComponents/ModerationActions';
export default function Company() {
    const { user } = useSelector(state => state.user);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const { id } = useParams();
    const [company, loading, error] = useFetchDataDetail(`companies/${id}`);
    const [companyJobs, jobsLoading, jobsError] = useFetchList(company?._id ? `jobs?company=${encodeURIComponent(company._id)}&verifiedJob=approved` : null);
    const [moderation, setModeration] = useState(null);
    const [updating, setUpdating] = useState(false);
    const mine = employerCompanies.some(item => item._id === company?._id);
    const status = moderation && moderation.id === id ? moderation.status : company?.verifiedCompany;
    const jobs = (Array.isArray(companyJobs) ? companyJobs : []).filter(job => (job.company?._id || job.company) === company?._id && job.verifiedJob === 'approved');
    let website = null;
    try { const url = new URL(company?.website?.includes('://') ? company.website : `https://${company?.website || ''}`); if (['https:', 'http:'].includes(url.protocol)) website = url; } catch { /* An invalid website is displayed as plain text. */ }
    const verifyCompany = async verifiedCompany => {
        if (updating || status === verifiedCompany) return;
        setUpdating(true);
        try { await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/companies/${company._id}`, { verifiedCompany }, { withCredentials: true }); setModeration({ id, status: verifiedCompany }); toast({ description: `Company ${verifiedCompany}.` }); }
        catch { toast({ description: 'Unable to update the company. Please try again.', variant: 'destructive' }); }
        finally { setUpdating(false); }
    };
    return <main className="job-detail-page company-detail-page"><Link className="back-link" to={`/${user?.userType}/companies`}><ArrowLeft size={16} />Back to companies</Link>{loading ? <section className="detail-panel detail-loading" aria-label="Loading company"><SkeletonCard /></section> : error || !company ? <section className="empty-jobs"><WifiOff size={32} /><h1>This company couldn’t be loaded.</h1><p>{error || 'Please try again in a moment.'}</p><Link className="primary-link" to={`/${user?.userType}/companies`}>Explore companies</Link></section> : <><section className="company-profile-hero"><div className="company-cover" aria-hidden="true"><span>GOOD PEOPLE. BIG POSSIBILITIES.</span><span>✳ ↗</span></div><div className="company-profile-body"><div className="company-profile-top"><CompanyLogo company={company} /><a href="#company-openings" className="primary-link">Explore open roles <ArrowUpRight size={17} /></a></div><div className="company-profile-heading"><h1>{company.name}</h1>{user?.userType === 'admin' ? <span className={`company-status status-${status}`}>{status}</span> : mine && <span className="company-status">Your company</span>}</div><div className="detail-facts"><span><Building2 size={16} />{company.industry || 'Industry not specified'}</span><span><MapPin size={16} />{company.location || 'Location not specified'}</span>{website && <a href={website.href} target="_blank" rel="noopener noreferrer"><Globe size={16} />Visit website <ArrowUpRight size={14} /></a>}</div></div></section>
    <div className="detail-columns"><section className="detail-panel"><span className="eyebrow">GET TO KNOW THE TEAM</span><h2>Meet {company.name}.</h2><p className="job-description">{company.description || 'This team hasn’t added a description yet. Explore their open roles to learn more.'}</p></section><aside className="detail-panel company-overview"><span className="eyebrow">AT A GLANCE</span><h2>Company snapshot</h2><dl><div><dt>Industry</dt><dd>{company.industry || 'Not specified'}</dd></div><div><dt>Location</dt><dd>{company.location || 'Not specified'}</dd></div><div><dt>Website</dt><dd>{website ? <a href={website.href} target="_blank" rel="noopener noreferrer">{website.hostname} <ArrowUpRight size={14} /></a> : company.website || 'Not provided'}</dd></div></dl>{user?.userType === 'employer' && mine && <Link className="outline-action" to={`/employer/edit_company/${company._id}`}>Edit company <ArrowUpRight size={16} /></Link>}{user?.userType === 'admin' && <ModerationActions status={status} updating={updating} subject="company" onApprove={() => verifyCompany('approved')} onReject={() => verifyCompany('rejected')} />}</aside></div>
    <section id="company-openings" className="company-openings"><div className="section-heading"><div><span className="eyebrow">YOUR NEXT CHAPTER, HERE</span><h2>Find your place on the team.</h2><p>Explore opportunities at {company.name}.</p></div>{!jobsLoading && !jobsError && <span className="listing-count">{jobs.length} open roles</span>}</div>{jobsLoading ? <div className="jobs-grid" aria-label="Loading company roles">{[0, 1, 2].map(index => <div className="loading-card" key={index}><SkeletonCard /></div>)}</div> : jobs.length ? <div className="jobs-grid">{jobs.map(job => <JobCard key={job._id} job={job} />)}</div> : <div className="empty-jobs"><BriefcaseBusiness size={30} /><h3>{jobsError && !/not found/i.test(jobsError) ? 'We couldn’t load the open roles.' : 'No open roles just yet.'}</h3><p>{jobsError && !/not found/i.test(jobsError) ? 'Please try again in a moment.' : 'Check back for new opportunities, or discover another team.'}</p><Link className="primary-link" to="/">Explore all opportunities <ArrowUpRight size={17} /></Link></div>}</section></>}</main>;
}
