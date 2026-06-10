import os
import glob
import csv

# Konfigurasi path
base_dir = os.path.dirname(os.path.abspath(__file__))
datasets_dir = os.path.join(base_dir, 'datasets')
cleaned_dir = os.path.join(datasets_dir, 'cleaned')

# Membuat folder output jika belum ada
if not os.path.exists(cleaned_dir):
    os.makedirs(cleaned_dir)

# Mencari semua file CSV di folder datasets
csv_files = glob.glob(os.path.join(datasets_dir, '*.csv'))

# Nama kolom target yang diinginkan
TARGET_CREATED = 'created_at'
TARGET_ENTRY = 'entry_id'
TARGET_TEMP = 'Temperature (C)'
TARGET_TURB = 'Turbidity(NTU)'
TARGET_PH = 'PH'

print(f"Ditemukan {len(csv_files)} file CSV di folder: {datasets_dir}")

for file_path in csv_files:
    filename = os.path.basename(file_path)
    
    # Abaikan jika ini bukan file utama
    if not os.path.isfile(file_path):
        continue
        
    print(f"\nMemproses {filename}...")
    try:
        # Membaca baris pertama untuk mencocokkan nama kolom asli
        with open(file_path, mode='r', newline='', encoding='utf-8-sig') as infile:
            reader = csv.reader(infile)
            try:
                headers = next(reader)
            except StopIteration:
                print(f"File {filename} kosong. Dilewati.")
                continue

        # Inisialisasi variabel untuk index kolom asli
        created_idx = None
        entry_idx = None
        temp_idx = None
        turb_idx = None
        ph_idx = None
        
        # Mencocokkan nama kolom secara fleksibel (case-insensitive) menggunakan index
        for idx, h in enumerate(headers):
            h_clean = h.strip().lower()
            if 'created' in h_clean:
                created_idx = idx
            elif 'entry' in h_clean:
                entry_idx = idx
            elif 'temp' in h_clean:
                temp_idx = idx
            elif 'turbid' in h_clean:
                turb_idx = idx
            elif h_clean == 'ph':
                ph_idx = idx

        # Fallback jika created_at / timestamp tidak ketemu nama kolomnya
        if created_idx is None:
            # Periksa jika kolom pertama kosong namanya (unnamed column untuk timestamp)
            if len(headers) > 0 and (headers[0] == '' or headers[0].isspace()):
                created_idx = 0
            # Atau cari kolom dengan nama 'date' atau 'time'
            else:
                for idx, h in enumerate(headers):
                    if h.strip().lower() in ('date', 'time', 'timestamp'):
                        created_idx = idx
                        break

        # Memvalidasi ketersediaan kolom
        if None in (created_idx, entry_idx, temp_idx, turb_idx, ph_idx):
            missing = []
            if created_idx is None: missing.append("created_at")
            if entry_idx is None: missing.append("entry_id")
            if temp_idx is None: missing.append("Temperature")
            if turb_idx is None: missing.append("Turbidity")
            if ph_idx is None: missing.append("pH")
            print(f"File {filename} dilewati karena kolom target tidak lengkap: {', '.join(missing)}")
            continue

        print(f"Pencocokan kolom untuk {filename}:")
        print(f"  - Created At (Index {created_idx}): '{headers[created_idx]}' -> '{TARGET_CREATED}'")
        print(f"  - Entry ID   (Index {entry_idx}): '{headers[entry_idx]}' -> '{TARGET_ENTRY}'")
        print(f"  - Temperature(Index {temp_idx}): '{headers[temp_idx]}' -> '{TARGET_TEMP}'")
        print(f"  - Turbidity  (Index {turb_idx}): '{headers[turb_idx]}' -> '{TARGET_TURB}'")
        print(f"  - pH         (Index {ph_idx}): '{headers[ph_idx]}' -> '{TARGET_PH}'")

        # Path file output hasil pembersihan
        output_file_path = os.path.join(cleaned_dir, filename)
        
        # Membaca file input dan menulis ke file output menggunakan reader index
        with open(file_path, mode='r', newline='', encoding='utf-8-sig') as infile, \
             open(output_file_path, mode='w', newline='', encoding='utf-8', errors='ignore') as outfile:
            
            reader = csv.reader(infile)
            # Skip baris header asli
            next(reader)
            
            writer = csv.writer(outfile)
            # Tulis header baru
            writer.writerow([TARGET_CREATED, TARGET_ENTRY, TARGET_TEMP, TARGET_TURB, TARGET_PH])
            
            row_count = 0
            for row in reader:
                if not row:
                    continue
                # Mengambil nilai berdasarkan index (dengan fallback aman)
                created_val = row[created_idx] if created_idx < len(row) else ''
                entry_val = row[entry_idx] if entry_idx < len(row) else ''
                temp_val = row[temp_idx] if temp_idx < len(row) else ''
                turb_val = row[turb_idx] if turb_idx < len(row) else ''
                ph_val = row[ph_idx] if ph_idx < len(row) else ''
                
                # Menulis baris baru
                writer.writerow([created_val, entry_val, temp_val, turb_val, ph_val])
                row_count += 1
                
        print(f"Berhasil membersihkan {filename}. Tersimpan di: datasets/cleaned/{filename} ({row_count} baris)")

    except Exception as e:
        print(f"Terjadi kesalahan saat memproses {filename}: {e}")

print("\n--- Proses pembersihan selesai ---")
