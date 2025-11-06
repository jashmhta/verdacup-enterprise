'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrder } from '@/app/actions/orders';

export default function CheckoutForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shippingName: '',
    shippingPhone: '',
    shippingEmail: '',
    shippingAddress: '',
    shippingCity: '',
    shippingState: '',
    shippingPincode: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = await createOrder(formData);

    if (result.success) {
      router.push(`/orders?success=true&orderId=${result.orderId}`);
    } else {
      alert(result.error || 'Failed to create order');
      setIsSubmitting(false);
    }
  };

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
    'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
    'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
  ];

  return (
    <form onSubmit={handleSubmit} className="bg-card rounded-lg p-6 shadow-sm space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="shippingName" className="block text-sm font-medium mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="shippingName"
              name="shippingName"
              value={formData.shippingName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="shippingPhone" className="block text-sm font-medium mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="shippingPhone"
              name="shippingPhone"
              value={formData.shippingPhone}
              onChange={handleChange}
              required
              pattern="[0-9]{10}"
              placeholder="10-digit mobile number"
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="shippingEmail" className="block text-sm font-medium mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="shippingEmail"
              name="shippingEmail"
              value={formData.shippingEmail}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="shippingAddress" className="block text-sm font-medium mb-2">
              Street Address *
            </label>
            <input
              type="text"
              id="shippingAddress"
              name="shippingAddress"
              value={formData.shippingAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="shippingCity" className="block text-sm font-medium mb-2">
              City *
            </label>
            <input
              type="text"
              id="shippingCity"
              name="shippingCity"
              value={formData.shippingCity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="shippingState" className="block text-sm font-medium mb-2">
              State *
            </label>
            <select
              id="shippingState"
              name="shippingState"
              value={formData.shippingState}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            >
              <option value="">Select State</option>
              {indianStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="shippingPincode" className="block text-sm font-medium mb-2">
              Pincode *
            </label>
            <input
              type="text"
              id="shippingPincode"
              name="shippingPincode"
              value={formData.shippingPincode}
              onChange={handleChange}
              required
              pattern="[0-9]{6}"
              placeholder="6-digit pincode"
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label htmlFor="notes" className="block text-sm font-medium mb-2">
              Order Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border-2 border-input bg-background focus:border-primary focus:outline-none"
              placeholder="Any special instructions for your order..."
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  );
}
