import { useState, useCallback } from "react";

export enum httpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface requestConfig {
  url: string;
  method?: httpMethod;
  headers?: { [key: string]: string };
  body?: { [key: string]: string };
}

const useHttp = function () {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendRequest = useCallback(
    async (rc: requestConfig, applyData: (data: any) => void) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(rc.url, {
          method: rc.method ? rc.method : httpMethod.GET,
          headers: rc.headers ? rc.headers : {},
          body: rc.body ? JSON.stringify(rc.body) : null,
        });

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data: any = await response.json();

        applyData(data);
      } catch (err) {
        setError((err as Error).message || "Something went wrong!");
      }
      setIsLoading(false);
    },
    []
  );
  return { isLoading, error, sendRequest };
};

export default useHttp;
