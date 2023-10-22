<template>
    <v-btn rounded="lg" color="#607D8B" size="large" style="color: white;" @click="goBack">
        戻る
    </v-btn>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const goBack = () => {
    router.go(-1);
}
</script>

<style scoped></style>
