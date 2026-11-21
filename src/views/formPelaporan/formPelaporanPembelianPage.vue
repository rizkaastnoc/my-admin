<template>
  <AdminLayout>
    <!-- breadcrumb -->
    <PageBreadcrumb :pageTitle="currentPageTitle" />

    <!-- loading spinner -->
    <LoadingSpinner :visible="isLoading" />

    <!-- konten -->
    <div class="space-y-5 sm:space-y-6">
      <ComponentCard title="Form Pelaporan">
        <FormPelaporanPembelian @submit-start="startLoading" @submit-finish="stopLoading" />
      </ComponentCard>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref } from "vue"
import AdminLayout from "@/components/layout/AdminLayout.vue"
import PageBreadcrumb from "@/components/common/PageBreadcrumb.vue"
import ComponentCard from "@/components/common/ComponentCard.vue"
import FormPelaporanPembelian from "@/components/forms/FormPelaporanPembelian.vue"
import LoadingSpinner from "@/components/common/LoadingSpinner.vue"

const currentPageTitle = ref("Form Pelaporan Pembelian")
const isLoading = ref(false)

function startLoading() {
  isLoading.value = true
}
function stopLoading() {
  isLoading.value = false
}
</script>
