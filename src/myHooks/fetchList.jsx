import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchList = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!url) return [null, false, null];

    useEffect(() => {
        if (!url) {
            setData(null);
            setIsLoading(false);
            setError(null);
            return;
        }

        let isMounted = true; // Track if the component is mounted

        const fetchData = async () => {
            // console.log("url: ",url)
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, { withCredentials: true })
                .then(response => {
                    setError(null)
                    setTimeout(() => {
                        setData(response?.data?.data);
                        setIsLoading(false);
                        setError(null);
                    }, 500);
                })
                .catch(error => {
                    console.log(error/*.response.data.message === 'Jobs not found' && 'there is not any regcted jobs'*/, "|| Unable to fetch list");
                    setError(error?.response?.data?.message);
                    setIsLoading(false);
                })
        }
        fetchData()

        return () => {
            isMounted = false; // Cleanup function to prevent state updates if unmounted
        };

    }, [url]);

    return [data, isLoading, error]
}