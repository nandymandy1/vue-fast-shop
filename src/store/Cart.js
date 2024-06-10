import { CART_TYPES } from "./Types";

const state = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const getters = {
  cart: (state) => state.cart,
  count: (state) => state.cart.length,
  cartTotal: (state) => {
    return state.cart
      .reduce((acc, product) => acc + product.qty * product.price, 0)
      .toFixed(2);
  },
};

const actions = {};

const mutations = {
  [CART_TYPES.ADD_PRODUCT]: (state, product) => {
    const cartProductIndex = state.cart.findIndex(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (cartProductIndex !== -1) {
      updatedCart = [...state.cart];
      updatedCart[cartProductIndex] = {
        ...updatedCart[cartProductIndex],
        qty: updatedCart[cartProductIndex].qty + 1,
      };
    } else {
      updatedCart = [...state.cart, { ...product, qty: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    state.cart = updatedCart;
  },
  [CART_TYPES.REMOVE_PRODUCT]: (state, id) => {
    const updatedCart = state.cart.filter((product) => product.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    state.cart = updatedCart;
  },
  [CART_TYPES.DECREASE_QTY]: (state, productId) => {
    const cartProductIndex = state.cart.findIndex(
      (item) => item.id === productId
    );

    if (cartProductIndex !== -1) {
      let updatedCart = [...state.cart];
      const product = updatedCart[cartProductIndex];

      if (product.qty > 1) {
        updatedCart[cartProductIndex] = {
          ...product,
          qty: product.qty - 1,
        };
      } else {
        updatedCart = updatedCart.filter((item) => item.id !== productId);
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      state.cart = updatedCart;
    }
  },
  [CART_TYPES.CLEAR_CART]: (state) => {
    localStorage.removeItem("cart");
    state.cart = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
