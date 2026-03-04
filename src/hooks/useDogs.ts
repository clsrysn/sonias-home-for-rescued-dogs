import { useState, useEffect } from "react";
import { Dog as FirebaseDog } from "../firebase/database";
import { getAllDogs } from "../firebase/database";

// Hook to fetch dogs from Firebase
export const useDogs = () => {
  const [dogs, setDogs] = useState<FirebaseDog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      console.log('Attempting to fetch dogs from Firebase...');
      const dogsData = await getAllDogs();
      console.log('Successfully fetched dogs from Firebase:', dogsData);
      setDogs(dogsData);
      setError(null);
    } catch (err) {
      console.error("Error fetching dogs from Firebase:", err);
      console.error('Error details:', err.code, err.message);
      setDogs([]);
      setError("Failed to load dogs data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return { dogs, loading, error, refetch: fetchDogs };
};
