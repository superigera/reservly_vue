<template>
    <v-container>
        <CommonHeader appName="商品選択" />

        <!-- 検索とカテゴリ選択 -->
        <v-row>
            <v-col cols="12" sm="6">
                <v-text-field label="商品名で検索" v-model="searchQuery" clearable solo></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
                <v-select :items="categories" label="カテゴリで絞り込み" v-model="selectedCategory" clearable solo></v-select>
            </v-col>
        </v-row>

        <v-row>
            <!-- 商品リスト -->
            <v-col cols="12" md="8">
                <v-row>
                    <v-col cols="12" md="4" v-for="product in filteredProducts" :key="product.productID">
                        <v-card>
                            <v-img :src="product.productImage" height="200px"></v-img>
                            <v-card-title>{{ product.productName }}</v-card-title>
                            <v-card-text>
                                {{ product.productDescription }}
                                <div>価格: ¥{{ formatPrice(product.productPrice) }}</div>
                                <div>発売日: {{ product.productReleaseDate }}</div>
                            </v-card-text>
                            <v-card-actions>
                                <v-select :items="quantityOptions(product.productMaxQuantity)" label="数量"
                                    v-model="product.productQuantity"></v-select>
                                <v-btn color="primary" @click="selectProduct(product)">選択</v-btn>
                            </v-card-actions>
                            <v-card-actions>
                                <v-btn color="primary" @click="openDialog(product)">詳細を見る</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>

            <!-- サイドバー -->
            <v-col cols="12" md="4">
                <v-card>
                    <v-card-title align="center">カート</v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item v-for="(product) in selectedProducts" :key="product.productID">
                                <v-row align="center" no-gutters>
                                    <v-col cols="12">
                                        <div>
                                            {{ product.productName }} - ¥{{ formatPrice(product.productPrice) }} x
                                            <v-select :items="quantityOptions(product.productMaxQuantity)"
                                                v-model="product.productQuantity" dense outlined small hide-details
                                                class="d-inline-flex"
                                                style="width: auto; margin-bottom: -8px;"></v-select>
                                        </div>
                                    </v-col>
                                    <v-col cols="6" class="text-left">
                                        <div><strong>小計: ¥{{ formatPrice(product.productPrice * product.productQuantity)
                                                }}</strong></div>
                                    </v-col>
                                </v-row>
                            </v-list-item>

                        </v-list>
                        <v-divider class="my-4"></v-divider>
                        <div class="text-h5">合計金額: ¥{{ formatPrice(totalAmount) }}</div>
                    </v-card-text>
                    <v-row justify="center">
                        <v-col cols="auto">
                            <BackButton />
                        </v-col>
                        <v-col cols="auto">
                            <ToPaymentMethodSelectionButton />
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>

        <!-- 商品詳細モーダル -->
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card v-if="selectedProduct">
                <v-card-title>{{ selectedProduct.productName }}</v-card-title>
                <v-card-text>
                    <v-img :src="selectedProduct.productImage" height="200px" contain></v-img>
                    <div>{{ selectedProduct.productDescription }}</div>
                    <div>価格: ¥{{ formatPrice(selectedProduct.productPrice) }}</div>
                    <div>発売日: {{ selectedProduct.productReleaseDate }}</div>
                    <div>最大購入数量: {{ selectedProduct.productMaxQuantity }}</div>
                </v-card-text>
                <v-card-actions>
                    <v-btn color="red darken-1" @click="closeDialog()">閉じる</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue';
import axios from 'axios';
import ToPaymentMethodSelectionButton from '@/components/button/ToPaymentMethodSelectionButton.vue';
import CommonHeader from '@/components/header/CommonHeader.vue';
import BackButton from '@/components/button/BackButton.vue';

const BASE_URL = process.env.VUE_APP_API_BASE_URL
const products = ref<Product[]>([]);
const selectedProducts = ref<Product[]>([]);
const selectedProduct = ref<Product | null>(null);
const dialog = ref(false);
const searchQuery = ref('');
const selectedCategory = ref('');
const categories = ref<string[]>();
const initialValue = 0;

interface Product {
    productID: number;
    productName: string;
    productDescription: string;
    productImage: string;
    productPrice: number;
    productQuantity: number;
    productMaxQuantity: number;
    productReleaseDate: string;
    productCategoryName: string;
}

// 商品情報取得
axios.post(BASE_URL + "/fetchProduct").then((res) => {
    console.log(res);
    products.value = res.data;

    // カテゴリ一覧生成
    const uniqueCategories: Set<string> = new Set(['全て']);
    products.value.forEach(product => {
        uniqueCategories.add(product.productCategoryName);
    });
    categories.value = Array.from(uniqueCategories);
}).catch((err) => {
    console.log(err);
});

// カート内情報
function selectProduct(product: Product): void {
    // カートに同じ商品がなければ追加、あれば数量を増やす
    const existingProduct = selectedProducts.value.find((p) => p.productID === product.productID);
    if (!existingProduct) {
        selectedProducts.value.push({ ...product });
    } else {
        if (existingProduct.productQuantity + product.productQuantity <= existingProduct.productMaxQuantity) {
            existingProduct.productQuantity += product.productQuantity;
        } else {
            alert(`"${product.productName}"の購入可能数量を超えています。\n最大購入数量: ${existingProduct.productMaxQuantity}`);
        }
    }
}

// カート内合計金額算出
const totalAmount = computed(() => {
    return selectedProducts.value.reduce((sum, product) => sum + (product.productPrice * product.productQuantity), initialValue);
});

// 最大購入可能数量に基づいてドロップダウンの選択肢を生成
function quantityOptions(productMaxQuantity: number) {
    return Array.from({ length: productMaxQuantity }, (_, i) => i + 1);
}

// 商品検索とカテゴリ絞り込み
const filteredProducts = computed(() => {
    if (!searchQuery.value && !selectedCategory.value) {
        return products.value;
    }
    return products.value.filter(product => {
        const matchesQuery = (product.productName?.toLowerCase().includes(searchQuery.value?.toLowerCase().trim() ?? '') || product.productDescription?.toLowerCase().includes(searchQuery.value ?? '')) ?? false;
        const matchesCategory = selectedCategory.value === '' || product.productCategoryName === selectedCategory.value || selectedCategory.value === '全て' || selectedCategory.value === null;
        return matchesQuery && matchesCategory;
    });
});

function openDialog(product: Product) {
    selectedProduct.value = product;
    dialog.value = true;
}

function closeDialog() {
    dialog.value = false;
    selectedProduct.value = null;
}

function formatPrice(value: String | Number) {
    return value.toLocaleString();
}
</script>