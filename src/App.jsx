import useSWR from "swr";
import { useState } from "react";
import "./App.css";

function App() {
  const url = "https://httpstat.us/200?sleep=2000";
  const headers = { Accept: "application/json" };

    const fetcher = (url) => fetch(url, { headers }).then((res) => res.json());

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    const [isLoadingButton, setIsLoadingButton] = useState(false);
    const [status, setStatus] = useState("");

    const handleLoad = async () => {
        setIsLoadingButton(true);
        setStatus("Loading...");
        await mutate();
        setIsLoadingButton(false);
        setStatus(data ? data.description : "OK");
    };

    if (error) return <p className="error">Failed to load.</p>;

    return (
        <div className="app">
            <h1>Status Checker</h1>
            <div className="status-box">
                <p>Status: {isLoadingButton || isLoading ? "Loading..." : status || "OK"}</p>
            </div>
            {!isLoadingButton && !isLoading && (
                <button onClick={handleLoad} className="load-button">
                    Load Status
                </button>
            )}
        </div>
    );
}

export default App;
