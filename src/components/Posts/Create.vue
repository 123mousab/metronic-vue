<template>
  <div>
    <form @submit.prevent="storePosts(post)" data-kt-search-element="form" class="w-100 position-relative mb-3" autocomplete="off">
      <div class="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
        <!--begin::General options-->
        <div class="card card-flush py-4">
          <!--begin::Card header-->
          <div class="card-header">
            <div class="card-title">
              <h2>General</h2>
            </div>
          </div>
          <!--end::Card header-->
          <!--begin::Card body-->
          <div class="card-body pt-0">
            <!--begin::Input group-->
            <div class="mb-10 fv-row fv-plugins-icon-container">
              <!--begin::Label-->
              <label class="required form-label">Title</label>
              <!--end::Label-->
              <!--begin::Input-->
              <input type="text" v-model="post.title" class="form-control mb-2" placeholder="Title">
              <div class="fv-plugins-message-container invalid-feedback">
                <div  data-field="email" data-validator="notEmpty" v-for="message in validationErrors?.title">
                  {{ message }}
                </div>
              </div>
              <!--end::Input-->
              <div class="fv-plugins-message-container invalid-feedback"></div>
            </div>
            <!--end::Input group-->

            <!--begin::Input group-->
            <div class="mb-10 fv-row fv-plugins-icon-container">
              <!--begin::Label-->
              <label class="required form-label">Content</label>
              <!--end::Label-->
              <!--begin::Input-->
              <textarea type="text" v-model="post.content" class="form-control mb-2" placeholder="Content"></textarea>
              <div class="fv-plugins-message-container invalid-feedback">
                <div  data-field="email" data-validator="notEmpty" v-for="message in validationErrors?.content">
                  {{ message }}
                </div>
              </div>
              <!--end::Input-->
              <div class="fv-plugins-message-container invalid-feedback"></div>
            </div>
            <!--end::Input group-->


            <!--begin::Input group-->
            <div class="mb-10 fv-row fv-plugins-icon-container">
              <!--begin::Label-->
              <label class="fs-6 fw-bold form-label mt-3">
                <span class="required">Category</span>
              </label>
              <!--end::Label-->
                <div class="form-floating border rounded">
                  <!--begin::Select2-->
                  <select id="kt_ecommerce_select2_country" v-model="post.category_id"  class="form-select form-select-solid " name="country">
                    <option value="" selected>-- Choose category --</option>
                    <option v-for="category in categories" :value="category.id">
                      {{ category.name }}
                    </option>
                  </select>
                  <div class="fv-plugins-message-container invalid-feedback">
                    <div  data-field="email" data-validator="notEmpty" v-for="message in validationErrors?.category_id">
                      {{ message }}
                    </div>
                  </div>
                  <!--end::Select2-->
                </div>
              <div class="fv-plugins-message-container invalid-feedback"></div></div>
            <!--end::Input group-->


          </div>
          <!--end::Card header-->
        </div>
        <!--end::General options-->
        <div class="d-flex justify-content-end">
          <!--begin::Button-->
          <router-link to="/posts/index">
            <a href="" id="kt_ecommerce_add_product_cancel" class="btn btn-light me-5">Cancel</a>
          </router-link>
          <!--end::Button-->
          <!--begin::Button-->
          <button type="submit" id="kt_ecommerce_add_category_submit" class="btn btn-primary">
            <span class="indicator-label">Save Changes</span>
            <span class="indicator-progress">Please wait...
												<span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
          </button>
          <!--end::Button-->
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {onMounted} from "vue";
import useCategories from "../../composables/categories";
import usePosts from "../../composables/posts";

export default {
  setup() {
    const post = {
      title: '',
      content: '',
      category_id: '',
      attachment: '',
    }

    const {categories, getCategories} = useCategories()
    const {storePosts, validationErrors, isLoading} = usePosts()

    onMounted(() => {
      getCategories()
    })
    return {categories, post, storePosts, validationErrors, isLoading}
  },
  methods: {
    test() {
      console.log('Submitted')
    }
  },
  computed: {
    currentPageTitle() {
      return this.$route.meta.title;
    }
  }
}
</script>

<style scoped>

</style>