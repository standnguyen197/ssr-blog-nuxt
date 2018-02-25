<template >
 <div>
      <NavbarDash/>
      <b-container>
    <b-row class="mt-5">
       <b-col  sm="12" md="8" offset-md="2">
          <center><h1>ĐĂNG BÀI VIẾT</h1></center>
          <b-alert v-if="!imes == ''" show variant="info">{{ imes }}</b-alert>
       <b-form @submit.prevent="createPost" class="mt-2">
      <b-form-group
                    label="Tiêu đề bài"
                 >
        <b-form-input size="lg"
                      type="text"
                      v-model="form.title"
                      required
                      placeholder="Xin nhập tiêu đề bài viết">
        </b-form-input>
      </b-form-group>
      <b-form-group id="exampleInputGroup2"
                    label="Mô tả :"
                    >
        <b-form-input size="lg"
                      id="exampleInput2"
                      type="text"
                      required
                      v-model="form.description"
                      placeholder="Xin nhập mô tả">
        </b-form-input>
      </b-form-group>
  <b-form-group label="Từ khóa :"
                    >
        <b-form-input size="lg"
                      type="text"
                      required
                      v-model="form.keyword"
                      placeholder="Từ khóa">
        </b-form-input>
      </b-form-group>     
      <b-form-group label="Danh mục:">
        <b-form-select size="lg" :options="categories"
                      v-model="form.category"
                      >
        </b-form-select>
      </b-form-group>
      <b-form-group label="Ảnh đại diện :"
                    >
        <b-form-input size="lg"
                      type="text"
                      required
                      v-model="form.file"
                      placeholder="Link ảnh đại diện">
        </b-form-input>
      </b-form-group>     
      
       <b-form-group label="Nội dung">
       <div class="quill-editor" 
      :content="content"
         @change="onEditorChange($event)"
         @blur="onEditorBlur($event)"
         @focus="onEditorFocus($event)"
         @ready="onEditorReady($event)"
         v-quill:myQuillEditor="editorOption">
    </div>
     </b-form-group>
      <center>
      <b-button type="submit" class="bg-darklost mb-5">ĐĂNG BÀI</b-button>
      </center>
    </b-form>
</b-col>
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

  head: {
    title: 'Tạo bài viết - Page',
  },
    fetch ({ store, redirect }) {
    if (!store.state.authUser) {
      return redirect('/auth/login')
    }
  },
data () {
    return {
      form: {
        title:'',
        description:'',
        keyword:'',
        category: null,
        file: null,
       
      },
      imes: '',
      categories: [ { text: 'Chọn danh mục', value: null },'Insurance', 'Loans', 'Mortgage', 'Transfer'],
      content: '',
      editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
               [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['blockquote', 'code-block','image' , 'link']
            ]
          }
        },
    
    }
  },
  methods: {
       onEditorBlur(editor) {
       
      },
      onEditorFocus(editor) {
       
      },
      onEditorReady(editor) {
        
      },
      onEditorChange({ editor, html, text }) {
        
        this.content = html
      },
    async createPost() {
      try {
        await this.$store.dispatch('createPost', {
          title: this.form.title,
          description: this.form.description,
          keyword: this.form.keyword,
          category: this.form.category,
          content: this.content,
          cover: this.form.file
        })
        this.form.title = ''
        this.form.description = ''
        this.form.keyword = ''
        this.imes = this.$store.state.mPost.imes
        this.form.category = 'Chọn danh mục'
        this.content = this.$store.state.mPost.content
       
        console.log(this.$store.state.mPost)

        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },

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
<style>

.quill-editor {
      min-height: 400px;
      max-height: 400px;
      overflow-y: auto;
    }
</style>
