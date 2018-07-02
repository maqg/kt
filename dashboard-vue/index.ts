import './static/style/style.scss';
import Vue from 'vue';
import App from './App.vue';
new Vue({
    el: "#dashboard-vue-root",
    render: h => h(App, {
        props: {
            message: "123"
        }
    })
});