<template>
  <div
    class="h-[300px] w-[300px] border-solid border-[1px] border-[#e7e7e7] rounded-sm cursor-pointer relative shadow-md z-[10]"
  >
    <img
      v-if="viewAbleImage"
      :src="viewAbleImage"
      class="h-[300px] w-[300px] z-[50]"
    />
    <div
      class="absolute h-[300px] w-[300px] top-0 left-0 z-[80] file-input-wrapper"
    >
      <input
        type="file"
        @change="handleFileUpload"
        class="h-[300px] w-[300px] cursor-pointer z-[100] opacity-0"
      />
    </div>
    <Progress v-if="isUploading" :percent="progress" size="large" />
  </div>
</template>

<script setup>
import { defineProps, ref, computed, defineEmits, onMounted } from "vue";
import api from "@/services/api";
import { Progress } from "ant-design-vue";
import { useMutation } from "@vue/apollo-composable";
import { PublishAsset } from "@/gql/Asset";

const props = defineProps({
  src: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["change"]);

const file = ref(null);
const progress = ref(0);
const isUploading = ref(false);
const originalAssetId = ref(null);

const viewAbleImage = computed(() => {
  if (file.value) URL.createObjectURL(file.value);
  return props.src?.url || null;
});

const { mutate, onDone } = useMutation(PublishAsset, {
  clientId: "mApollo",
});

onDone(({ data }) =>
  emit("change", {
    ...data?.publishAsset,
    previousImage: originalAssetId.value,
  })
);

const fileUploader = async (file) => {
  try {
    isUploading.value = true;
    const formData = new FormData();
    formData.append("fileUpload", file);
    const { data } = await api.post("/upload", formData, {
      onUploadProgress: ({ loaded, total }) => {
        progress.value = Math.round((loaded / total) * 100);
      },
    });
    mutate({ id: data.id });
  } catch (err) {
    console.log("Upload Err", err);
  } finally {
    progress.value = 0;
    isUploading.value = false;
  }
};

const handleFileUpload = async ({ target: { files } }) => {
  if (files && files[0]) {
    file.value = files[0];
    await fileUploader(files[0]);
  }
};
onMounted(() => {
  originalAssetId.value = props.src.id;
});
</script>

<style scoped>
.file-input-wrapper:hover {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
