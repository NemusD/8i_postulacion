<template>
    <div>
        <h1 class="title is-1 has-text-white has-background-primary has-text-centered">
            {{ title.toUpperCase() }} Productos
            {{ countTitles !=0 ? countTitles : ""}} Cantidad
        </h1>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";

export default {
  name: "Purchase",
  computed: {
    ...mapState(["title"]),
    ...mapGetters(["countTitles"]),
  },
};
</script>