import test from 'node:test';
import assert from 'node:assert/strict';
import { getNavigation, isNavigationActive } from '../src/lib/navigation.js';

test('guests see job discovery without protected links', () => {
    assert.deepEqual(getNavigation(undefined, false).map(item => item.to), ['/']);
});
test('job seekers have direct saved jobs and applications links', () => {
    assert.deepEqual(getNavigation('employee', true).map(item => item.label), ['Find jobs', 'Companies', 'Saved jobs', 'Applications']);
});
test('employers see candidates and their own jobs and companies', () => {
    assert.deepEqual(getNavigation('employer', true).map(item => item.to), ['/employer/employees', '/employer/employer_jobs_listed', '/employer/my_companies']);
});
test('admin navigation only focuses on job and company review', () => {
    assert.deepEqual(getNavigation('admin', true).map(item => item.label), ['Review jobs', 'Review companies']);
});
test('detail pages keep their parent navigation highlighted', () => {
    assert.equal(isNavigationActive('/jobs/123', getNavigation('employee', true)[0]), true);
    assert.equal(isNavigationActive('/admin/companies/123', getNavigation('admin', true)[1]), true);
    assert.equal(isNavigationActive('/employer/employees/123', getNavigation('employer', true)[0]), true);
});
test('employer create, edit, and detail pages highlight the right management section', () => {
    const [, jobs, companies] = getNavigation('employer', true);
    for (const path of ['/employer/employer_job_detail/123', '/employer/employer_job_edit/123', '/employer/new_job_create']) assert.equal(isNavigationActive(path, jobs), true);
    for (const path of ['/employer/company_create', '/employer/edit_company/123', '/employer/companies/123']) assert.equal(isNavigationActive(path, companies), true);
    assert.equal(isNavigationActive('/employer/employees', jobs), false);
    assert.equal(isNavigationActive('/employee/applied_jobs', getNavigation('employee', true)[0]), false);
});
