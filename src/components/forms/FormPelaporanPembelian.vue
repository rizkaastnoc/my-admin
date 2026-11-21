<template>
    <!-- Card -->
    <div class="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <div class="p-6 space-y-6">
            <!-- Form Atas -->
            <div class="space-y-6">

                <!-- Baris 1: Nomor & Tanggal -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Nomor
                        </label>
                        <input type="text" v-model="form.nomor" placeholder="Masukkan nomor" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                            px-3 py-2 text-sm focus:border-brand-500 focus:ring focus:ring-brand-500
                            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Tanggal
                        </label>
                        <input type="date" v-model="form.tanggal" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                            px-3 py-2 text-sm focus:border-brand-500 focus:ring focus:ring-brand-500/50
                            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" />
                    </div>
                </div>

                <!-- Baris 2: Lampiran & Perihal -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Lampiran
                        </label>
                        <input type="text" v-model="form.lampiran" placeholder="Masukkan lampiran" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                            px-3 py-2 text-sm focus:border-brand-500 focus:ring focus:ring-brand-500/50
                            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" />
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Perihal
                        </label>
                        <input type="text" v-model="form.perihal" placeholder="Masukkan perihal" class="mt-1 block w-full rounded-md border border-gray-300 shadow-sm
                            px-3 py-2 text-sm focus:border-brand-500 focus:ring focus:ring-brand-500/50
                            dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200" />
                    </div>
                </div>
            </div>

            <!-- Tabel -->
            <div>
                <h6 class="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-6">
                    Detail Data Pelaporan
                </h6>
                <div class="overflow-x-auto mt-3">
                    <table class="min-w-full divide-y bg-gray-200 dark:bg-gray-900 text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-800/40">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">No</th>
                                <th class="px-4 py-2 text-left font-semibold">Items</th>
                                <th class="px-4 py-2 text-left font-semibold">Merk</th>
                                <th class="px-4 py-2 text-left font-semibold">Vendor</th>
                                <th class="px-4 py-2 text-left font-semibold">Tanggal Pembelian</th>
                                <th class="px-4 py-2 text-left font-semibold">Penempatan</th>
                                <th class="px-4 py-2 text-left font-semibold">Jumlah</th>
                                <th class="px-4 py-2 text-left font-semibold">UoM</th>
                                <th class="px-4 py-2 text-left font-semibold">Harga Satuan</th>
                                <th class="px-4 py-2 text-left font-semibold">Total Harga</th>
                                <th class="px-4 py-2 text-left font-semibold">Action</th>
                            </tr>
                        </thead>

                        <tbody class="divide-y divide-gray-200 dark:bg-gray-700">
                            <tr v-if="form.items.length === 0">
                                <td colspan="11" class="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                    Belum ada data
                                </td>
                            </tr>

                            <tr v-for="(item, index) in form.items" :key="index"
                                class="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ item.nama }}</td>
                                <td class="px-4 py-2">{{ item.merk }}</td>
                                <td class="px-4 py-2">{{ item.vendor }}</td>
                                <td class="px-4 py-2">{{ item.tanggalPembelian }}</td>
                                <td class="px-4 py-2">{{ item.penempatan }}</td>
                                <td class="px-4 py-2">{{ item.jumlah }}</td>
                                <td class="px-4 py-2">{{ item.uom }}</td>
                                <td class="px-4 py-2">{{ formatRupiah(item.harga) }}</td>
                                <td class="px-4 py-2">{{ formatRupiah(item.total) }}</td>
                                <td class="px-4 py-2">
                                    <button
                                        class="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-xs font-medium text-white hover:bg-yellow-600"
                                        @click="editItem(index)">
                                        <i class="bi bi-pencil-square mr-1"></i> Edit
                                    </button>
                                </td>
                            </tr>

                            <!-- Baris total -->
                            <tr class="bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100">
                                <td colspan="9" class="px-4 py-2 text-right">Total Pembelian</td>
                                <td class="px-4 py-2">{{ formatRupiah(totalPembelian) }}</td>
                                <td colspan="2"></td>
                            </tr>

                            <!-- Dana Diterima -->
                            <tr class="bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100">
                                <td colspan="9" class="px-4 py-2 text-right">Dana Diterima</td>
                                <td class="px-4 py-2">{{ formatRupiah(danaDiterima) }}</td>
                                <td colspan="2"></td>
                            </tr>

                            <!-- Sisa Dana -->
                            <tr class="bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100">
                                <td colspan="9" class="px-4 py-2 text-right">Sisa Dana</td>
                                <td class="px-4 py-2">{{ formatRupiah(sisaDana) }}</td>
                                <td colspan="2"></td>
                            </tr>

                            <!-- Total Reimburse -->
                            <tr class="bg-gray-100 dark:bg-gray-800 font-semibold text-gray-900 dark:text-gray-100">
                                <td colspan="9" class="px-4 py-2 text-right">Total Reimburse</td>
                                <td class="px-4 py-2">{{ formatRupiah(totalReimburse) }}</td>
                                <td colspan="2"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <button
                    class="mt-3 inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
                    @click="tambahBaru">
                    <i class="bi bi-plus-circle mr-2"></i> Tambah Data Pelaporan
                </button>
            </div>

            <div>
                <!-- Input Upload -->
                <label for="foto" class="block text-sm font-semibold text-gray-700 mb-2">
                    Upload file
                </label>

                <input id="foto" type="file" accept="image/png, image/jpeg, image/jpg" multiple
                    @change="handleFileUpload" class="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             file:mr-4 file:py-2 file:px-4 file:rounded-l-md file:border-0
             file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700
             hover:file:bg-gray-200" />

                <p class="mt-1 text-sm text-gray-500">
                    PNG, JPG, atau JPEG (max 5MB, maksimal 3 foto)
                </p>

                <!-- Preview Foto -->
                <div v-if="form.fotos.length" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-4 mt-4">
                    <div v-for="(foto, i) in form.fotos" :key="i"
                        class="relative group border rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                        <img :src="foto" alt="Preview"
                            class="w-full max-h-80 object-contain bg-gray-100 transition-transform duration-300 group-hover:scale-105" />

                        <!-- Tombol close -->
                        <button type="button" @click="hapusFoto(i)" class="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1.5
                            flex items-center justify-center shadow-md opacity-100 group-hover:scale-110 transition">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                            class="w-4 h-4">
                                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 
                            1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 
                            1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 
                            10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <!-- Note -->
            <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">NOTE :</label>
                <textarea v-model="form.note" class="mt-1 block w-full rounded-md border-blue-500 shadow-sm
                    focus:border-brand-500 focus:ring focus:ring-brand-500/50 sm:text-sm
                    dark:border-gray-600  dark:bg-gray-800 dark:text-gray-200">
                </textarea>
            </div>

            <!-- Approval Section -->
            <div>
                <h6 class="text-sm font-semibold text-gray-800 dark:text-gray-100">Approval</h6>
                <div class="grid grid-cols-1 md:grid-cols-3 text-center mt-3 gap-4">
                    <div v-for="(app, i) in form.approvals" :key="i">
                        <span :class="app.status === 'Pending' ? 'text-gray-400' : 'text-green-500'" class="text-lg">
                            <i :class="app.status === 'Pending' ? 'bi bi-circle' : 'bi bi-check-circle-fill'"></i>
                        </span>
                        <div class="mt-1">
                            <strong class="block text-sm text-gray-700 dark:text-gray-200">{{ app.jabatan
                                }}</strong>
                            <small class="block text-gray-500 dark:text-gray-400">{{ app.nama }}</small>
                            <small v-if="app.tanggal" class="block text-gray-400">{{ app.tanggal }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button class="px-4 py-2 rounded-lg border border-gray-300 bg-gray-300 text-gray-700 hover:bg-gray-200
                     dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600" @click="batal">
                    Batal
                </button>
                <button class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700" @click="simpan">
                    Simpan
                </button>
            </div>
        </div>
    </div>

    <!-- Modal Add/Edit Item -->
    <ModalAddItem v-if="showModal" :show="showModal" :is-edit="editMode" :data-edit="selectedItem" @close="closeModal"
        @save="tambahItem" @update="updateItem" />
</template>

<script setup>
import { reactive, ref, computed, onMounted, defineEmits } from "vue"
import ModalAddItem from "@/components/modals/ModalPelaporanPembelian.vue"
import '@vuepic/vue-datepicker/dist/main.css'

const emit = defineEmits(["submit-start", "submit-finish"])

const form = reactive({
    nomor: "",
    tanggal: "",
    lampiran: "",
    perihal: "",
    note: "",
    items: [],
    fotos: [],
    approvals: [
        {
            jabatan: "Diajukan Oleh",
            status: "Sudah Diajukan",
            nama: "Pemohon",
            tanggal: new Date().toLocaleDateString("id-ID"),
        },
        {
            jabatan: "Diverifikasi Oleh",
            status: "Pending",
            nama: "Finance",
        },
        {
            jabatan: "Disetujui Oleh",
            status: "Pending",
            nama: "Direktur",
        },
    ],
})

onMounted(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    form.tanggal = `${yyyy}-${mm}-${dd}`
})

const showModal = ref(false)
const editMode = ref(false)
const selectedItem = ref(null)
let editIndex = null

function tambahBaru() {
    editMode.value = false
    selectedItem.value = null
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    editMode.value = false
    selectedItem.value = null
    editIndex = null
}

function tambahItem(item) {
    form.items.push({
        ...item,
        total: item.satuan * item.harga,
    })
    closeModal()
}

// Klik tombol edit
function editItem(index) {
    editMode.value = true
    editIndex = index
    selectedItem.value = { ...form.items[index] }
    showModal.value = true
}

// Update data hasil edit
function updateItem(item) {
    if (editIndex !== null) {
        form.items[editIndex] = {
            ...item,
            total: item.satuan * item.harga,
        }
        editIndex = null
    }
    closeModal()
}

const totalPembelian = computed(() =>
    form.items.reduce((sum, i) => sum + (i.total || 0), 0)
)

const danaDiterima = computed(() => totalPembelian.value)
const sisaDana = computed(() => danaDiterima.value - totalPembelian.value)

const totalReimburse = computed(() =>
    form.items.reduce((sum, item) => sum + (item.reimburse || 0), 0)
)

const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(val)


function handleFileUpload(event) {
    const files = event.target.files;
    const maxFiles = 3;

    for (let i = 0; i < files.length && form.fotos.length < maxFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
            form.fotos.push(e.target.result);
        };
        reader.readAsDataURL(files[i]);
    }

    // reset input agar bisa pilih file yang sama lagi kalau mau
    event.target.value = "";
}

function hapusFoto(index) {
    form.fotos.splice(index, 1)
}

function batal() {
    console.log('Batal - Reset form atau close card')
}

async function simpan() {
    emit("submit-start") //

    // simulasi proses (misal API request)
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log('Simpan - Submit form:', form)
    emit("submit-finish")
}

</script>
