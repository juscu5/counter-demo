import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { LSTVProgressBar } from "../components/LSTVProgressBar";
import axios from "axios";

const LSTVPageRootStyle = styled("div")(() => ({
  display: "flex",
  witdh: "100%",
}));

export const CounterDemo = () => {
  const [progress, setProgress] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [chunk, setChunk] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const totalRequests = 100; // Number of requests to simulate
      let fetchedData: any[] = [];

      for (let i = 1; i <= totalRequests; i++) {
        try {
          const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${i}`
          );
          fetchedData.push(response.data);

          // Update progress
          setProgress((i / totalRequests) * 100);
          setChunk(response.data.title);
        } catch (err) {
          setError("An error occurred while fetching data");
          setLoading(false);
          return;
        }
      }
      setData(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LSTVPageRootStyle>
      <Box width="100%" m={5}>
        <LSTVProgressBar value={progress} />
        <Typography>{chunk}</Typography>
      </Box>
    </LSTVPageRootStyle>
  );
};
