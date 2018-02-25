export default {
    fetch ({ store, redirect }) {
    if (!store.state.authUser) {
        return redirect('/auth/login')
    }
  }
}