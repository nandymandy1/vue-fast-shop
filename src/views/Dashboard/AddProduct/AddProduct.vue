<template>
  <Row align="center">
    <Col :xs="24" :sm="18" :md="18">
      <Card class="rounded-sm shadow-lg">
        <Typography.Title :level="3">Add Product</Typography.Title>
        <Form :model="formState" layout="vertical">
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
          <ImageUpdater :src="formState.src" @change="handleUpload" />
          <div class="flex items-center justify-end">
            <Button
              size="large"
              type="primary"
              :loading="isCreating"
              :disabled="isCreating"
              @click="addProduct"
            >
              Add Product
            </Button>
          </div>
        </Form>
      </Card>
    </Col>
  </Row>
</template>

<script setup>
import {
  Row,
  Col,
  Typography,
  Card,
  Form,
  Input,
  Button,
  Textarea,
  message,
} from "ant-design-vue";
import { reactive } from "vue";
import { useMutation } from "@vue/apollo-composable";
import {
  CreateProductMutation,
  ProductsQuery,
  PublishAfterUpdate,
} from "@/gql/Products";
import ImageUpdater from "@/components/ImageUpdater";
import { useRouter } from "vue-router";

import qApolloClient from "@/services/qApollo";

// Form state
const formState = reactive({
  name: "",
  price: 0,
  src: {
    url: require("@/assets/empty.png"),
  },
  description: "",
  slug: "",
});

// Router instance
const router = useRouter();

// Handle file upload
const handleUpload = (url) => {
  formState.src = url;
};

// Apollo Mutation
const {
  mutate: createProduct,
  loading: isCreating,
  onDone,
} = useMutation(CreateProductMutation, {
  clientId: "mApollo",
  // eslint-disable-next-line
  update: (_, { data: { createProduct } }) => {
    const defaultClientCache = qApolloClient.cache;
    const existingProducts = defaultClientCache.readQuery({
      query: ProductsQuery,
    });

    if (existingProducts) {
      defaultClientCache.writeQuery({
        query: ProductsQuery,
        data: {
          products: [createProduct, ...existingProducts.products],
        },
      });
    }
  },
});

const {
  onDone: afterPublish,
  onError: errorAfterPublish,
  mutate: publishAfterUpdate,
} = useMutation(PublishAfterUpdate, { clientId: "mApollo" });

onDone(({ data }) => publishAfterUpdate({ id: data.createProduct.id }));

afterPublish(() => {
  message.success("Product created successfully.");
  router.push("/products");
});

errorAfterPublish(() => message.error("Unable to create product."));

const addProduct = () => {
  const variables = {
    name: formState.name,
    description: formState.description,
    price: Number(formState.price),
    slug: formState.name.split(" ").join("-").toLowerCase(),
  };

  if (formState?.src?.id) {
    variables.image = {
      connect: [{ id: formState.src.id }],
    };
  }
  createProduct({ ...variables });
};
</script>
