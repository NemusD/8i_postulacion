import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

import 'bulma/css/bulma.css'

new Vue ({
    render: h => h(App),
    store: store
}).$mount('#app')