<template>
    <Teleport to="body">
        <div v-if="show"
            class="fixed inset-0 bg-black/50 z-[100000] flex items-center justify-center p-4 overflow-y-auto"
            @click.self="$emit('close')">
            <div
                class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">

                <!-- Header -->
                <div class="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-600">
                    <h5 class="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        {{ isEdit ? "Edit Data Permohonan" : "Tambah Data Permohonan" }}
                    </h5>
                    <button type="button"
                        class="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        @click="$emit('close')" aria-label="Close">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Body -->
                <div class="p-6">
                    <form class="space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Items
                                </label>
                                <input type="text" v-model="localForm.nama" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200" />
                            </div>

                            <!-- Deadline -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Deadline
                                </label>
                                <Datepicker v-model="localForm.deadline" :format="formatDate" :dark="isDarkMode"
                                    :input-class="[
                                        'w-full h-[42px] px-3 py-2 rounded-md transition-all duration-200',
                                        'border border-gray-300 dark:border-gray-600',
                                        'bg-white dark:bg-gray-800',
                                        'text-gray-900 dark:text-gray-100',
                                        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:shadow-lg focus:shadow-blue-500/30',
                                        '!appearance-none'
                                    ].join(' ')" :wrapper-class="'w-full'" :clearable="false" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Jenis
                                </label>
                                <select v-model="localForm.jenis" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200">
                                     <option value="aset">Aset</option>
                                    <option value="persediaan">Persediaan</option>
                                    <option value="perlengkapan">Perlengkapan</option>
                                    <option value="tools">Tools</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Keterangan
                                </label>
                                <textarea v-model="localForm.keterangan" class="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2
                                    bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200 min-h-[80px]">
                                </textarea>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Satuan
                                </label>
                                <input type="number" v-model.number="localForm.satuan" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Estimasi Harga
                                </label>
                                <input type="number" v-model.number="localForm.harga" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Metode Pembayaran
                                </label>
                                <select v-model="localForm.metodePembayaran" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200">
                                    <option value="cash">Cash</option>
                                    <option value="transfer">Transfer</option>
                                </select>
                            </div>

                            <!-- Total Harga -->
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Total Harga
                                </label>
                                <input type="text" :value="totalHarga" readonly class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-gray-100 dark:bg-gray-600 cursor-not-allowed
                                    text-gray-900 dark:text-gray-100" />
                            </div>
                        </div>
                    </form>
                </div>


                <!-- Footer -->
                <div class="flex justify-end p-6 border-t border-gray-200 dark:border-gray-600 space-x-3">
                    <button type="button"
                        class="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors"
                        @click="$emit('close')">
                        Batal
                    </button>
                    <button type="button"
                        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-gray-800 transition-colors"
                        @click="simpan">
                        {{ isEdit ? "Update" : "Simpan" }}
                    </button>
                </div>
            </div>
        </div>
    </Teleport>
</template>

<script>
import Datepicker from "@vuepic/vue-datepicker";

export default {
    components: { Datepicker },
    props: {
        show: Boolean,
        isEdit: { type: Boolean, default: false },
        dataEdit: { type: Object, default: null },
    },
    data() {
        return {
            localForm: {
                nama: "",
                deadline: null,
                jenis: "aset",
                keterangan: "",
                satuan: 1,
                harga: 0,
                metodePembayaran: "cash",
            },
        };
    },
    computed: {
        totalHarga() {
            const s = Number(this.localForm.satuan) || 0;
            const h = Number(this.localForm.harga) || 0;
            return s * h;
        },
        isDarkMode() {
            return document.documentElement.classList.contains('dark');
        },
    },
    watch: {
        show(newVal) {
            // Lock scroll body saat modal terbuka
            document.body.classList.toggle("overflow-hidden", newVal);
        },
        dataEdit: {
            immediate: true,
            handler(newVal) {
                if (this.isEdit && newVal) {
                    this.localForm = {
                        ...newVal,
                        deadline: newVal.deadline
                            ? new Date(newVal.deadline)
                            : null,
                    };
                } else {
                    this.localForm = {
                        nama: "",
                        deadline: null,
                        jenis: "aset",
                        keterangan: "",
                        satuan: 1,
                        harga: 0,
                        metodePembayaran: "cash",
                    };
                }
            },
        },
    },
    methods: {
        formatDate(date) {
            if (!date) return "";
            const yyyy = date.getFullYear();
            const mm = String(date.getMonth() + 1).padStart(2, "0");
            const dd = String(date.getDate()).padStart(2, "0");
            return `${yyyy}-${mm}-${dd}`;
        },
        simpan() {
            const payload = {
                ...this.localForm,
                deadline: this.localForm.deadline
                    ? this.localForm.deadline.toISOString().slice(0, 10)
                    : null,
            };
            if (this.isEdit) {
                this.$emit("update", payload);
            } else {
                this.$emit("save", payload);
            }
            this.localForm = {
                nama: "",
                deadline: null,
                keterangan: "",
                jenis: "aset",
                satuan: 1,
                harga: 0,
                metodePembayaran: "cash",
            };
        },
    },
};
</script>

<style scoped>
/* Pastikan backdrop selalu di atas */
body.overflow-hidden {
    overflow: hidden !important;
}

:deep(.dp__input_wrap),
:deep(.dp__input) {
    height: 42px !important;
    min-height: 42px !important;
    display: flex !important;
    align-items: center !important;
    border-radius: 0.375rem !important;
    /* sama kayak rounded-md */
}

:deep(.dp__input) {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
    font-size: 0.875rem !important;
    /* text-sm */
}
</style>
