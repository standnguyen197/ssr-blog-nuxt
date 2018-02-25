<template>

    <div>
      <NavbarNotAuth/>
      <b-container>
    <b-row class="mt-5">
     
    <b-col v-if="dataCode == 0" sm="12" md="6" offset-md="3">
      <div v-if="this.$store.state.authUser">
        <b-alert v-if="dataCode == 1" show variant="success">{{ imes }}</b-alert>
        <b-alert v-if="dataCode == 0" show variant="warning">{{ imes }}</b-alert>
      </div>
      <center><h1>LOGIN TO DASHBOARD</h1></center>
    <b-form @submit.prevent="login" class="mt-3">
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

      <center> 
          <b-button size="md" class="bg-darklost" type="submit">
                LOGIN
            </b-button>
            <b-link href="/auth/register" >
                <b-button size="md" variant="success" class="not-radius ml-2">
                GO TO REGISTER
            </b-button>
            </b-link>
             <b-link v-if="this.$store.state.authUser" href="/dash/home" >
                <b-button size="md" variant="success" class="not-radius ml-2">
                GO TO DASHBOARD
            </b-button>
            </b-link>
      </center>
      </b-form>
      </b-col>

    <b-col v-else sm="12" md="6" offset-md="3">
      <center><h1>WELCOME TO DASHBOARD</h1>
      <nuxt-link to="/dash/home" >
                <b-button size="md" variant="success" class="not-radius ml-2">
                GO TO DASHBOARD
            </b-button>
      </nuxt-link>
      <p></p></center>
    </b-col>

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
    title: 'Login - Page',
  },
  data() {
    return {
      formError: null,
      formEmail: '',
      formPassword: '',
      statusLogin: '', 
      imes: '',
      dataCode: '',
    }
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', {
          email: this.formEmail,
          password: this.formPassword
        })
        this.formEmail = ''
        this.formPassword = ''
        this.userData = this.$store.state.authUser.userData
        this.statusLogin = this.$store.state.authUser.statusLogin
        this.dataCode = this.$store.state.authUser.dataCode
        this.imes = this.$store.state.authUser.imes
        console.log(this.$store.state.authUser)
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
    }
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
