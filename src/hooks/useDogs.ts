import { useState, useEffect } from "react";
import { Dog as FirebaseDog } from "../firebase/database";
import { getAllDogs } from "../firebase/database";
import { allDogs as staticDogs } from "../data/dogs";
import "../firebase/test"; // Test Firebase connection

// Hook to replace static dogs data with Firebase fallback
export const useDogs = () => {
  const [dogs, setDogs] = useState<FirebaseDog[]>(staticDogs as FirebaseDog[]);
  const [loading, setLoading] = useState(false);
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
      // Fallback to static data if Firebase fails
      console.warn("Firebase not configured, using static data:", err);
      console.warn('Error details:', err.code, err.message);
      setDogs(staticDogs as FirebaseDog[]);
      setError("Using offline data - Firebase not configured");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDogs();
  }, []);

  return { dogs, loading, error, refetch: fetchDogs };
};
