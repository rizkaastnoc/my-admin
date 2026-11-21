import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || { left: 0, top: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'Ecommerce',
            component: () => import('../views/Ecommerce.vue'),
            meta: {
                title: 'eCommerce Dashboard',
            },
        },
        {
            path: '/FPD',
            name: 'FPD',
            component: () => import('../views/formPengajuan/FormPengajuanDanaPage.vue'),
            meta: {
                title: 'Pengajuan Dana',
            },
        },
        {
            path: '/FPP',
            name: 'FPP',
            component: () => import('../views/formPengajuan/FormPengajuanPembelianPage.vue'),
            meta: {
                title: 'Pengajuan Pembelian',
            },
        },
        {
            path: '/FPK',
            name: 'FPK',
            component: () => import('../views/formPengajuan/FormPengajuanKasbonPage.vue'),
            meta: {
                title: 'Pengajuan Kasbon',
            },
        },
        {
            path: '/FLD',
            name: 'FLD',
            component: () => import('../views/formPelaporan/formPelaporanDanaPage.vue'),
            meta: {
                title: 'Pelaporan Dana',
            },
        },
        {
            path: '/FLP',
            name: 'FLP',
            component: () => import('../views/formPelaporan/formPelaporanPembelianPage.vue'),
            meta: {
                title: 'Pelaporan Pembelian',
            },
        },
        {
            path: '/FLPK',
            name: 'FLPK',
            component: () => import('../views/formPelaporan/formPelaporanPenerimaanKasbon.vue'),
            meta: {
                title: 'Pelaporan Penerimaan Kasbon',
            },
        },
        {
            path: '/signin',
            name: 'Signin',
            component: () => import('../views/Auth/Signin.vue'),
            meta: {
                title: 'Signin',
            },
        },
        {
            path: '/signup',
            name: 'Signup',
            component: () => import('../views/Auth/Signup.vue'),
            meta: {
                title: 'Signup',
            },
        },
    ],
})

export default router

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} | TailAdmin - Vue.js Tailwind CSS Dashboard Template`
    next()
})
