export default function ({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.logged == null) {
      return redirect('/')
    }else{
        return
    }
}