import { ref, inject } from 'vue'
import { useRouter } from "vue-router";
import axios from 'axios'

export default function usePosts() {
    const posts = ref({})
    const router = useRouter();
    const validationErrors = ref({});
    const isLoading = ref(false)
    const post = ref({})
    const swal = inject('$swal')

    /**
     *
     * @param page
     * @param search_category
     * @param search_id
     * @param search_title
     * @param search_content
     * @param search_global
     * @param order_column
     * @param order_direction
     * @returns {Promise<void>}
     */
    const getPosts = async (
        page = 1,
        search_category = '',
        search_id = '',
        search_title = '',
        search_content = '',
        search_global = '',
        order_column = 'created_at',
        order_direction = 'desc'
    ) => {
        axios.get('http://crud-vue3.test/api/posts?page=' + page +
            '&search_category=' + search_category +
            '&search_id=' + search_id +
            '&search_title=' + search_title +
            '&search_content=' + search_content +
            '&search_global=' + search_global +
            '&order_column=' + order_column +
            '&order_direction=' + order_direction)
            .then(response => {
                posts.value = response.data;
            })
    }

    /**
     *
     * @param post
     * @returns {Promise<void>}
     */
    const storePosts = async (post) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        let serializedPost = new FormData()

        for (let item in post) {
            if (post.hasOwnProperty(item)) {
                serializedPost.append(item, post[item])
            }
        }

        axios.post('http://crud-vue3.test/api/posts', serializedPost)
            .then(response => {
                router.push({ name: 'posts.index' })
                swal({
                    icon: 'success',
                    title: 'Post saved successfully'
                })
            })
            .catch(error => {
                if (error.response?.data){
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    const getPost = async (id) => {
        axios.get('http://crud-vue3.test/api/posts/' + id)
            .then(response => {
                post.value = response.data.data;
            })
    }

    /**
     *
     * @param post
     * @returns {Promise<void>}
     */
    const updatePost = async (post) => {
        if (isLoading.value) return;

        isLoading.value = true
        validationErrors.value = {}

        axios.put('http://crud-vue3.test/api/posts/' + post.id, post)
            .then(response => {
                router.push({ name: 'posts.index' })
                swal({
                    icon: 'success',
                    title: 'Post updated successfully'
                })
            })
            .catch(error => {
                if (error.response?.data) {
                    validationErrors.value = error.response.data.errors
                }
            })
            .finally(() => isLoading.value = false)
    }

    /**
     *
     * @param id
     * @returns {Promise<void>}
     */
    const deletePost = async (id) => {
        swal({
            title: 'Are you sure?',
            text: 'You won\'t be able to revert this action!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: '#ef4444',
            timer: 20000,
            timerProgressBar: true,
            reverseButtons: true
        })
            .then(result => {
                if (result.isConfirmed) {
                    axios.delete('http://crud-vue3.test/api/posts/' + id)
                        .then(response => {
                            getPosts()
                            router.push({name: 'posts.index'})
                            swal({
                                icon: 'success',
                                title: 'Post deleted successfully'
                            })
                        })
                        .catch(error => {
                            swal({
                                icon: 'error',
                                title: 'Something went wrong'
                            })
                        })
                }
            })

    }



    return {
        posts,
        getPosts,
        storePosts,
        validationErrors,
        isLoading,
        post,
        getPost,
        updatePost,
        deletePost
    }
}
