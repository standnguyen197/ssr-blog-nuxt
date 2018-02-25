<template>

    <div>
      <NavbarNotAuth/>
    <b-container>
        <b-row class="mt-5">
        <b-col sm="12" md="6" offset-md="3"><center><h1>REGISTER</h1></center>
    <div v-if="this.$store.state.authUser">
        <b-alert v-if="dataCode == 1" show variant="success">{{ imes }}</b-alert>
        <b-alert v-if="dataCode == 0" show variant="warning">{{ imes }}</b-alert>
      </div>
    <b-form  @submit.prevent="register" class="mt-3">
      <b-form-group label="Email address:" >
        <b-form-input type="email"
                      v-model="formEmail"
                      required
                      placeholder="Enter email">
        </b-form-input>
      </b-form-group>
    <b-form-group label="Password :" >
        <b-form-input  type="password"
                      v-model="formPassword"
                      required
                      placeholder="Enter password">
        </b-form-input>
      </b-form-group>
    <b-form-group label="Secret Code :" >
        <b-form-input  type="text"
                      v-model="formSecretCode"
                      required
                      placeholder="Enter SecretCode">
        </b-form-input>
      </b-form-group>
      <center> 
          <b-button size="md" class="bg-darklost" type="submit">
                REGISTER
            </b-button>
            <b-link href="/auth/login" >
                <b-button size="md" variant="success" class="not-radius ml-2">
                GO TO LOGIN
            </b-button>
            </b-link>
      </center>
      </b-form></b-col>
        
    </b-row>

    </b-container>

    </div>
  
</template>

<script>
import NavbarNotAuth from '~/components/admin/navbar_not_auth.vue'
export default {
  components: {
    NavbarNotAuth
  },
    head: {
    title: 'Register - Page',
  },
  data() {
    return {
      formError: null,
      formEmail: '',
      formPassword: '',
      formSecretCode:'',
      imes:'',
      dataCode:''
    }
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', {
          email: this.formEmail,
          password: this.formPassword,
          secretcode: this.formSecretCode
        })
        console.log(this.$store.state.authUser)
        this.formEmail = ''
        this.formPassword = ''
        this.formSecretCode = ''
        this.dataCode = this.$store.state.authUser.dataCode
        this.imes = this.$store.state.authUser.imes
        this.formError = null
      } catch (e) {
        this.formError = e.message
      }
    },
    async logout() {
      try {
        await this.$store.dispatch('logout')
      } catch (e) {
        this.formError = e.message
      }
    },

  }
}
</script>

<style>
.not-radius{
    border-radius: 0px;
    border: 0px;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}
.links
{
  padding-top: 15px;
}
</style>
