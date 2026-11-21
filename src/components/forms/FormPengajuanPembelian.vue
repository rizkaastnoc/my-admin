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
                <h6 class="text-sm font-semibold text-brand-600 dark:text-brand-400">
                    Detail Data Permohonan
                </h6>
                <div class="overflow-x-auto mt-3">
                    <table class="min-w-full divide-y bg-gray-200 dark:bg-gray-900 text-sm">
                        <thead class="bg-gray-50 dark:bg-gray-800/40">
                            <tr>
                                <th class="px-4 py-2 text-left font-semibold">No</th>
                                <th class="px-4 py-2 text-left font-semibold">Items</th>
                                <th class="px-4 py-2 text-left font-semibold">Deadline</th>
                                <th class="px-4 py-2 text-left font-semibold">Jenis</th>
                                <th class="px-4 py-2 text-left font-semibold">Alasan Pembelian</th>
                                <th class="px-4 py-2 text-left font-semibold">Jumlah</th>
                                <th class="px-4 py-2 text-left font-semibold">Estimasi Harga</th>
                                <th class="px-4 py-2 text-left font-semibold">Total Harga</th>
                                <th class="px-4 py-2 text-left font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 dark:bg-gray-700">
                            <tr v-if="form.items.length === 0">
                                <td colspan="9" class="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                                    Belum ada data
                                </td>
                            </tr>
                            <tr v-for="(item, index) in form.items" :key="index"
                                class="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                                <td class="px-4 py-2">{{ index + 1 }}</td>
                                <td class="px-4 py-2">{{ item.nama }}</td>
                                <td class="px-4 py-2">{{ item.deadline }}</td>
                                <td class="px-4 py-2">{{ item.jenis }}</td>
                                <td class="px-4 py-2">{{ item.keterangan }}</td>
                                <td class="px-4 py-2">{{ item.satuan }}</td>
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
                        </tbody>
                    </table>
                </div>
                <div class="text-right font-semibold text-gray-700 dark:text-gray-200 mt-3">
                    Total: {{ formatRupiah(totalHarga) }}
                </div>
                <button
                    class="mt-3 inline-flex items-center rounded-md bg-brand-600 px-3 py-2 text-sm font-medium text-white hover:bg-brand-700"
                    @click="tambahBaru">
                    <i class="bi bi-plus-circle mr-2"></i> Tambah Data Permohonan
                </button>
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
                            <strong class="block text-sm text-gray-700 dark:text-gray-200">{{ app.jabatan }}</strong>
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
import { reactive, ref, computed, onMounted } from "vue"
import ModalAddItem from "@/components/modals/ModalPengajuanPembelian.vue"
import '@vuepic/vue-datepicker/dist/main.css'

const form = reactive({
    nomor: "",
    tanggal: "",
    lampiran: "",
    perihal: "",
    note: "",
    items: [],
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

function editItem(index) {
    editMode.value = true
    editIndex = index
    selectedItem.value = { ...form.items[index] }
    showModal.value = true
}

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

const totalHarga = computed(() =>
    form.items.reduce((sum, item) => sum + item.total, 0)
)

const formatRupiah = (val) =>
    new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
    }).format(val)

function batal() {
    console.log('Batal - Reset form atau close card')
}

function simpan() {
    console.log('Simpan - Submit form:', form)
}
</script>