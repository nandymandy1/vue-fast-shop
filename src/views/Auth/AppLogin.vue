<template>
  <Card class="border-solid border-[#f6f6f6] border-[1px] shadow-md">
    <Typography.Title :level="3">Login User</Typography.Title>
    <div class="flex gap-2 my-2">
      <Tag>Username: admin</Tag>
      <Tag>Password: password</Tag>
    </div>
    <div class="flex flex-col w-full gap-3">
      <div class="flex flex-col w-full gap-3">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username"
          v-model="userDetails.username"
          class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
        />
      </div>
      <div class="flex flex-col w-full gap-3">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password"
          v-model="userDetails.password"
          class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
        />
      </div>
      <div class="flex flex-col w-full gap-3 my-2">
        <Button
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="handleLogin"
        >
          Login
        </Button>
      </div>
    </div>
  </Card>
</template>

<script setup>
import { Card, Typography, Button, notification, Tag } from "ant-design-vue";
import { useStore } from "vuex";
import { ref } from "vue";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const loading = ref(false);

const userDetails = ref({
  username: "",
  password: "",
});

const handleLogin = async () => {
  try {
    loading.value = true;
    const { username, password } = userDetails.value;
    await store.dispatch("Auth/loginUser", { username, password });
    notification.success({
      placement: "topRight",
      message: "Login Success",
      description: "Logged in Successfully.",
    });
    router.replace("/dashboard/products");
  } catch (err) {
    notification.error({
      message: err.message,
      placement: "topRight",
      description: "Unable to login.",
    });
  } finally {
    loading.value = false;
  }
};
</script>
