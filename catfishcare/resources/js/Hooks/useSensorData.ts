import { useState, useEffect } from "react";
import Papa from "papaparse";
import type { SensorRow, CsvRow } from "@/Types";
import { normalizeSensorRow } from "@/Utils/csvParser";

export const useSensorData = (selectedPondId: number) => {
    const [rawData, setRawData] = useState<SensorRow[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

    // Load and parse the CSV data
    useEffect(() => {
        // Reset simulation index and playing state on pond change
        setCurrentIndex(0);
        setIsPlaying(false);

        fetch(`/datasets/IoTPond${selectedPondId}.csv`)
            .then((response) => response.text())
            .then((csvText) => {
                Papa.parse(csvText, {
                    header: true,
                    skipEmptyLines: true,
                    complete: (results: { data: CsvRow[] }) => {
                        const cleanedData = results.data.map(normalizeSensorRow);
                        setRawData(cleanedData);
                    },
                });
            })
            .catch((error) => console.error("Error fetching CSV:", error));
    }, [selectedPondId]);

    // Simulation loop
    useEffect(() => {
        let intervalId: ReturnType<typeof setInterval> | undefined;
        if (isPlaying && rawData.length > 0) {
            intervalId = setInterval(() => {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex >= rawData.length - 1) {
                        setIsPlaying(false);
                        return prevIndex;
                    }
                    return prevIndex + 1;
                });
            }, 2000); // Step every 2 seconds
        }
        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isPlaying, rawData.length]);

    const currentData = rawData[currentIndex] ?? null;

    // Sliding window of exactly 15 elements for charts
    const latestRows = rawData.slice(
        Math.max(0, currentIndex - 14),
        Math.max(15, currentIndex + 1),
    );

    return {
        rawData,
        currentData,
        currentIndex,
        setCurrentIndex,
        isPlaying,
        setIsPlaying,
        latestRows,
    };
};
