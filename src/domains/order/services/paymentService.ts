import { api, getAxiosErrorMessage } from "@/lib/axios";

export type MidtransPayment = {
  order_id: string;
  snap_token: string | null;
  redirect_url: string | null;
};

type CreateMidtransPaymentResponse = {
  message: string;
  data: {
    order_number: string;
    payment: MidtransPayment;
  };
};

export async function createMidtransPayment(
  orderNumber: string,
): Promise<MidtransPayment> {
  try {
    const response = await api.post<CreateMidtransPaymentResponse>(
      `/orders/${encodeURIComponent(orderNumber)}/pay/midtrans`,
      {},
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    return response.data.data.payment;
  } catch (error) {
    throw new Error(
      getAxiosErrorMessage(error, "Gagal membuat pembayaran Midtrans."),
    );
  }
}