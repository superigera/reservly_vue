<template>
    <div>
        <router-link v-if="to && !disabled" :to="to">
            <v-btn :type="type" rounded="lg" color="indigo-darken-1" size="large" :disabled="disabled">
                {{ label }}
            </v-btn>
        </router-link>
        <v-btn v-else :type="type" rounded="lg" color="indigo-darken-1" size="large" :disabled="disabled">
            {{ label }}
        </v-btn>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    to?: string;
    label: string;
    disabled?: boolean;
    type?: string;
}

defineProps<Props>();
</script>

<style scoped>
a {
    text-decoration: none;
}
</style>
