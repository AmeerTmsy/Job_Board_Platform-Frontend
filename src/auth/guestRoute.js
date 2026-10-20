export function getSignedInHome(userType) {
    return userType === 'employer' ? '/employer/employer_jobs_listed' : '/';
}
