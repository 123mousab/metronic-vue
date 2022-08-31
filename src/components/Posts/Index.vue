<template>
  <div>
    <!--begin::Table-->
    <div class="card card-flush mt-6 mt-xl-9">
      <!--begin::Card header-->
      <div class="card-header mt-5">
        <!--begin::Card title-->
        <div class="card-title flex-column">
          <h3 class="fw-bolder mb-1">Posts</h3>
        </div>
        <!--begin::Card title-->
        <!--begin::Card toolbar-->
        <div class="card-toolbar my-1">
          <!--begin::Select-->
          <div class="me-6 my-1">
            <input v-model="search_global" type="text" placeholder="Search..." class="form-control form-control-solid w-250px ps-14">
          </div>
          <!--end::Select-->
        </div>
        <!--begin::Card toolbar-->
      </div>
      <!--end::Card header-->
      <!--begin::Card body-->
      <div class="card-body pt-0">
        <!--begin::Table container-->
        <div class="table-responsive">
          <!--begin::Table-->
          <table id="kt_profile_overview_table"
                 class="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder">
            <!--begin::Head-->
            <thead class="fs-7 text-gray-400 text-uppercase">
            <tr>
              <th class="min-w-90px">
                <input v-model="search_id" type="text" class="form-control form-control-solid" placeholder="Filter by ID">
              </th>
              <th class="min-w-90px">
                <input v-model="search_title" type="text" class="form-control form-control-solid" placeholder="Filter by Title">
              </th>
              <th class="min-w-90px">
                <input v-model="search_content" type="text" class="form-control form-control-solid w-250px ps-14" placeholder="Filter by Content">
              </th>
              <th class="min-w-90px">
                <select v-model="search_category" class="form-control form-control-solid">
                  <option value="" selected>-- all categories --</option>
                  <option v-for="category in categories" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </th>
            </tr>
            <tr>
              <th class="min-w-250px cursor-pointer" @click="updateOrdering('id')">
                Id
                <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'id',
                                }">&uarr;</span>
                  <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'id',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'id',
                                }">&darr;</span>
                </div>
              </th>
              <th class="min-w-150px cursor-pointer" @click="updateOrdering('title')">
                Title
                <div class="select-none">
                                <span :class="{
                                  'text-blue-600': orderDirection === 'asc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'asc' && orderColumn === 'title',
                                }">&uarr;</span>
                  <span :class="{
                                  'text-blue-600': orderDirection === 'desc' && orderColumn === 'title',
                                  'hidden': orderDirection !== '' && orderDirection !== 'desc' && orderColumn === 'title',
                                }">&darr;</span>
                </div>
              </th>
              <th class="min-w-90px">Content</th>
              <th class="min-w-90px">Category</th>
              <th class="min-w-50px text-end">Actions</th>
            </tr>
            </thead>
            <!--end::Head-->
            <!--begin::Body-->
            <tbody class="fs-6">
            <tr v-for="post in posts.data">
              <td>
                {{ post.id }}
              </td>
              <td>{{ post.title }}</td>
              <td>{{ post.content }}</td>
              <td>{{ post.category }}</td>
              <td class="text-end">
                <router-link :to="{ name: 'posts.edit', params: { id: post.id } }">
                  <a href="#" class="btn btn-success btn-sm">Edit</a>
                  <a href="#" @click.prevent="deletePost(post.id)" class="btn btn-danger btn-sm" style="margin-right: 5px;margin-top: 5px">Delete</a>
                </router-link>
              </td>
            </tr>
            </tbody>
            <!--end::Body-->
          </table>
          <!--end::Table-->
          <Pagination :data="posts" @pagination-change-page="page => getPosts(page, selectedCategory)" />
        </div>
        <!--end::Table container-->
      </div>
      <!--end::Card body-->
    </div>
  </div>

</template>

<script>
import {ref, onMounted, watch} from "vue";
import usePosts from "../../composables/posts";
import useCategories from "../../composables/categories";

export default {
  setup() {
    const search_category = ref('')
    const search_id = ref('')
    const search_title = ref('')
    const search_content = ref('')
    const search_global = ref('')
    const orderColumn = ref('created_at')
    const orderDirection = ref('desc')
    const {posts, getPosts, deletePost} = usePosts()
    const {categories, getCategories} = useCategories()

    onMounted(() => {
      getPosts()
      getCategories()
    })

    const updateOrdering = (column) => {
      orderColumn.value = column;
      orderDirection.value = (orderDirection.value === 'asc') ? 'desc' : 'asc';
      getPosts(
          1,
          search_category.value,
          search_id.value,
          search_title.value,
          search_content.value,
          search_global.value,
          orderColumn.value,
          orderDirection.value
      );
    }

    watch(search_category, (current, previous) => {
      getPosts(
          1,
          current,
          search_id.value,
          search_title.value,
          search_content.value,
          search_global.value
      )
    })
    watch(search_id, (current, previous) => {
      getPosts(
          1,
          search_category.value,
          current,
          search_title.value,
          search_content.value,
          search_global.value
      )
    })
    watch(search_title, (current, previous) => {
      getPosts(
          1,
          search_category.value,
          search_id.value,
          current,
          search_content.value,
          search_global.value
      )
    })
    watch(search_content, (current, previous) => {
      getPosts(
          1,
          search_category.value,
          search_id.value,
          search_title.value,
          current,
          search_global.value
      )
    })
    watch(search_global, (current, previous) => {
      getPosts(
          1,
          search_category.value,
          search_id.value,
          search_title.value,
          search_content.value,
          current
      )
    })

    return {
      posts,
      getPosts,
      categories,
      search_category,
      search_id,
      search_title,
      search_content,
      search_global,
      orderColumn,
      orderDirection,
      updateOrdering,
      deletePost
    }
  }
}
</script>

<style scoped>

</style>