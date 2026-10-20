# Infinite scrolling

Jobs, company directories, candidate directories, employer job/company collections,
and company open roles request nine records per page. More records append near the
bottom; the accessible Load 9 more button is also available. Changing search,
filters, or sorting starts a fresh list. Failed requests preserve previous cards
and can be retried.

## API and deployment

Deploy the accompanying backend pagination changes before this frontend. The
frontend requires pagination metadata and will offer a retry if an old backend
returns an unpaginated list. Neither repository is automatically pushed.

`GET /jobs?page=1&limit=9` (also `/companies` and `/users`) returns:

```json
{
  "success": true,
  "data": [],
  "pagination": { "page": 1, "limit": 9, "total": 0, "hasMore": false }
}
```

Filtering and stable sorting happen before skip/limit. Existing ownership,
verification, and search filters still apply. Supported sorts are `name`, `title`,
and `experience`; default/newest sort is `createdAt` descending with `_id` as a
stable tiebreaker. Candidate `minExperience` is inclusive and `maxExperience` is
exclusive. Company `facets=industry` returns full-result industry options;
`summary=1` returns full-result verification counts for employer collections.

Requests without `page` keep returning full arrays, for existing internal state
hydration and other callers. Saved jobs and applications retain their existing
endpoints and behavior.

## Verification

Run `npm test` in each repository. Backend tests use a query double; they do not
require or modify a MongoDB instance. Browser checks use sample API responses,
including StrictMode, 9 → 18 → final batch, filter resets, and end-of-list state.
