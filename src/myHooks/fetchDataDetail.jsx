import axios from 'axios';
import { useEffect, useState } from 'react';
export const useFetchDataDetail = (url) => {
    const [result, setResult] = useState({ url: null, data: null, error: null, loading: true });
    useEffect(() => {
        const controller = new AbortController();
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, { withCredentials: true, signal: controller.signal })
            .then(response => setResult({ url, data: response?.data?.data, error: null, loading: false }))
            .catch(error => { if (!controller.signal.aborted) setResult({ url, data: null, error: error?.response?.data?.message || 'Unable to load this page. Please try again.', loading: false }); });
        return () => controller.abort();
    }, [url]);
    return result.url === url ? [result.data, result.loading, result.error] : [null, true, null];
};
