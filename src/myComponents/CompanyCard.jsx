import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ArrowUpRight, MapPin, Building2 } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
export default function CompanyCard({ company }) {
    const { user } = useSelector(state => state.user);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const mine = employerCompanies.some(item => item._id === company._id);
    return <article className="company-card"><div className="company-card-top"><CompanyLogo company={company} />{user?.userType === 'admin' ? <span className={`company-status status-${company.verifiedCompany}`}>{company.verifiedCompany}</span> : user?.userType === 'employer' && mine ? <span className="company-status">Your company</span> : <Building2 size={19} />}</div><h2><Link to={`/${user?.userType}/companies/${company._id}`}>{company.name}</Link></h2><span className="industry-tag">{company.industry || 'Industry not specified'}</span><p className="company-card-description">{company.description || 'Get to know the team and explore their next opportunities.'}</p><div className="company-card-bottom"><span><MapPin size={14} />{company.location || 'Location not specified'}</span><Link aria-label={`Explore ${company.name}`} to={`/${user?.userType}/companies/${company._id}`}>Explore <ArrowUpRight size={17} /></Link></div></article>;
}
CompanyCard.propTypes = { company: PropTypes.object.isRequired };
