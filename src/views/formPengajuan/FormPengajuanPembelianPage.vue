<template>
    <AdminLayout>
        <!-- breadcrumb -->
        <PageBreadcrumb :pageTitle="currentPageTitle" />

        <!-- konten -->
        <div class="space-y-5 sm:space-y-6">
            <ComponentCard title="Form Pengajuan">
                <FormPengajuanPembelian />
            </ComponentCard>
        </div>
    </AdminLayout>
</template>

<script setup>
import { ref } from "vue"
import AdminLayout from "@/components/layout/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import FormPengajuanPembelian from "@/components/forms/FormPengajuanPembelian.vue"

const currentPageTitle = ref("Form Pengajuan Pembelian")
</script>
