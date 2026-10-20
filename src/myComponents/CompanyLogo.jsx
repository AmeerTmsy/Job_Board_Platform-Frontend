import { useState } from 'react';
import PropTypes from 'prop-types';
export default function CompanyLogo({ company }) {
    const [failedSource, setFailedSource] = useState(null);
    return <span className="company-logo">{company.logo && failedSource !== company.logo ? <img src={company.logo} alt="" loading="lazy" onError={() => setFailedSource(company.logo)} /> : (company.name || 'Company').slice(0, 2).toUpperCase()}</span>;
}
CompanyLogo.propTypes = { company: PropTypes.object.isRequired };
