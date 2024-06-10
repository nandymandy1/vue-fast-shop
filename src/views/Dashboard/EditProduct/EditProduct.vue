<template>
  <Row align="center" v-if="!loading && !!result">
    <Col :xs="24" :sm="18" :md="18">
      <Card class="rounded-sm shadow-lg">
        <Typography.Title :level="3">
          {{ formState.name }}
        </Typography.Title>
        <Form :disabled="isUpdating" :model="formState" layout="vertical">
          <Form.Item label="Name" name="name">
            <Input
              size="large"
              placeholder="Title"
              v-model:value="formState.name"
            />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Textarea
              :rows="5"
              placeholder="Description"
              v-model:value="formState.description"
            />
          </Form.Item>
          <Form.Item label="Price" name="price">
            <Input
              type="number"
              placeholder="Price"
              v-model:value="formState.price"
            />
          </Form.Item>
          <ImageUpdater
            v-if="formState.src"
            :src="formState.src"
            @change="handleUpload"
          />
          <div class="flex items-center justify-end">
            <Button
              size="large"
              type="primary"
              :loading="isUpdating"
              :disabled="isUpdating"
              @click="updateProduct"
            >
              Update
            </Button>
          </div>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script setup>
import { useMutation, useQuery } from "@vue/apollo-composable";
import { ProductEditQuery, UpdateProductMutation } from "@/gql/Products";
import { useRoute, useRouter } from "vue-router";
import qApolloClient from "@/services/qApollo";
import {
  Card,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Textarea,
  Button,
  message,
} from "ant-design-vue";
import { reactive } from "vue";
import ImageUpdater from "@/components/ImageUpdater";
import { PublishAfterUpdate } from "@/gql/Products";
import { ProductsQuery } from "@/gql/Products";

const route = useRoute();
const router = useRouter();

const formState = reactive({
  name: "",
  src: null,
  price: 0,
  description: "",
});

const { loading, onResult, result } = useQuery(ProductEditQuery, {
  id: route.params.id,
});

const {
  onDone,
  mutate: editProduct,
  loading: isUpdating,
} = useMutation(UpdateProductMutation, {
  clientId: "mApollo",
  update: (_, { data: { updateProduct } }) => {
    const defaultClientCache = qApolloClient.cache;

    const existingProducts = defaultClientCache.readQuery({
      query: ProductsQuery,
    });

    if (existingProducts) {
      const newProducts = existingProducts.products.map((product) => {
        if (product.id === route.params.id) {
          console.log({ product, updateProduct });
          return {
            ...product,
            ...updateProduct,
          };
        }
        return product;
      });

      message.success("Product Updated successfully.");
      defaultClientCache.writeQuery({
        query: ProductsQuery,
        data: { products: newProducts },
      });
    }
  },
});

const { mutate: publishAfterUpdate, onDone: afterPublish } = useMutation(
  PublishAfterUpdate,
  { clientId: "mApollo" }
);

afterPublish(() => router.back());

onDone(() => {
  publishAfterUpdate({ id: route.params.id });
});

const handleUpload = (url) => {
  formState.src = url;
};

const updateProduct = () => {
  const variables = {
    id: route.params.id,
    name: formState.name,
    price: Number(formState.price),
    description: formState.description,
  };

  if (formState?.src?.previousImage) {
    variables.image = {
      disconnect: [{ id: formState.src.previousImage }],
      connect: [{ where: { id: formState.src.id } }],
    };
  } else {
    variables.image = null;
  }

  editProduct(variables);
};

onResult(({ data }) => {
  if (data?.products && (data?.products || [])?.length > 0) {
    const product = data.products[0];
    formState.name = product.name;
    formState.price = product.price;
    formState.src = product.images?.[0];
    formState.description = product.description;
  }
});
</script>
