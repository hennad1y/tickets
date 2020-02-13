import {useCallback, useEffect, useState} from "react";

export default () => {
    const [loading, setLoading] = useState(null);
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    const doFetch = useCallback((url) => {
        setLoading(true);
        setUrl(url);
    }, []);

    useEffect(() => {
        if (!url) return;
        let isActive = true;

        fetch(url[0])
            .then(data => data.json())
            .then(json => fetch(url[1] + json.searchId))
            .then(data => data.json())
            .then(result => isActive && setResponse(result.tickets))
            .catch(error => isActive && setError(error))
            .finally(() => {
                if (isActive) {
                    setLoading(null);
                    setUrl(null);
                }
            });

        return () => {
            isActive = false
        };
    }, [url]);

    return [{loading, response, error}, doFetch]
}