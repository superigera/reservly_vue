<template>
    <div>
        <h2>Login</h2>
        <form @submit.prevent="login">
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'
const BASE_URL = process.env.VUE_APP_API_BASE_URL
interface MemberInfo {
    name: string;
    password: string;
}

const memberInfo = reactive<MemberInfo>({
    name: 'user',
    password: 'test1234'
});
axios.get<string>(BASE_URL + '/csrf-token').then(response => {
    const csrfToken: string = response.data;
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
    console.log("CSRF Token:", csrfToken)
});

const login = async () => {
    try {
        const response = await axios.post(BASE_URL + '/login', {
            name: memberInfo.name,
            password: memberInfo.password,
        })
        if (response.status === 200) {
            console.log("Login success:", response)
        }
    } catch (error) {
        console.error("Login failed:", error)
    }
}
</script>