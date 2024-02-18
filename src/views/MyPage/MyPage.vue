<template>
    <p>MyPage</p>
    <v-text-field v-model="memberInfo.email" readonly label="Eメール"></v-text-field>
    <v-text-field v-model="memberInfo.authority" readonly label="権限"></v-text-field>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
import router from '@/router'

const memberInfo = computed(() => {

    if (!store.state.memberInfo) {
        alert('登録情報が失われました。もう一度登録をお願いします。');

        router.push({ path: '/top' });
        return null;
    } else {
        return store.state.memberInfo
    }
});
</script>