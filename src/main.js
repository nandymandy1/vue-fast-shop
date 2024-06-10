import router from "@/router";
import apolloClientQ from "@/services/qApollo";
import apolloClientM from "@/services/mApollo";
import store from "@/store";
import { ApolloClients } from "@vue/apollo-composable";
import { createApp, h, provide } from "vue";
import PhosphorIcons from "@phosphor-icons/vue";

import App from "./App.vue";

import "@/assets/style.css";

const app = createApp({
  setup() {
    provide(PhosphorIcons);
    provide(ApolloClients, {
      default: apolloClientQ,
      mApollo: apolloClientM,
    });
  },
  render: () => h(App),
});

app.use(store);
app.use(router);
app.mount("#app");
