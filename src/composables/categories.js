import { ref } from 'vue'
import axios from 'axios'

export default function useCategories() {
    const categories = ref({})

    const getCategories = async () => {
        axios.get('http://crud-vue3.test/api/categories')
            .then(response => {
                categories.value = response.data.data;
            })
    }

    return { categories, getCategories }
}
