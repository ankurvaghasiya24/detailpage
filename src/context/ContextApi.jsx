// ContextApi.js
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const SubdomainContext = createContext();

// SubdomainProvider component that fetches data and provides it via context
export const SubdomainProvider = ({ children}) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  let subdomain = "product"
  let fromPreview = true

  useEffect(() => {
    const apiUrl = `https://admin.artpallatte.com/api/website-data/${subdomain}/${
      fromPreview ? "?frompreview=true" : ""
    }`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data && response.data.data) {
          setUserData({ type: "subdomain", data: response.data.data });
          setError(""); // Clear any previous errors
        } else {
          setError("Something went wrong! Please try again later.");
          setUserData(null);
        }
      })
      .catch((err) => {
        console.error("API Error:", err.response?.status, err.message);

        if (err.response?.status === 403 || err.response?.status === 404) {
          setError("No user available, make this subdomain yours.");
        } else {
          setError("Something went wrong! Please try again later.");
        }

        setUserData(null);
      })
      .finally(() => setLoading(false));
  }, [subdomain, fromPreview]);

  return (
    <SubdomainContext.Provider value={{ userData, loading, error }}>
      {children}
    </SubdomainContext.Provider>
  );
};

export const useSubdomain = () => useContext(SubdomainContext);
