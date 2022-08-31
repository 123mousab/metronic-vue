import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSweetalert2 from "vue-sweetalert2";
import LaravelVuePagination from 'laravel-vue-pagination';

const app = createApp(App)

app.use(router)
app.use(store)
app.use(VueSweetalert2)
app.component('Pagination', LaravelVuePagination)
app.mount('#app')


