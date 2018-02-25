<template>

    <div>
      <NavbarNotAuth/>
    </div>
  
</template>

<script>
import NavbarNotAuth from '~/components/admin/navbar_not_auth.vue'
import axios from 'axios'
export default {
  components: {
    NavbarNotAuth
  },
  asyncData ({ error }) {
    return axios.get(`/api/listPost`)
    .then((res) => {
      return res 
    })
    .catch((e) => {
      error({ statusCode: 404, message: 'Post not found' })
    })
  }

}
</script>

<style>
.container
{
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
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
