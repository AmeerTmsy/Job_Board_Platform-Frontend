import PropTypes from 'prop-types';

export default function EmployerField({ name, label, register, error, rules = {}, hint, as: Tag = 'input', children, ...props }) {
    const id = `employer-${name}`;
    const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined;
    return <div className="auth-field employer-field"><label htmlFor={id}>{label}{rules.required && <span className="required-mark" aria-hidden="true"> *</span>}</label><Tag id={id} {...props} {...register(name, rules)} aria-required={Boolean(rules.required)} aria-invalid={Boolean(error)} aria-describedby={describedBy}>{children}</Tag>{hint && <p className="field-hint" id={`${id}-hint`}>{hint}</p>}{error && <span className="field-error" role="alert" id={`${id}-error`}>{error.message}</span>}</div>;
}
EmployerField.propTypes = { name: PropTypes.string.isRequired, label: PropTypes.string.isRequired, register: PropTypes.func.isRequired, error: PropTypes.object, rules: PropTypes.object, hint: PropTypes.string, as: PropTypes.string, children: PropTypes.node };
