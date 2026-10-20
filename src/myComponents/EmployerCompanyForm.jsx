import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Check, LoaderCircle } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { companyPayload, normalizeWebsite, validateCompanyLogo } from '@/lib/employerForms';
import { setEmployerCompanies } from '@/redux/slices/employer/companiesSlice';
import CompanyLogo from './CompanyLogo';
import EmployerField from './EmployerField';

export default function EmployerCompanyForm({ company }) {
    const editing = Boolean(company);
    const { user } = useSelector(state => state.user);
    const { employerCompanies } = useSelector(state => state.employerCompanies);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const [preview, setPreview] = useState(null);
    const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm({ defaultValues: { name: company?.name || '', industry: company?.industry || '', location: company?.location || '', website: company?.website || '', description: company?.description || '' } });
    const image = watch('logo')?.[0];
    const name = watch('name');
    useEffect(() => { if (!image || validateCompanyLogo([image]) !== true) { setPreview(null); return; } const url = URL.createObjectURL(image); setPreview(url); return () => URL.revokeObjectURL(url); }, [image]);
    const required = label => ({ required: `${label} is required.`, validate: value => Boolean(value.trim()) || `${label} is required.` });
    const submit = async values => {
        setServerError('');
        try {
            const payload = companyPayload(values, user.id || user._id, !editing);
            const response = await axios[editing ? 'patch' : 'post'](`${import.meta.env.VITE_API_BASE_URL}/companies${editing ? `/${company._id}` : ''}`, payload, { withCredentials: true });
            const result = response?.data?.data;
            if (!result?._id) throw new Error('The company could not be confirmed. Please try again.');
            dispatch(setEmployerCompanies([...employerCompanies.filter(item => item._id !== result._id), { ...company, ...result }]));
            toast({ description: editing ? 'Company updated.' : 'Company created and submitted for review.' });
            navigate(`/employer/companies/${result._id}`);
        } catch (error) { setServerError(error?.response?.data?.message || error.message || 'We couldn’t save this company. Please try again.'); }
    };
    const field = (name, label, props = {}) => <EmployerField name={name} label={label} register={register} error={errors[name]} {...props} />;
    return <form className="detail-panel employer-editor" onSubmit={handleSubmit(submit)} noValidate><section className="employer-form-section"><div className="employer-section-heading"><span>01</span><div><h2>Company identity</h2><p>Make your team easy to recognize.</p></div></div><div className="company-logo-upload"><CompanyLogo company={{ name: name || 'Company', logo: preview || company?.logo }} /><div><label htmlFor="company-logo-file">Company logo <span>Optional</span></label><p>JPG or PNG, up to 5 MB.</p><input id="company-logo-file" type="file" accept="image/jpeg,image/png" {...register('logo', { validate: validateCompanyLogo })} aria-invalid={Boolean(errors.logo)} aria-describedby={errors.logo ? 'company-logo-error' : undefined} />{errors.logo && <span id="company-logo-error" className="field-error" role="alert">{errors.logo.message}</span>}</div></div>{field('name', 'Company name', { placeholder: 'e.g. Forma Studio', rules: required('Company name') })}</section>
        <section className="employer-form-section"><div className="employer-section-heading"><span>02</span><div><h2>Company details</h2><p>Help people understand where and how you work.</p></div></div><div className="auth-field-row">{field('industry', 'Industry', { placeholder: 'e.g. Technology or Design', rules: required('Industry') })}{field('location', 'Location', { placeholder: 'e.g. Bengaluru, India', rules: required('Location') })}</div>{field('website', 'Website (optional)', { type: 'text', inputMode: 'url', placeholder: 'https://example.com', hint: 'A domain such as example.com works too.', rules: { validate: value => { try { normalizeWebsite(value); return true; } catch (error) { return error.message; } } } })}</section>
        <section className="employer-form-section"><div className="employer-section-heading"><span>03</span><div><h2>Your company story</h2><p>Give your next teammate a reason to get to know you.</p></div></div>{field('description', 'Company description', { as: 'textarea', rows: 7, placeholder: 'What does your company do? Tell people about your team, your work, and what makes you different…', rules: required('Description') })}</section>
        {serverError && <div className="auth-error" role="alert">{serverError}</div>}<div className="employer-form-actions"><Link className="outline-action" to={editing ? `/employer/companies/${company._id}` : '/employer/my_companies'}>Cancel</Link><button className="primary-link" type="submit" disabled={isSubmitting}>{isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}{isSubmitting ? 'Saving…' : editing ? 'Save changes' : 'Create company'}</button></div></form>;
}
EmployerCompanyForm.propTypes = { company: PropTypes.object };
