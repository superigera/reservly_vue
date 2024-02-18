type RuleFunctionString = (v: string) => string | true;
type RuleFunctionNumber = (v: number) => string | true;

const requiredRule = (fieldName: string): RuleFunctionString => {
    return (v: string) => !!v || `${fieldName}は必須です`;
};

export const rules = {
    createNameRules: (fieldName: string): RuleFunctionString[] => [
        requiredRule(fieldName),
        (v: string) => (v && v.length <= 10) || `${fieldName}は10文字以下で入力してください`
    ],

    emailRules: <RuleFunctionString[]>[
        requiredRule("Eメール"),
        (v: string) => v.match(/.+@.+\..+/) !== null || "メールアドレスの形式で入力してください",
    ],

    phoneRules: <RuleFunctionString[]>[
        requiredRule("電話番号"),
        (v: string) => /^\d{10,11}$/.test(v) || "電話番号の形式が正しくありません"
    ],

    ageRules: <RuleFunctionNumber[]>[
        (v: number) => v >= 0 || "年齢は正の数値を入力してください"
    ],

    genderRules: <RuleFunctionString[]>[
        requiredRule("性別")
    ],

    passwordRules: <RuleFunctionString[]>[
        requiredRule("パスワード"),
        (v: string) => (v && v.length >= 8) || "パスワードは8文字以上で入力してください",
        (v: string) => /[A-Z]/.test(v) || "パスワードには少なくとも1つの大文字が必要です",
        (v: string) => /[a-z]/.test(v) || "パスワードには少なくとも1つの小文字が必要です",
        (v: string) => /\d/.test(v) || "パスワードには少なくとも1つの数字が必要です",
    ],

    createPasswordConfirmRules: (password: string): RuleFunctionString[] => [
        (v: string) => v === password || "パスワードが一致しません"
    ]
}
