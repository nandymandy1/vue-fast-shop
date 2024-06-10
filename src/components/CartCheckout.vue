<template>
  <div>
    <button
      class="w-full bg-[#17202A] text-white px-6 py-5 hover:bg-[#2C3E50] flex gap-4 justify-center items-center transition-all duration-700 rounded-sm"
      @click="open = true"
    >
      Checkout
    </button>
    <div>
      <Modal centered :width="720" v-model:open="open" @cancel="handleClose">
        <div>
          <Typography.Title :level="3">Checkout</Typography.Title>
          <div class="flex flex-col gap-3">
            <div class="w-full flex flex-col gap-1">
              <label for="name">Name</label>
              <input
                id="name"
                placeholder="Name"
                v-model="userDetails.name"
                class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
              />
            </div>
            <div class="w-full flex flex-col gap-1">
              <label for="phone">Phone Number</label>
              <input
                id="phone"
                v-model="userDetails.phone"
                placeholder="Phone Number"
                class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
              />
            </div>
            <div class="w-full flex flex-col gap-1">
              <label for="email">Email Number</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                v-model="userDetails.email"
                class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
              />
            </div>
            <div class="w-full flex flex-col gap-1">
              <label for="address">Address</label>
              <textarea
                id="address"
                placeholder="Address"
                v-model="userDetails.address"
                class="border-solid border-[1px] border-[#8d8d8d] px-2 py-2 text-[18px] w-full rounded-md"
              />
            </div>
          </div>
        </div>
        <template #footer>
          <Divider />
          <div class="w-full flex items-center gap-3 my-5">
            <button
              @click="handleClose"
              class="w-full py-3 text-[18px] font-bold rounded-sm bg-[#1C2833] hover:bg-[#304356] text-white transition-all duration-500"
            >
              Cancel
            </button>
            <button
              @click="handleOk"
              class="w-full py-3 text-[18px] font-bold rounded-sm bg-[#1D8348] hover:bg-[#229954] text-white transition-all duration-500"
            >
              Buy
            </button>
          </div>
        </template>
        <template #header></template>
      </Modal>
    </div>
  </div>
</template>

<script setup>
import {
  Modal,
  Typography,
  Divider,
  notification,
  message,
} from "ant-design-vue";
import { ref, computed, defineEmits } from "vue";
import { useStore } from "vuex";
import { prepareRazorPayOption } from "@/utils/payment";
import { useMutation } from "@vue/apollo-composable";
import { CreatePayment, PublishAfterUpdate } from "@/gql/Payment";
import { CART_TYPES } from "@/store/Types";

const store = useStore();

const userDetails = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const open = ref(false);
const emit = defineEmits(["close"]);
const cart = computed(() => store.getters["Cart/cart"]);
const cartTotal = computed(() => store.getters["Cart/cartTotal"]);

const handleClose = () => {
  open.value = false;
};

const { mutate: saveTransaction, onDone } = useMutation(CreatePayment, {
  clientId: "mApollo",
});

const { mutate: publishTransaction, onDone: afterPublish } = useMutation(
  PublishAfterUpdate,
  { clientId: "mApollo" }
);

onDone(({ data }) => {
  publishTransaction({ id: data?.createPayment?.id });
  notification.success({
    placement: "topRight",
    message: "Payment successful.",
    description: `Your Products are purchased successfully.`,
  });
  store.commit(["Cart", CART_TYPES.CLEAR_CART].join("/"));
  handleClose();
});

afterPublish(() => emit("close"));

const handleOk = () => {
  const { name, email, phone, address } = userDetails.value;
  if (!name && name.length < 3) {
    message.error("Name is required.");
    return;
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email && email.length < 4 && !emailRegex.test(email)) {
    message.error("Please enter a valid email address.");
    return;
  }
  const phoneRegex = /^\d{10}$/;
  if (!phone && phone.length < 10 && !phoneRegex.test(phone)) {
    message.error("Please enter a valid Phone Number.");
    return;
  }
  if (!address) {
    message.error("Address is required.");
    return;
  }

  const paymentOpts = prepareRazorPayOption(
    { price: cartTotal.value * 100 },
    userDetails.value
  );

  const connect = cart.value.map((item) => ({ id: item.id }));

  const options = {
    ...paymentOpts,
    handler: ({ razorpay_payment_id }) => {
      saveTransaction({
        ...userDetails.value,
        products: { connect },
        amount: Number(cartTotal.value),
        transactionId: razorpay_payment_id,
      });
    },
    modal: {
      ondismiss: () => {},
    },
  };
  // eslint-disable-next-line
  const razorPay = new Razorpay(options);
  razorPay.open();
};
</script>
