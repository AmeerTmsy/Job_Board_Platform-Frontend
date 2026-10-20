import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import ProfileAvatar from './ProfileAvatar';

export default function EmployeeCard({ employee }) {
    const experience = employee.experienced;
    const hasExperience = experience !== undefined && experience !== null && experience !== '';
    return <article className="talent-card">
        <div className="talent-card-top"><ProfileAvatar profile={employee} /><span className="talent-card-symbol" aria-hidden="true">↗</span></div>
        <h2><Link to={`/employer/employees/${employee._id}`}>{employee.name || 'Candidate'}</Link></h2>
        <p className="talent-profession">{employee.profession || 'Profession not provided'}</p>
        <p className="talent-bio">{employee.bio || 'Get to know this candidate by exploring their profile.'}</p>
        <div className="talent-card-bottom"><span><BriefcaseBusiness size={14} />{hasExperience ? `${experience} ${Number(experience) === 1 ? 'year' : 'years'} of experience` : 'Experience not provided'}</span><Link to={`/employer/employees/${employee._id}`} aria-label={`View ${employee.name || 'candidate'}’s profile`}>View profile <ArrowUpRight size={16} /></Link></div>
    </article>;
}
EmployeeCard.propTypes = { employee: PropTypes.object.isRequired };
