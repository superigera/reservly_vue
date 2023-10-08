<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        新規会員登録確認
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="memberInfo.lastName" readonly label="姓"></v-text-field>

                        <v-text-field v-model="memberInfo.firstName" readonly label="名"></v-text-field>

                        <v-text-field v-model="memberInfo.email" readonly label="Eメール"></v-text-field>

                        <v-text-field v-model="memberInfo.phoneNumber" readonly label="電話番号"></v-text-field>

                        <v-text-field v-model="memberInfo.age" readonly label="年齢" type="number"></v-text-field>

                        <v-text-field v-model="memberInfo.gender" readonly label="性別"></v-text-field>

                        <v-text-field v-model="memberInfo.password" readonly label="パスワード" type="password"></v-text-field>

                        <v-checkbox v-model="isAgreed" label="利用規約に同意します"></v-checkbox>
                        <v-btn>戻る</v-btn>
                        <v-btn :disabled="!isAgreed" @click="register">
                            登録
                        </v-btn>
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

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const store = useStore();
const memberInfo = computed(() => store.state.memberInfo);

const isAgreed = ref(false);

const register = () => {
    if (isAgreed.value) {
        axios.post(BASE_URL + "/newMemberRegistration", memberInfo.value, {
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }
};

</script>
