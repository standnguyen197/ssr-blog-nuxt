<template >
 <div>
      <NavbarDash/>
      <b-container>
    <b-row class="mt-5">
      <div><center>
          <nuxt-link to="/dash/posts/createPost" class="btn btn-md bg-darklost mb-3" style="color:#FFF" >TẠO BÀI VIẾT</nuxt-link>
        </center></div>
  <b-table bordered striped hover :items="items" :fields="fields"></b-table>

    </b-row>
        </b-container>
 </div>
</template>
<script>
import NavbarDash from '~/components/admin/navbardash.vue'

export default {
  components: {
    NavbarDash
  },
    fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/auth/login')
    }
  },
data () {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'name_post',
          label: 'Tên bài viết',
          sortable: false
        },
        {
          key: 'time_post',
          label: 'Thời gian viết',
          sortable: true
        },
        {
          key: 'view_post',
          label: 'Lượt xem',
          sortable: true,
        }
      ],
      items: [
        { isActive: true, view_post: 40, time_post: 'Dickerson', name_post: 'Macdonald' },
        { isActive: false, view_post: 21, time_post: 'Larsen', name_post: 'Shaw' },
        { isActive: false, view_post: 89, time_post: 'Geneva', name_post: 'Wilson' },
        { isActive: true, view_post: 38, time_post: 'Jami', name_post: 'Carney' }
      ]
    }
  },
  methods: {
      async logout() {
      try {
        await this.$store.dispatch('logout')
     
      } catch (e) {
        this.formError = e.messview_post
      }
    }
  }
}
</script>
