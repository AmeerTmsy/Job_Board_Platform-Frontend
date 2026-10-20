import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Pencil } from 'lucide-react';
import CompanyLogo from './CompanyLogo';

export default function EmployerCompanyCard({ company }) {
    const detail = `/employer/companies/${company._id}`;
    return <article className="company-card management-card"><div className="company-card-top"><CompanyLogo company={company} /><span className={`company-status status-${company.verifiedCompany}`}>{company.verifiedCompany || 'Not provided'}</span></div><h2><Link to={detail}>{company.name}</Link></h2><span className="industry-tag">{company.industry || 'Industry not provided'}</span><p className="company-card-description">{company.description || 'Tell your company story and help your next teammate get to know you.'}</p><p className="management-company-location"><MapPin size={14} />{company.location || 'Location not provided'}</p><div className="job-card-footer"><Link className="management-edit" to={`/employer/edit_company/${company._id}`} aria-label={`Edit ${company.name}`}><Pencil size={14} />Edit company</Link><Link className="job-detail-link" to={detail}>View company <ArrowUpRight size={17} /></Link></div></article>;
}
EmployerCompanyCard.propTypes = { company: PropTypes.object.isRequired };
