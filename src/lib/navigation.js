export function getNavigation(role, loggedIn) {
    if (!loggedIn) return [{ to: '/', label: 'Find jobs', section: 'jobs' }];
    if (role === 'admin') return [
        { to: '/', label: 'Review jobs', section: 'jobs' },
        { to: '/admin/companies', label: 'Review companies', section: 'companies' },
    ];
    if (role === 'employer') return [
        { to: '/employer/employees', label: 'Find candidates', section: 'candidates' },
        { to: '/employer/employer_jobs_listed', label: 'My jobs', section: 'employerJobs' },
        { to: '/employer/my_companies', label: 'My companies', section: 'employerCompanies' },
    ];
    return [
        { to: '/', label: 'Find jobs', section: 'jobs' },
        { to: '/employee/companies', label: 'Companies', section: 'companies' },
        { to: '/employee/saved_jobs', label: 'Saved jobs', section: 'saved' },
        { to: '/employee/applied_jobs', label: 'Applications', section: 'applications' },
    ];
}

export function isNavigationActive(path, item) {
    if (item.section === 'jobs') return path === '/' || path.startsWith('/jobs/');
    if (item.section === 'employerJobs') return /^\/employer\/(employer_jobs_listed|employer_job_detail|employer_job_edit|new_job_create)(\/|$)/.test(path);
    if (item.section === 'employerCompanies') return /^\/employer\/(my_companies|edit_company|company_create|companies)(\/|$)/.test(path);
    return path === item.to || path.startsWith(`${item.to}/`);
}
