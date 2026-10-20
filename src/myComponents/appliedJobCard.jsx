import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, MapPin, CalendarDays } from 'lucide-react';
export default function AppliedJobCard({ application }) {
    const job = application.jobId;
    const date = application.createdAt ? new Date(application.createdAt) : null;
    const dateText = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : null;
    return <article className="application-card"><div className="application-card-header"><span className="company-monogram">{(job?.company?.name || 'H').slice(0, 2).toUpperCase()}</span><div><p>{job?.company?.name || 'Company unavailable'}</p><h2>{job?._id ? <Link to={`/jobs/${job._id}`}>{job.title}</Link> : 'This role is no longer available'}</h2></div><span className="application-submitted"><Check size={13} />Submitted</span></div>{job?.headline && <p className="application-headline">{job.headline}</p>}<div className="application-card-bottom"><div>{job?.location && <span><MapPin size={14} />{job.location}</span>}{dateText && <span><CalendarDays size={14} />Applied {dateText}</span>}</div>{job?._id && <Link className="outline-action" to={`/jobs/${job._id}`}>View role <ArrowUpRight size={16} /></Link>}</div></article>;
}
AppliedJobCard.propTypes = { application: PropTypes.object.isRequired };
