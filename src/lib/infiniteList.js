export const PAGE_SIZE = 9;

export function createInfiniteList(fetchPage) {
    let state = { items: [], page: 0, total: 0, hasMore: true, loading: false, error: null, facets: {} };
    let controller;
    let disposed = false;
    let generation = 0;
    const listeners = new Set();
    const update = changes => {
        state = { ...state, ...changes };
        listeners.forEach(listener => listener());
    };
    return {
        getSnapshot: () => state,
        subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener); },
        activate() { disposed = false; },
        async loadMore() {
            if (disposed || state.loading || !state.hasMore) return;
            controller = new AbortController();
            const version = ++generation;
            const signal = controller.signal;
            const page = state.page + 1;
            update({ loading: true, error: null });
            try {
                const response = await fetchPage(page, PAGE_SIZE, signal);
                if (disposed || version !== generation) return;
                if (!Array.isArray(response.data) || !response.pagination || response.pagination.page !== page || response.data.length > PAGE_SIZE) {
                    throw new Error('The server could not provide this page. Please try again after the API is updated.');
                }
                const ids = new Set(state.items.map(item => item._id));
                const additions = response.data.filter(item => !ids.has(item._id) && ids.add(item._id));
                update({ items: [...state.items, ...additions], page, total: response.pagination.total, hasMore: Boolean(response.pagination.hasMore && response.data.length), loading: false, facets: response.facets || state.facets });
            } catch (error) {
                if (!disposed && version === generation && !signal.aborted) update({ loading: false, error: error?.response?.data?.message || error.message || 'Unable to load results.' });
            }
        },
        dispose() { disposed = true; generation++; controller?.abort(); state = { ...state, loading: false }; },
    };
}
