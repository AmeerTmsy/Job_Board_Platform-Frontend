import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Banknote, Pencil } from 'lucide-react';

export default function EmployerJobCard({ job }) {
    const detail = `/employer/employer_job_detail/${job._id}`;
    return <article className="job-card management-card"><div className="job-card-header"><span className="company-monogram">{(job.company?.name || 'H').slice(0, 2).toUpperCase()}</span><span className="company-name">{job.company?.name || 'Company not provided'}</span><span className={`company-status status-${job.verifiedJob}`}>{job.verifiedJob || 'Not provided'}</span></div><h2><Link to={detail}>{job.title}</Link></h2><p className="job-headline">{job.headline || 'Add a headline to introduce this opportunity.'}</p><div className="job-meta"><span><MapPin size={15} />{job.location || 'Location not provided'}</span>{job.salary && <span><Banknote size={15} />₹{Number(job.salary).toLocaleString('en-IN')}</span>}</div><div className="job-card-footer"><Link className="management-edit" to={`/employer/employer_job_edit/${job._id}`} aria-label={`Edit ${job.title}`}><Pencil size={14} />Edit listing</Link><Link className="job-detail-link" to={detail}>Manage role <ArrowUpRight size={17} /></Link></div></article>;
}
EmployerJobCard.propTypes = { job: PropTypes.object.isRequired };
