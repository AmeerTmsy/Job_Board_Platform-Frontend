import axios from "axios";
import { useEffect, useState } from "react"

export const useFetchDataDetail = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        await axios.get(`${import.meta.env.VITE_API_BASE_URL}/${url}`, { withCredentials: true })
            .then(response => {
                setTimeout(() => {
                    setData(response?.data?.data)
                    setIsLoading(false)
                }, 500);
                setError(null)
            })
            .catch(error => /*console.log(error, "|| Unable to fetch list")*/setError(error.response.data.message))
    }
    useEffect(() => {
        fetchData()
    }, [url]);

    return [data, isLoading, error]
}
