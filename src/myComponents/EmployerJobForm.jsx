import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Check, ArrowUpRight, LoaderCircle, Building2 } from 'lucide-react';
import axios from 'axios';
import { toast } from '@/hooks/use-toast';
import { jobPayload } from '@/lib/employerForms';
import { setEmployerJobs } from '@/redux/slices/employer/jobsSlice';
import EmployerField from './EmployerField';

export default function EmployerJobForm({ job, companies = [], companiesLoading = false, companiesError }) {
    const editing = Boolean(job);
    const { user } = useSelector(state => state.user);
    const { employerJobs } = useSelector(state => state.employerJobs);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState('');
    const approved = companies.filter(company => company.verifiedCompany === 'approved');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({ defaultValues: { title: job?.title || '', headline: job?.headline || '', company: '', jobType: job?.jobType || 'full-time', hiring: String(job?.hiring ?? true), salary: job?.salary ?? '', location: job?.location || '', description: job?.description || '' } });
    const required = (label, max) => ({ required: `${label} is required.`, validate: value => Boolean(value.trim()) || `${label} is required.`, ...(max ? { maxLength: { value: max, message: `Use ${max} characters or fewer.` } } : {}) });
    const submit = async values => {
        setServerError('');
        try {
            const payload = jobPayload(values, user.id || user._id, !editing);
            const url = `${import.meta.env.VITE_API_BASE_URL}/jobs${editing ? `/${job._id}` : ''}`;
            const response = await axios[editing ? 'patch' : 'post'](url, payload, { withCredentials: true });
            const result = response?.data?.data;
            if (!result?._id) throw new Error('The job could not be confirmed. Please try again.');
            dispatch(setEmployerJobs([...employerJobs.filter(item => item._id !== result._id), { ...job, ...payload, ...result }]));
            toast({ description: editing ? 'Job updated.' : 'Job created and submitted for review.' });
            navigate(`/employer/employer_job_detail/${result._id}`);
        } catch (error) { setServerError(error?.response?.data?.message || error.message || 'We couldn’t save this job. Please try again.'); }
    };
    const field = (name, label, props = {}) => <EmployerField name={name} label={label} register={register} error={errors[name]} {...props} />;
    return <form className="detail-panel employer-editor" onSubmit={handleSubmit(submit)} noValidate>
        <section className="employer-form-section"><div className="employer-section-heading"><span>01</span><div><h2>The basics</h2><p>A clear title and a short introduction to the opportunity.</p></div></div>{field('title', 'Job title', { placeholder: 'e.g. Product Designer', rules: required('Job title', 35), maxLength: 35 })}
        {editing ? <div className="job-company-context"><Building2 size={18} /><div><span>Company</span><strong>{job.company?.name || 'Current company'}</strong></div></div> : <>{field('company', 'Company', { as: 'select', disabled: companiesLoading || !approved.length, rules: { required: 'Choose an approved company.', validate: value => approved.some(company => company._id === value) || 'Choose an approved company.' }, children: <><option value="">{companiesLoading ? 'Loading companies…' : 'Choose a company'}</option>{approved.map(company => <option value={company._id} key={company._id}>{company.name}</option>)}</> })}{!companiesLoading && !approved.length && <div className="form-company-notice"><p>{companiesError && !/not found/i.test(companiesError) ? 'We couldn’t load your companies. Please try again later.' : 'You need an approved company before posting a job.'}</p><Link to="/employer/my_companies">Manage companies <ArrowUpRight size={14} /></Link></div>}</>}
        {field('headline', 'Short headline', { placeholder: 'A brief introduction to the role', hint: 'Keep it concise: up to 80 characters.', rules: required('Headline', 80), maxLength: 80 })}</section>
        <section className="employer-form-section"><div className="employer-section-heading"><span>02</span><div><h2>Role details</h2><p>Set expectations before the first conversation.</p></div></div><div className="auth-field-row">{field('jobType', 'Work type', { as: 'select', rules: { required: 'Choose a work type.' }, children: <><option value="full-time">Full-time</option><option value="part-time">Part-time</option></> })}{field('hiring', 'Hiring status', { as: 'select', rules: { required: 'Choose a hiring status.' }, children: <><option value="true">Currently hiring</option><option value="false">Not hiring right now</option></> })}</div><div className="auth-field-row">{field('salary', 'Salary (₹)', { type: 'number', min: 0, step: 'any', placeholder: 'e.g. 800000', rules: { required: 'Enter a salary.', min: { value: 0, message: 'Enter zero or a positive amount.' }, validate: value => Number.isFinite(Number(value)) || 'Enter a valid amount.' } })}{field('location', 'Location', { placeholder: 'e.g. Bengaluru or Remote', rules: required('Location') })}</div></section>
        <section className="employer-form-section"><div className="employer-section-heading"><span>03</span><div><h2>About the role</h2><p>Give candidates a useful picture of the work.</p></div></div>{field('description', 'Job description', { as: 'textarea', rows: 8, placeholder: 'Describe the responsibilities, experience, and skills you’re looking for…', rules: required('Description') })}</section>
        {serverError && <div className="auth-error" role="alert">{serverError}</div>}<div className="employer-form-actions"><Link className="outline-action" to={editing ? `/employer/employer_job_detail/${job._id}` : '/employer/employer_jobs_listed'}>Cancel</Link><button className="primary-link" type="submit" disabled={isSubmitting || !editing && (companiesLoading || !approved.length)}>{isSubmitting ? <LoaderCircle size={16} className="animate-spin" /> : <Check size={16} />}{isSubmitting ? 'Saving…' : editing ? 'Save changes' : 'Create job'}</button></div>
    </form>;
}
EmployerJobForm.propTypes = { job: PropTypes.object, companies: PropTypes.array, companiesLoading: PropTypes.bool, companiesError: PropTypes.string };
