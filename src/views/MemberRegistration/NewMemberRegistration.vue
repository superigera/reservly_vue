<template>
    <v-container>
        <v-row justify="center">
            <v-col cols="12" md="6">
                <v-card class="rounded-lg py-5 px-3">
                    <v-card-title class="text-center" style="font-size: 24px;">
                        新規会員登録
                    </v-card-title>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field v-model="memberInfo.lastName" :rules="lastNameRules" label="姓"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.firstName" :rules="firstNameRules" label="名"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.email" :rules="rules.emailRules" label="Eメール"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.phoneNumber" :rules="rules.phoneRules" label="電話番号(ハイフンなし)"
                                required></v-text-field>

                            <v-text-field v-model="memberInfo.age" :rules="rules.ageRules" label="年齢" required
                                type="number"></v-text-field>

                            <v-select v-model="memberInfo.gender" :items="genders" :rules="rules.genderRules" label="性別"
                                required></v-select>

                            <v-text-field v-model="memberInfo.password" :rules="rules.passwordRules"
                                :type="showPassword ? 'text' : 'password'" label="パスワード" required append-icon="mdi-eye"
                                @click:append="showPassword = !showPassword"></v-text-field>

                            <v-text-field v-model="memberInfo.passwordConfirm" :rules="passwordConfirmRules" label="パスワード確認"
                                :type="showPassword ? 'text' : 'password'" required append-icon="mdi-eye"
                                @click:append="showPassword = !showPassword"></v-text-field>
                            <v-row class="d-flex justify-center align-center" style="height: 100%;">
                                <v-col cols="auto" class="text-center mx-2">
                                    <BackButton />
                                </v-col>
                                <v-col cols="auto" class="text-center mx-2">
                                    <BaseButton :disabled="!memberInfo.passwordConfirm || !valid"
                                        to="/newMemberRegistration/comfirm" label="確認"
                                        @click="toComfirmMemberRegistration" />
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';
import { MemberInfo } from '@/types/MemberInfo';
import { rules } from '@/validation/validationRules';
import { useStore } from 'vuex';
import router from '@/router'
import BaseButton from '@/components/button/BaseButton.vue';
import BackButton from '@/components/button/BackButton.vue';
const valid = ref(false);
const form = ref(null);
const showPassword = ref(false);
const store = useStore();
const genders = ['男性', '女性', 'その他'];
let memberInfo = reactive<MemberInfo>({
    lastName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    age: 0,
    gender: '',
    password: '',
    passwordConfirm: '',
    authority: ''
});
onMounted(() => {
    const storedMemberInfo = store.getters.getMemberInfo;
    if (storedMemberInfo) {
        Object.assign(memberInfo, storedMemberInfo);
    }
});

const lastNameRules = rules.createNameRules("姓");
const firstNameRules = rules.createNameRules("名");
const passwordConfirmRules = computed(() => {
    return rules.createPasswordConfirmRules(memberInfo.password);
});

// ナビゲーションガード後、ストアに会員情報を保存し会員登録確認画面へ遷移
router.beforeEach((to, from, next) => {
    if (to.name === 'ConfirmMemberRegistration' && !store.state.memberInfo) {
        alert('登録情報が失われました。もう一度登録をお願いします。');
    } else {
        next();
    }
});
const toComfirmMemberRegistration = () => store.commit('setMemberInfo', memberInfo);
</script>