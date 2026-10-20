export function normalizeWebsite(value) {
    const input = value.trim();
    if (!input) return '';
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!['https:', 'http:'].includes(url.protocol) || !url.hostname.includes('.') || url.username || url.password) throw new Error('Enter a valid website, such as https://example.com.');
    return url.href;
}

export function jobPayload(values, ownerId, creating) {
    const payload = {
        title: values.title.trim(), headline: values.headline.trim(),
        location: values.location.trim(), description: values.description.trim(),
        jobType: values.jobType, hiring: values.hiring === 'true', salary: Number(values.salary),
    };
    if (creating) Object.assign(payload, { company: values.company, jobCreatedBy: ownerId });
    return payload;
}

export function validateCompanyLogo(files) {
    const file = files?.[0];
    if (!file) return true;
    if (!['image/jpeg', 'image/png'].includes(file.type)) return 'Choose a JPG or PNG image.';
    return file.size <= 5 * 1024 * 1024 || 'Choose an image smaller than 5 MB.';
}

export function companyPayload(values, ownerId, creating) {
    const payload = new FormData();
    for (const name of ['name', 'location', 'industry', 'description']) payload.append(name, values[name].trim());
    payload.append('website', normalizeWebsite(values.website));
    if (creating) payload.append('createdBy', ownerId);
    if (values.logo?.[0]) payload.append('companyIconImage', values.logo[0]);
    return payload;
}
