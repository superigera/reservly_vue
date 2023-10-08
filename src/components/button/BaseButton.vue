<template>
    <router-link :to=to>
        <v-btn rounded="lg" color="indigo-darken-1" size="large">
            {{ label }}
        </v-btn>
    </router-link>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    to: string;
    label: string;
}

defineProps<Props>();
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
