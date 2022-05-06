import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    //Variables y conexiones
    state: {
        title: "",
        price: "",
        category: "",
        description: "",
        image: ""
    },
    //Funciones síncronas para cambiar el estado put, edit, delete
    mutations: {
        LOAD_TITLE: (state, payload) => (state.title = payload),
        LOAD_PRICE: (state, payload) => (state.price = payload),
        LOAD_CATEGORY: (state, payload) => (state.category = payload),
        LOAD_DESCRIPTION: (state, payload) => (state.description = payload),
        LOAD_IMAGE: (state, payload) => (state.image = payload),
    },
    //Propiedades computadas
    getters: {
        countTitles: (state) => state.title.length,
    },
    //Funciones asíncronas para llamar una o más mutaciones
    actions: {
        GET_TITLES: (state) => {
            fetch( `https://fakestoreapi.com/${state.state.title}`)
            .then((res) => {
                return res.json();
            })
            .then((response) => {
                const titles = response.items.map((title) => title.volumeInfo)
                state.commit("LOAD_TITLE", titles)
            });
        },
    },
});
