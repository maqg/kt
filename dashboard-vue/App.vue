<template>
    <div>{{message}}</div>
</template>

<script lang="ts">
    import Vue from "vue";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";
    @Component
    export default class App extends Vue {
        @Prop(String) message: string
    }
</script>