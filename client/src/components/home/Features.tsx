import { Truck, Shield, Headphones } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-[#e21a22] text-4xl mb-4 flex justify-center">
              <Truck size={48} />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">We deliver all across Kenya within 2-5 business days.</p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-[#e21a22] text-4xl mb-4 flex justify-center">
              <Shield size={48} />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">Genuine Products</h3>
            <p className="text-gray-600">All our products are 100% authentic and quality checked.</p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-[#e21a22] text-4xl mb-4 flex justify-center">
              <Headphones size={48} />
            </div>
            <h3 className="font-sans font-semibold text-xl mb-2">24/7 Customer Support</h3>
            <p className="text-gray-600">Our customer service team is available round the clock.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
