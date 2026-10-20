import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowLeft, WifiOff, Check } from 'lucide-react';
import AccountLayout from './AccountLayout';
import { SkeletonCard } from './SkeletonCard';

export default function EmployerFormLayout({ company = false, editing = false, loading = false, error, children }) {
    const noun = company ? 'company' : 'job';
    const back = company ? '/employer/my_companies' : '/employer/employer_jobs_listed';
    return <AccountLayout eyebrow={company ? 'YOUR COMPANY' : 'YOUR JOB LISTING'} title={`${editing ? 'Edit' : 'Create'} ${company && !editing ? 'a company' : !editing ? 'a job' : noun}`} description={company ? 'Introduce your team with a clear, complete company profile.' : 'Help the right people understand the role and what your team is looking for.'}>
        <Link className="back-link" to={back}><ArrowLeft size={15} />Back to {company ? 'my companies' : 'my jobs'}</Link>
        {loading ? <section className="detail-panel detail-loading" aria-label={`Loading ${noun} form`}><SkeletonCard /></section> : error ? <div className="empty-jobs"><WifiOff size={30} /><h2>We couldn’t load this {noun}.</h2><p>{error}</p><Link className="outline-action" to={back}>Back to {company ? 'companies' : 'jobs'}</Link></div> : <div className="employer-form-layout"><div>{children}</div><aside className="employer-form-guide"><span className="eyebrow">{editing ? 'BEFORE YOU SAVE' : 'A GOOD FIRST IMPRESSION'}</span><h2>{company ? 'Tell your team’s story.' : 'Make the role clear.'}</h2><ul>{(company ? ['Use the name people know your company by.', 'Add a website and logo to make your profile recognizable.', 'Describe what your team does and what makes it different.'] : ['Choose a specific, recognizable job title.', 'Be clear about location, salary, and work type.', 'Describe the responsibilities and what success looks like.']).map(tip => <li key={tip}><Check size={15} /><span>{tip}</span></li>)}</ul>{!editing && <p className="employer-review-note">New {company ? 'companies' : 'jobs'} are reviewed by an admin before appearing publicly.</p>}</aside></div>}
    </AccountLayout>;
}
EmployerFormLayout.propTypes = { company: PropTypes.bool, editing: PropTypes.bool, loading: PropTypes.bool, error: PropTypes.string, children: PropTypes.node };
