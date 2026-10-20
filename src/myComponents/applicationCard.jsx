import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, FileText, BriefcaseBusiness } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

export default function ApplicationCard({ application }) {
    const candidate = application.userId;
    let resume;
    try { const url = new URL(application.resume); if (['https:', 'http:'].includes(url.protocol)) resume = url.href; } catch { /* Missing or invalid resumes have no download link. */ }
    const experience = candidate?.experienced;
    return <article className="application-card candidate-application"><div className="candidate-application-top"><ProfileAvatar profile={candidate || { name: 'Candidate' }} /><div><h3>{candidate?.name || 'Candidate unavailable'}</h3><p>{candidate?.profession || 'Profession not provided'}</p></div></div>{experience !== undefined && experience !== null && <p className="candidate-experience"><BriefcaseBusiness size={14} />{experience} {Number(experience) === 1 ? 'year' : 'years'} of experience</p>}<div className="candidate-application-actions">{resume ? <a className="outline-action" href={resume} target="_blank" rel="noopener noreferrer"><FileText size={15} />View resume</a> : <span className="field-hint">Resume unavailable</span>}{candidate?._id && <Link className="job-detail-link" to={`/employer/employees/${candidate._id}`}>View profile <ArrowUpRight size={16} /></Link>}</div></article>;
}
ApplicationCard.propTypes = { application: PropTypes.object.isRequired };
