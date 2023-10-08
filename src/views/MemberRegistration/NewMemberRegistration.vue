<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card>
                    <v-card-title>
                        新規会員登録
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="memberInfo.lastName" :rules="lastNameRules" label="姓"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.firstName" :rules="firstNameRules" label="名"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.email" :rules="emailRules" label="Eメール"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.phoneNumber" :rules="phoneRules" label="電話番号"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.age" :rules="ageRules" label="年齢" required
                                type="number"></v-text-field>

                            <v-select v-model="memberInfo.gender" :items="genders" label="性別" required></v-select>

                            <v-text-field v-model="memberInfo.password" :rules="passwordRules" label="パスワード" type="password"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.passwordConfirm" :rules="passwordConfirmRules" label="パスワード確認"
                                type="password" required></v-text-field>
                            <ToComfirmMemberRegistrationButton @click="toComfirmMemberRegistration" />
                            <v-btn :disabled="!valid">確認</v-btn>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useStore } from 'vuex';
import ToComfirmMemberRegistrationButton from '@/components/button/ToComfirmMemberRegistrationButton.vue';
const valid = ref(true);
const form = ref(null);
const store = useStore();
const genders = ['男性', '女性', 'その他'];

interface MemberInfo {
    lastName: string;
    firstName: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: string;
    password: string;
    passwordConfirm: string;
}

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


const createNameRules = (fieldName: string) => [
    (v: string) => !!v || `${fieldName}は必須です`,
    (v: string) => (v && v.length <= 10) || `${fieldName}は10文字以下で入力してください`
];
const lastNameRules = createNameRules("姓");
const firstNameRules = createNameRules("名");

const emailRules = [
    (v: string) => !!v || "Eメールは必須です",
    (v: string) => v.match(/.+@.+\..+/) !== null || "メールアドレスの形式で入力してください",
];

const phoneRules = [
    (v: string) => !!v || "電話番号は必須です",
    (v: string) => /^\d{10,11}$/.test(v) || "電話番号の形式が正しくありません"
];

const ageRules = [
    (v: number) => v > 0 || "年齢は正の数値を入力してください"
];

const passwordRules = [
    (v: string) => !!v || "パスワードは必須です",
    (v: string) => (v && v.length >= 8) || "パスワードは8文字以上で入力してください",
    (v: string) => /[A-Z]/.test(v) || "パスワードには少なくとも1つの大文字が必要です",
    (v: string) => /[a-z]/.test(v) || "パスワードには少なくとも1つの小文字が必要です",
    (v: string) => /\d/.test(v) || "パスワードには少なくとも1つの数字が必要です"
];

const passwordConfirmRules = [
    (v: string) => v === memberInfo.password || "パスワードが一致しません"
];

// ストアに会員情報を保存し会員登録確認画面へ遷移
const toComfirmMemberRegistration = () => store.commit('setMemberInfo', memberInfo);

</script>
