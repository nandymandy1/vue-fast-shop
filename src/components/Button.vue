<template>
  <button
    :disabled="disabled"
    :class="[
      fixedClasses,
      variantClass,
      typeClass,
      disabled ? 'opacity-50 pointer-events-none' : '',
      block ? 'w-full flex justify-center' : '',
    ]"
  >
    <slot name="prefix"></slot>
    <span>{{ label }}</span>
    <slot name="suffix"></slot>
  </button>
</template>

<script>
export default {
  name: "DynamicButton",
  data: () => ({
    fixedClasses:
      "inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border",
  }),
  props: {
    label: {
      type: String,
      required: true,
    },
    block: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator(value) {
        return ["primary", "danger", "success", "warning", "info"].includes(
          value
        );
      },
    },
    type: {
      type: String,
      default: "filled",
      validator(value) {
        return ["outlined", "text", "filled"].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    variantClass() {
      const variants = {
        primary:
          "text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-400",
        danger:
          "text-red-600 hover:text-red-800 dark:text-red-500 dark:hover:text-red-400",
        success:
          "text-green-600 hover:text-green-800 dark:text-green-500 dark:hover:text-green-400",
        warning:
          "text-orange-600 hover:text-orange-800 dark:text-orange-500 dark:hover:text-orange-400",
        info: "text-light-blue-600 hover:text-light-blue-800 dark:text-light-blue-500 dark:hover:text-light-blue-400",
      };
      return variants[this.variant];
    },
    typeClass() {
      const types = {
        filled: "bg-transparent border-transparent",
        outlined:
          "bg-transparent rounded-[2px] px-4 py-2 border-solid border-[1px] border-current",
        text: "bg-transparent border-none",
      };
      return types[this.type];
    },
  },
};
</script>
