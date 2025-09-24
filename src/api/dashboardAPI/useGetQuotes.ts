import { useQuery } from "@tanstack/react-query";
export const useGetQuotes = () => {

  const { data, isLoading, error } = useQuery({
    queryKey: ["get_quote"],
    queryFn: async () => {
      const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
          "X-Api-Key": import.meta.env.VITE_QUOTES_API_KEY,
        },
      });

      return res.json();
    },
    refetchInterval: 5000,
    enabled: navigator.onLine,
    retry: false
  });
  

  return { data, isLoading, error };
};
