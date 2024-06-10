<template>
  <div class="w-full px-5 py-5">
    <div class="w-full flex items-center justify-between py-4">
      <h3 class="text-2xl font-bold">All Products</h3>
      <RouterLink to="/dashboard/add-product">
        <Button type="primary" size="large">Add Product</Button>
      </RouterLink>
    </div>
    <ProductTableItemLoader v-if="!result && loading" />
    <div
      v-if="result && !loading"
      class="w-full px-5 py-4 border-solid border-[1px] border-[#e7e7e7] shadow-md rounded-sm mt-5"
    >
      <div class="flex flex-col">
        <div class="-m-1.5 overflow-x-auto">
          <div class="p-1.5 min-w-full inline-block align-middle">
            <div class="overflow-hidden">
              <table
                class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
              >
                <thead>
                  <tr>
                    <ProductTableHeader
                      v-for="title in titles"
                      :title="title"
                      :key="title"
                    />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="product in result.products"
                    :key="product.id"
                    class="bg-white hover:bg-[#f6f6f6] border-solid border-x-0 border-t-0 border-[#e7e7e7]"
                  >
                    <ProductTableItem>
                      <template #content>
                        <h4 class="font-bold text-[18px]">
                          {{ product.name }}
                        </h4>
                      </template>
                    </ProductTableItem>
                    <ProductTableItem>
                      <template #content>
                        <Image
                          :width="60"
                          :height="60"
                          :src="product.images?.[0].url"
                          class="border-solid border-[1px] border-[#e7e7e7] rounded-sm shadow-md"
                        />
                      </template>
                    </ProductTableItem>
                    <ProductTableItem>
                      <template #content>
                        <div>Rs. {{ product.price.toFixed(2) }}</div>
                      </template>
                    </ProductTableItem>
                    <ProductTableItem>
                      <template #content>
                        <Tag
                          :bordered="false"
                          :color="
                            { DRAFT: 'error', PUBLISHED: 'success' }[
                              product.stage
                            ]
                          "
                        >
                          {{ product.stage }}
                        </Tag>
                      </template>
                    </ProductTableItem>
                    <ProductTableItem>
                      <template #content>
                        <div class="flex gap-2 items-center line-clamp-1">
                          <ProductSwatchItem
                            v-for="variant in product.variants"
                            :key="variant.id"
                            :color="(variant?.color || '')?.toLowerCase()"
                          />
                        </div>
                      </template>
                    </ProductTableItem>
                    <ProductTableItem>
                      <template #content>
                        <div class="flex items-center gap-2">
                          <RouterLink :to="`/product/${product.slug}`">
                            <Button class="rounded-sm"> View </Button>
                          </RouterLink>
                          <RouterLink :to="`/dashboard/product/${product.id}`">
                            <Button class="rounded-sm"> Update </Button>
                          </RouterLink>
                          <Button
                            class="rounded-sm"
                            @click="() => deleteProduct(product.id)"
                          >
                            Delete
                          </Button>
                        </div>
                      </template>
                    </ProductTableItem>
                  </tr>
                </tbody>
              </table>
              <div
                class="flex flex-col items-center justify-center h-[30vh] bg-[#f6f6f6] rounded-sm"
                v-if="result && !loading && result?.products.length === 0"
              >
                <Result
                  title="There are no product reviews available"
                  sub-title="Try adding new products to your store."
                >
                  <template #extra>
                    <RouterLink to="/dashboard/add-product">
                      <Button size="large" type="primary">Add Products</Button>
                    </RouterLink>
                  </template>
                </Result>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ProductsQuery, DeleteProductMutation } from "@/gql/Products.js";
import ProductTableHeader from "./ProductTableHeader";
import ProductTableItem from "./ProductTableItem";
import ProductTableItemLoader from "./ProductTableItemLoader";
import ProductSwatchItem from "@/components/ProductSwatchItem";
import { Button, Tag, Image, Result, message } from "ant-design-vue";
import qApolloClient from "@/services/qApollo";

const titles = ["Title", "Image", "Price", "Status", "Variants", "Action"];
const { result, loading } = useQuery(ProductsQuery);

const { mutate } = useMutation(DeleteProductMutation, {
  clientId: "mApollo",
  // eslint-disable-next-line
  update(_, { data: { deleteProduct } }) {
    const defaultClientCache = qApolloClient.cache;

    const existingProducts = defaultClientCache.readQuery({
      query: ProductsQuery,
    });

    if (existingProducts) {
      const newProducts = existingProducts.products.filter(
        (product) => product.id !== deleteProduct.id
      );

      message.success("Product deleted successfully.");
      defaultClientCache.writeQuery({
        query: ProductsQuery,
        data: {
          products: newProducts,
        },
      });
    }
  },
});

const deleteProduct = (productId) => mutate({ id: productId });
</script>
