<template>
  <v-app>
    <v-carousel>
      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/docks.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg" cover></v-carousel-item>

      <v-carousel-item src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-carousel-item>
    </v-carousel>
    <ToNewMemberRegistrationButton />
    <ToLoginPageButton />
    <ToProductSelectionButton />
  </v-app>
</template>

<script setup lang="ts">
import ToNewMemberRegistrationButton from '@/components/button/ToNewMemberRegistrationButton.vue';
import ToLoginPageButton from '@/components/button/ToLoginPageButton.vue';
import ToProductSelectionButton from '@/components/button/ToProductSelectionButton.vue';
</script>

<style></style>
