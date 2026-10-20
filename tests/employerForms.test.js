import test from 'node:test';
import assert from 'node:assert/strict';
import { jobPayload, companyPayload, normalizeWebsite, validateCompanyLogo } from '../src/lib/employerForms.js';

const job = { title: ' Designer ', headline: ' A good role ', location: ' Remote ', description: ' Make things ', jobType: 'full-time', hiring: 'false', salary: '0', company: 'company-123' };
test('job payload preserves zero salary and converts false hiring to a boolean', () => {
    const payload = jobPayload(job, 'owner-123', true);
    assert.equal(payload.hiring, false); assert.equal(payload.salary, 0); assert.equal(payload.title, 'Designer');
    assert.equal(payload.company, 'company-123'); assert.equal(payload.jobCreatedBy, 'owner-123');
});
test('editing a job does not accidentally reassign its company or owner', () => {
    const payload = jobPayload({ ...job, hiring: 'true' }, 'owner-123', false);
    assert.equal(payload.hiring, true); assert.equal(payload.company, undefined); assert.equal(payload.jobCreatedBy, undefined);
});
test('website normalization accepts domains and optional empty websites', () => {
    assert.equal(normalizeWebsite(' example.com '), 'https://example.com/');
    assert.equal(normalizeWebsite('https://example.com/team'), 'https://example.com/team');
    assert.equal(normalizeWebsite(''), '');
});
for (const value of ['javascript:alert(1)', 'ftp://example.com', 'https://name:password@example.com', 'not a website']) {
    test(`rejects unsuitable website ${value}`, () => assert.throws(() => normalizeWebsite(value)));
}
test('company multipart payload uses the backend logo field and preserves text fields', () => {
    const logo = new File(['image'], 'logo.png', { type: 'image/png' });
    const payload = companyPayload({ name: ' Forma ', location: ' Remote ', industry: ' Design ', description: ' Our team ', website: 'example.com', logo: [logo] }, 'owner-123', true);
    assert.equal(payload.get('name'), 'Forma'); assert.equal(payload.get('website'), 'https://example.com/');
    assert.equal(payload.get('createdBy'), 'owner-123'); assert.equal(payload.get('companyIconImage').name, 'logo.png');
});
test('company edits preserve ownership and do not replace a logo when none is selected', () => {
    const payload = companyPayload({ name: 'Forma', location: 'Remote', industry: 'Design', description: 'Our team', website: '' }, 'owner-123', false);
    assert.equal(payload.has('createdBy'), false); assert.equal(payload.has('companyIconImage'), false);
});
test('logo validation matches JPG/PNG backend support and catches oversized images', () => {
    assert.equal(validateCompanyLogo([]), true);
    assert.equal(validateCompanyLogo([{ type: 'image/png', size: 1024 }]), true);
    assert.equal(validateCompanyLogo([{ type: 'image/jpeg', size: 1024 }]), true);
    assert.equal(typeof validateCompanyLogo([{ type: 'image/svg+xml', size: 1024 }]), 'string');
    assert.equal(typeof validateCompanyLogo([{ type: 'image/png', size: 6 * 1024 * 1024 }]), 'string');
});
