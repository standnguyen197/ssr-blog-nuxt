<template>

    <b-navbar toggleable="md" type="dark"  class="bg-darklost">
   <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

   <b-navbar-brand>
     <nuxt-link to="/">
      <img src="https://placekitten.com/g/30/30" class="d-inline-block align-top" alt="BV">
    </nuxt-link>
    </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <!-- <b-nav-item href="/">HOME</b-nav-item> -->
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">
      <b-nav-item-dropdown right>
        <!-- Using button-content slot -->
        <template slot="button-content">
          ACCOUNT
        </template>
       <b-dropdown-item href="/auth/register">REGISTER </b-dropdown-item>
        <b-dropdown-item href="/auth/login">LOGIN </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>

  </b-collapse>
</b-navbar>

<!-- navbar-1.vue -->

</template>

<style>
  .bg-darklost {
    background-image: linear-gradient(to left top, #36598e, #0073a4, #008cb0, #00a4b1, #12baa9);
    background-size: 100% 800%;
    border: none;
    border-radius: 0;
  }
  .dropdown-menu > a {
    text-decoration: none;
    color: #28a745;
    
  }
  .dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #01a4b0;
}
.dropdown-item.hover, .dropdown-item:hover{
    color: #fff;
    text-decoration: none;
    background-color: #01a4b0;
    border:none;
}
.navbar-brand a img {
  border-radius: 30px;
    border: 2px solid #ededed;
    padding: 2px;
}
.navbar-toggler {
    padding: 4px 12px;
    padding: 0.25rem 0.75rem;
    font-size: 20px;
    font-size: 1.25rem;
    line-height: 1;
    background-color: transparent;
    border: 0px;
    border-radius: 0.25rem;
}
</style>