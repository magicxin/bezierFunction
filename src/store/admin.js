import router from '../router'
const state = {
  token:localStorage.getItem('token'),
  user:JSON.parse(window.localStorage.getItem('user'))
}

//// getters
//const getters = {
//cartProducts: (state, getters, rootState) => {
//  return state.items.map(({ id, quantity }) => {
//    const product = rootState.products.all.find(product => product.id === id)
//    return {
//      title: product.title,
//      price: product.price,
//      quantity
//    }
//  })
//},
//
//cartTotalPrice: (state, getters) => {
//  return getters.cartProducts.reduce((total, product) => {
//    return total + product.price * product.quantity
//  }, 0)
//}
//}
//
//// actions
//const actions = {
//checkout ({ commit, state }, products) {
//  const savedCartItems = [...state.items]
//  commit('setCheckoutStatus', null)
//  // empty cart
//  commit('setCartItems', { items: [] })
//  shop.buyProducts(
//    products,
//    () => commit('setCheckoutStatus', 'successful'),
//    () => {
//      commit('setCheckoutStatus', 'failed')
//      // rollback to the cart saved before sending the request
//      commit('setCartItems', { items: savedCartItems })
//    }
//  )
//},
//
//addProductToCart ({ state, commit }, product) {
//  commit('setCheckoutStatus', null)
//  if (product.inventory > 0) {
//    const cartItem = state.items.find(item => item.id === product.id)
//    if (!cartItem) {
//      commit('pushProductToCart', { id: product.id })
//    } else {
//      commit('incrementItemQuantity', cartItem)
//    }
//    // remove 1 item from stock
//    commit('products/decrementProductInventory', { id: product.id }, { root: true })
//  }
//}
//}

const mutations = {
  updateUser(state, data) {
    window.localStorage.setItem('user', JSON.stringify(data));
    state.user = JSON.parse(window.localStorage.getItem('user'));
  },
//login(state, data) {
//  //更改token的值
//  state.token = data;
//  window.localStorage.setItem('token', data);
//},
  signout(state) {
    //登出的时候要清除token
    router.replace('/login')
    state.token = null;
    state.user = null;
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user');
  },
};

export default {
  namespaced: true,
  state,
//getters,
//actions,
  mutations
}