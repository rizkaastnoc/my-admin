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
                        {{ isEdit ? "Edit Data Pelaporan" : "Tambah Data Pelaporan" }}
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
                                    Dana Awal
                                </label>
                                <input type="number" v-model.number="localForm.danaAwal" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dana Digunakan
                                </label>
                                <input type="number" v-model.number="localForm.danaDigunakan" class="w-full h-[42px] border border-gray-300 dark:border-gray-600 rounded-md
                                    px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                    focus:shadow-lg focus:shadow-blue-500/30 transition-all duration-200" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Reimburse
                                </label>
                                <input type="number" :value="reimburseAuto" readonly class="w-full h-[42px] rounded-md border border-gray-300 dark:border-gray-600
                                bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200
                                px-3 py-2 cursor-not-allowed" />
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Dana Dikembalikan
                                </label>
                                <input type="number" :value="danaDikembalikanAuto" readonly class="w-full h-[42px] rounded-md border border-gray-300 dark:border-gray-600
                                    bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200
                                    px-3 py-2 cursor-not-allowed" />
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
export default {
    props: {
        show: Boolean,
        isEdit: { type: Boolean, default: false },
        dataEdit: { type: Object, default: null },
    },
    emits: ["close", "save", "update"],
    data() {
        return {
            localForm: {
                nama: "",
                keterangan: "",
                danaAwal: 0,
                danaDigunakan: 0,
                reimburse: 0,
                danaDikembalikan: 0,
            },
        };
    },
    computed: {
        danaDikembalikanAuto() {
            const awal = Number(this.localForm.danaAwal) || 0;
            const digunakan = Number(this.localForm.danaDigunakan) || 0;
            return awal > digunakan ? awal - digunakan : 0;
        },
        reimburseAuto() {
            const awal = Number(this.localForm.danaAwal) || 0;
            const digunakan = Number(this.localForm.danaDigunakan) || 0;
            return digunakan > awal ? digunakan - awal : 0;
        },
        isDarkMode() {
            return document.documentElement.classList.contains('dark');
        },
    },
    watch: {
        show(newVal) {
            document.body.classList.toggle("overflow-hidden", newVal);
        },
        dataEdit: {
            immediate: true,
            handler(newVal) {
                if (this.isEdit && newVal) {
                    this.localForm = { ...newVal };
                } else {
                    this.localForm = {
                        nama: "",
                        keterangan: "",
                        danaAwal: 0,
                        danaDigunakan: 0,
                        reimburse: 0,
                        danaDikembalikan: 0,
                    };
                }
            },
        },
    },
    methods: {
        formatRupiah(angka) {
            if (angka === null || angka === undefined || angka === "") return "-"
            return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
            }).format(angka)
        },
        simpan() {
            const payload = {
                ...this.localForm,
                reimburse: this.reimburseAuto,
                danaDikembalikan: this.danaDikembalikanAuto,
            };
            if (this.isEdit) {
                this.$emit("update", payload);
            } else {
                this.$emit("save", payload);
            }
            this.localForm = {
                nama: "",
                keterangan: "",
                danaAwal: 0,
                danaDigunakan: 0,
                reimburse: 0,
                danaDikembalikan: 0,
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
