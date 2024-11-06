import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchList = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    if (!url) return [null, false, null];

    if (!url) {
        setData(null);
        setIsLoading(false);
        setError(null);
        return;
    }

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, { withCredentials: true })
            .then(response => {
                // console.log("response: ", response)
                setError(null)
                setData(response?.data?.data);
                setIsLoading(false);
                setError(null);
            })
            .catch(error => {
                console.log(error, "|| Unable to fetch list");
                setError(error?.response?.data?.message);
                setIsLoading(false);
            })
    }
    useEffect(() => {
        fetchData()
    }, [url]);

    return [data, isLoading, error]
}