<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="rounded-lg py-5 px-3">
                    <v-card-title class="text-center" style="font-size: 24px;">
                        新規会員登録確認
                    </v-card-title>
                    <v-card-text v-if="memberInfo">
                        <v-text-field v-model="memberInfo.lastName" readonly label="姓"></v-text-field>

                        <v-text-field v-model="memberInfo.firstName" readonly label="名"></v-text-field>

                        <v-text-field v-model="memberInfo.email" readonly label="Eメール"></v-text-field>

                        <v-text-field v-model="memberInfo.phoneNumber" readonly label="電話番号"></v-text-field>

                        <v-text-field v-model="memberInfo.age" readonly label="年齢" type="number"></v-text-field>

                        <v-text-field v-model="memberInfo.gender" readonly label="性別"></v-text-field>

                        <v-text-field v-model="memberInfo.password" readonly label="パスワード" type="password"></v-text-field>

                        <v-checkbox v-model="isAgreed" label="利用規約に同意します"></v-checkbox>
                        <v-row class="d-flex justify-center align-center" style="height: 100%;">
                            <v-col cols="auto" class="text-center mx-2">
                                <BackButton />
                            </v-col>
                            <v-col cols="auto" class="text-center mx-2">
                                <BaseButton :disabled="!isAgreed" to="" label=" 登録" @click="register" />
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import router from '@/router'
import BackButton from '@/components/button/BackButton.vue';
import BaseButton from '@/components/button/BaseButton.vue';

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const store = useStore();
const memberInfo = computed(() => {

    if (!store.state.memberInfo) {
        alert('登録情報が失われました。もう一度登録をお願いします。');

        router.push({ path: '/top' });
        return null;
    } else {
        return store.state.memberInfo
    }
});


const isAgreed = ref(false);

const register = () => {
    if (isAgreed.value) {
        axios.post(BASE_URL + "/newMemberRegistration", memberInfo.value, {
        }).then((res) => {
            console.log(res);
            router.push({ path: '/top' });
        }).catch((err) => {

            console.log(err);
            if (err.response.status === 409) {
                alert('このメールアドレスは登録されています。別のメールアドレスをお試しください。');
            }
            else if (err.response.status === 500) {
                alert('サーバーエラーが発生しました。サポートデスクにお問い合わせください。');
                router.push({ path: '/top' });
            }
            else {
                alert('予期せぬエラーが発生しました。サポートデスクにお問い合わせください。');
                router.push({ path: '/top' });
            }
        });
    }
};

</script>
