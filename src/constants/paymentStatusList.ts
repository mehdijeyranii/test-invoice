import type { PaymentStatus } from "@/types";

export const paymentStatusLabels: Record<PaymentStatus, string> = {
  paid: "پرداخت شده",
  unpaid: "پرداخت نشده",
  pending: "در انتظار پرداخت",
};

export const paymentStatusList = Object.entries(paymentStatusLabels).map(
  ([value, label]) => ({
    value: value as PaymentStatus,
    label,
  })
);
