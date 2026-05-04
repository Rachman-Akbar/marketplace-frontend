import { ShippingAddress } from "@/types/order";

type Props = {
  address: ShippingAddress;
};

export default function ShippingAddressBox({ address }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <h3 className="font-semibold text-gray-900">Alamat Pengiriman</h3>

      <div className="mt-3 space-y-1 text-sm text-gray-700">
        <p className="font-medium text-gray-900">{address.recipient_name}</p>
        <p>{address.phone}</p>
        <p>{address.address_line}</p>
        <p>
          {address.district}, {address.city}
        </p>
        <p>
          {address.province}, {address.postal_code}
        </p>

        {address.notes ? (
          <p className="pt-2 text-gray-500">Catatan: {address.notes}</p>
        ) : null}
      </div>
    </div>
  );
}