<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="rounded-lg py-5 px-3">
                    <v-card-title class="text-center" style="font-size: 24px;">
                        ログイン
                    </v-card-title>
                    <v-card-text>
                        <!-- <v-form @submit.prevent="login"> -->
                        <v-text-field v-model="memberInfo.email" :rules="rules.emailRules" label="Email"
                            required></v-text-field>

                        <v-text-field v-model="memberInfo.password" :rules="rules.passwordRules" label="パスワード"
                            required></v-text-field>
                        <v-row class="d-flex justify-center align-center" style="height: 100%;">
                            <v-col cols="auto" class="text-center mx-2">
                                <BackButton />
                            </v-col>
                            <v-col cols="auto" class="text-center mx-2">
                                <!-- <BaseButton to="#" label="ログイン" @click="login" /> -->
                                <button type="button" @click="login">ログイン</button>

                            </v-col>
                        </v-row>
                        <!-- </v-form> -->
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { MemberInfo } from '@/types/MemberInfo'
import { rules } from '@/validation/validationRules';
// import BaseButton from '@/components/button/BaseButton.vue'
import BackButton from '@/components/button/BackButton.vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_API_BASE_URL

const memberInfo = reactive<MemberInfo>({
    lastName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    age: 0,
    gender: '',
    password: '',
    passwordConfirm: ''
});

// axios.get<string>(BASE_URL + '/csrf-token').then(response => {
//     const csrfToken: string = response.data;
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
//     console.log("CSRF Token:", csrfToken)
// });

const login = async () => {
    try {
        const response = await axios.post(BASE_URL + '/login', {
            username: "user",
            password: "password",
        }, {
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            }
        });
        if (response.status === 200) {
            console.log(memberInfo.email)
            console.log(memberInfo.password)
            console.log("Login success:", response);
        }
    } catch (error) {
        console.error("Login failed:", error);
    }

}
</script>