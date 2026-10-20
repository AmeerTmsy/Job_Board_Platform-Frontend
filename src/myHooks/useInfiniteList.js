import { useEffect, useMemo, useSyncExternalStore } from 'react';
import axios from 'axios';
import { createInfiniteList } from '@/lib/infiniteList';

export function useInfiniteList(url) {
    const list = useMemo(() => createInfiniteList(async (page, limit, signal) => {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, {
            params: { page, limit }, withCredentials: true, signal,
        });
        return response.data;
    }), [url]);
    const state = useSyncExternalStore(list.subscribe, list.getSnapshot);
    useEffect(() => {
        if (!url) return;
        list.activate();
        list.loadMore();
        return () => list.dispose();
    }, [list, url]);
    return { ...state, loading: Boolean(url) && (state.loading || state.page === 0 && !state.error), loadMore: list.loadMore };
}
