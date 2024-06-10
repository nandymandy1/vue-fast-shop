import { razorPayKey } from "@/constants";

const DEFAULT_PAYMENT_OPTS = {
  currency: "INR",
  config: {
    display: {
      blocks: {
        utib: {
          name: "Pay using Axis Bank",
          instruments: [
            {
              method: "card",
              issuers: ["UTIB"],
            },
            {
              method: "netbanking",
              banks: ["UTIB"],
            },
          ],
        },
        other: {
          name: "Other Payment modes",
          instruments: [
            {
              method: "card",
              issuers: ["ICIC"],
            },
            {
              method: "netbanking",
            },
            {
              method: "upi",
            },
          ],
        },
      },
      hide: [],
      sequence: ["block.utib", "block.other"],
      preferences: {
        show_default_blocks: false,
      },
    },
  },
};

export const prepareRazorPayOption = ({ price }, user = {}) => ({
  key: razorPayKey,
  amount: price.toString(),
  description: "Payment for Fast Cart",
  image:
    "https://yt3.googleusercontent.com/TGGP4pMPThUZAoWrFzAaI4HiGM5NV4_xYk23QNx_0fDkDHJO1_u8yMOVk6TGTVSwVzQ0xQuhwCM=s900-c-k-c0x00ffffff-no-rj",
  prefill: {
    ...user,
  },
  ...DEFAULT_PAYMENT_OPTS,
});
