import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import VueApexCharts from "vue3-apexcharts";
import 'jsvectormap/dist/jsvectormap.css';
import '@vuepic/vue-datepicker/dist/main.css'
import "flowbite";
import 'bootstrap-icons/font/bootstrap-icons.css'


const app = createApp(App)
app.use(router)
app.use(VueApexCharts)
app.component("apexchart", VueApexCharts)
app.mount('#app')
