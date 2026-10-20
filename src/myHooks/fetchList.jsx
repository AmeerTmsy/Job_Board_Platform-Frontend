import axios from "axios";
import { useEffect, useState } from "react";

export const useFetchList = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(Boolean(url));
    useEffect(() => {
        const controller = new AbortController();
        setData(null);
        setError(null);
        setIsLoading(Boolean(url));
        if (url) axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, { withCredentials: true, signal: controller.signal })
            .then(response => { setData(response?.data?.data); setIsLoading(false); })
            .catch(error => { if (!controller.signal.aborted) { setError(error?.response?.data?.message || 'Unable to load data'); setIsLoading(false); } });
        return () => controller.abort();
    }, [url]);
    return [data, isLoading, error];
};
