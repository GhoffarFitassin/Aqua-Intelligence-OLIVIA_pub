import { useState, useCallback } from "react";
import { Plus, Cpu } from "lucide-react";
import { DataTable, Modal, TextInput, Button } from "@/Components/ui";
import type { DataTableColumn } from "@/Components/ui";
import AppLayout from "@/Layouts/AppLayout";

interface EspRecord {
    id: number;
    uuid: string;
    [key: string]: unknown;
}

const initialEspData: EspRecord[] = [
    { id: 1, uuid: "ESP-28A4-B1F0-001" },
    { id: 2, uuid: "ESP-28A4-B1F0-002" },
    { id: 3, uuid: "ESP-28A4-B1F0-003" },
    { id: 4, uuid: "ESP-7C9E-D3A2-004" },
    { id: 5, uuid: "ESP-7C9E-D3A2-005" },
];

const EspPage = () => {
    const [espList, setEspList] = useState<EspRecord[]>(initialEspData);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEsp, setEditingEsp] = useState<EspRecord | null>(null);
    const [uuidValue, setUuidValue] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const openAddModal = useCallback(() => {
        setEditingEsp(null);
        setUuidValue("");
        setIsModalOpen(true);
    }, []);

    const openEditModal = useCallback((row: EspRecord) => {
        setEditingEsp(row);
        setUuidValue(row.uuid);
        setIsModalOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsModalOpen(false);
        setEditingEsp(null);
        setUuidValue("");
    }, []);

    const handleSubmit = useCallback(() => {
        if (!uuidValue.trim()) return;
        setIsSubmitting(true);

        setTimeout(() => {
            if (editingEsp) {
                setEspList((prev) =>
                    prev.map((esp) =>
                        esp.id === editingEsp.id
                            ? { ...esp, uuid: uuidValue.trim() }
                            : esp,
                    ),
                );
            } else {
                const newId =
                    espList.length > 0
                        ? Math.max(...espList.map((e) => e.id)) + 1
                        : 1;
                setEspList((prev) => [
                    ...prev,
                    { id: newId, uuid: uuidValue.trim() },
                ]);
            }
            setIsSubmitting(false);
            closeModal();
        }, 400);
    }, [uuidValue, editingEsp, espList, closeModal]);

    const handleDelete = useCallback((row: EspRecord) => {
        if (window.confirm(`Hapus ESP "${row.uuid}"?`)) {
            setEspList((prev) => prev.filter((esp) => esp.id !== row.id));
        }
    }, []);

    const columns: DataTableColumn<EspRecord>[] = [
        { key: "id", header: "ID", sortable: true },
        {
            key: "uuid",
            header: "UUID",
            sortable: true,
            render: (row) => (
                <span
                    style={{ fontFamily: "monospace", letterSpacing: "0.5px" }}
                >
                    {row.uuid}
                </span>
            ),
        },
    ];

    return (
        <AppLayout>
            <div className="tab-page esp-page" style={{ padding: "2rem" }}>
                <div
                    className="ponds-header-row"
                    style={{ marginBottom: "1.5rem" }}
                >
                    <div>
                        <h2
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                            }}
                        >
                            <Cpu size={22} />
                            Manajemen ESP
                        </h2>
                        <p>
                            Kelola perangkat Electronic Sensor Platform (ESP)
                            untuk monitoring kolam.
                        </p>
                    </div>
                    <Button
                        variant="add"
                        icon={<Plus size={16} />}
                        onClick={openAddModal}
                    >
                        <span>Tambah ESP</span>
                    </Button>
                </div>

                <DataTable<EspRecord>
                    data={espList}
                    columns={columns}
                    title="Daftar Perangkat ESP"
                    showRowNumber
                    showActions
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                    pageSize={10}
                    searchPlaceholder="Cari UUID..."
                    emptyMessage="Belum ada data ESP. Klik tombol 'Tambah ESP' untuk menambahkan."
                />

                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={editingEsp ? "Edit ESP" : "Tambah ESP Baru"}
                    onSubmit={handleSubmit}
                    submitText={editingEsp ? "Simpan Perubahan" : "Tambah"}
                    isSubmitting={isSubmitting}
                    size="small"
                >
                    <TextInput
                        label="UUID ESP"
                        placeholder="Contoh: ESP-28A4-B1F0-006"
                        value={uuidValue}
                        onChange={(e) => setUuidValue(e.target.value)}
                        required
                        autoFocus
                    />
                    <p
                        style={{
                            fontSize: "0.8rem",
                            opacity: 0.7,
                            marginTop: "0.5rem",
                        }}
                    >
                        Masukkan UUID unik perangkat ESP. UUID ini akan
                        digunakan sebagai referensi ke data kolam.
                    </p>
                </Modal>
            </div>
        </AppLayout>
    );
};

export default EspPage;
