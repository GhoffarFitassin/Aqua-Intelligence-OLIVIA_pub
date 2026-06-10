import type { SensorRow, StatusInfo } from "@/Types";

// AI Decision Logic (Decision Support System based on AGENTS.md rules)
export const getPondStatus = (
    currentData: SensorRow | null,
    selectedPondId: number,
): StatusInfo => {
    if (!currentData)
        return {
            type: "success",
            text: "Mengambil data...",
            title: "SEDANG MEMUAT",
        };

    const doVal = currentData.DO;
    const ammoniaVal = currentData.AMMONIA;
    const tempVal = currentData.TEMPERATURE;
    const nitrateVal = currentData.NITRATE;
    const pHVal = currentData.pH;

    // Skenario A: DO rendah (hypoxia) ATAU Ammonia kritis
    if (doVal <= 2 || ammoniaVal > 0.0005) {
        return {
            type: "danger",
            title: "🔴 BAHAYA KRITIS",
            text: "Oksigen (DO) drop atau tingkat Ammonia/Nitrat beracun! Nyalakan aerator darurat segera.",
            actionList: [
                {
                    id: 1,
                    text: `Segera hidupkan aerator maksimal di Kolam ${selectedPondId}.`,
                    checked: false,
                },
                {
                    id: 2,
                    text: "Lakukan pergantian air (Sifon) dasar kolam sebesar 30%.",
                    checked: false,
                },
                {
                    id: 3,
                    text: "Puasakan ikan (jangan beri pakan) selama 24 jam untuk menekan amonia.",
                    checked: false,
                },
            ],
        };
    }

    // Skenario B: Suhu dingin/fluktuatif (potensi Upwelling) ATAU pH asam
    if (tempVal < 27.05 || pHVal < 6.05 || nitrateVal > 250) {
        return {
            type: "warning",
            title: "🟡 WASPADA UPWELLING",
            text: "Suhu dingin atau pH asam terdeteksi. Risiko kotoran naik dari dasar kolam.",
            actionList: [
                {
                    id: 1,
                    text: "Periksa penumpukan lumpur organik di dasar kolam.",
                    checked: false,
                },
                {
                    id: 2,
                    text: "Taburkan kapur Dolomit secukupnya untuk menaikkan pH.",
                    checked: false,
                },
                {
                    id: 3,
                    text: "Pertimbangkan pemberian probiotik air untuk menstabilkan bakteri pengurai.",
                    checked: false,
                },
            ],
        };
    }

    // Skenario C: Normal
    return {
        type: "success",
        title: "🟢 AMAN & OPTIMAL",
        text: "Seluruh parameter kualitas air dalam kondisi prima. Pertumbuhan berjalan normal.",
        actionList: [
            {
                id: 1,
                text: "Kondisi kolam sangat baik. Lanjutkan jadwal pakan standar.",
                checked: false,
            },
        ],
    };
};
