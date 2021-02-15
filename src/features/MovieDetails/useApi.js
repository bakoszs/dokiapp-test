import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Config } from "../../config";

const wikiApi = axios.create({
    baseURL: Config.wikiApiUrl,
    headers: {
        "Accept": "application/json"
    }
});

const tmdbApi = axios.create({
    baseURL: Config.tmdbApiUrl,
    headers: {
        "Accept": "application/json"
    }
});

const useApi = ({ api, config = { method: "GET", url: null }, options = { manual: false}  }) => {
    const stringifiedConfig = JSON.stringify(config);

    const [response, updateResponse] = useState(null);
    const [error, updateError] = useState(null);
    const [loading, updateLoading] = useState(false);

    const executeRequest = async (axiosConfig) => {
        updateLoading(true);
        updateError(null);

        try {
            const { data } = await api(axiosConfig);
            updateResponse(data);
        } catch(err) {
            updateError(err);
        } finally {
            updateLoading(false);
        }
    };

    const execute = useCallback((configOverride) => {
        const mergedConfig = { ...config, ...configOverride };
        return executeRequest(mergedConfig);
    }, [stringifiedConfig]);

    useEffect(() => {
        if(!options.manual) {
            executeRequest(config);
        }
    }, [stringifiedConfig]);

    return {
        response,
        error,
        loading,
        execute
    };
};

useApi.displayName = "useApi";
export { useApi, tmdbApi, wikiApi };
export default useApi;