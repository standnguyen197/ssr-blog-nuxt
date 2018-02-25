import axios from 'axios'

export const state = () => ({
  authUser: null,
  mPost: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
  SET_POST: function (state, post) {
    state.mPost = post
  }
}

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  },
  // ========================== AUTHENTICATION ======================== //

  async login({ commit }, { email, password }) {
    try {
      const { data } = await axios.post('/api/login', { email, password })
      commit('SET_USER', data)

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },
  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  },

  // ===================== POST ============================== //
  async createPost({ commit }, { title , description , keyword , category , content , cover }) {
    try {
      const { data } = await axios.post('/api/createPost', {title , description , keyword , category , content , cover })
      commit('SET_POST', data)

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    }
  },


  

}