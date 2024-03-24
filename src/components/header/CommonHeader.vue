<template>
    <v-app-bar app dense>
        <v-toolbar-title>{{ appName }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn to="/top">ホーム</v-btn>
        <v-btn to="/contact">お問い合わせ</v-btn>
    </v-app-bar>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
    appName: string;
}
defineProps<Props>();
</script>
