import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">About AffordableImportsKE</h1>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-700 mb-4">
            AffordableImportsKE was founded in 2018 with a simple mission: to provide Kenyans with access to quality imported products at affordable prices. What started as a small online store has grown into one of Kenya's most trusted e-commerce platforms for imported goods.
          </p>
          <p className="text-gray-700">
            We work directly with manufacturers and suppliers from around the world to eliminate middlemen and bring you genuine products at the best possible prices. Our team travels the globe to source unique, high-quality items that aren't readily available in the local market.
          </p>
          
          <div className="my-8 h-64 bg-gray-200 rounded-lg">
            {/* This would be replaced with an actual image in a real implementation */}
            <div className="h-full flex items-center justify-center text-gray-500">
              About Us Image
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-gray-700">
            We envision a Kenya where everyone has access to quality products from around the world without breaking the bank. We strive to be the go-to platform for affordable imports, offering an unmatched shopping experience with excellent customer service.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#e21a22] mb-2">10,000+</div>
              <p className="text-gray-600">Products Available</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#e21a22] mb-2">20,000+</div>
              <p className="text-gray-600">Happy Customers</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-[#e21a22] mb-2">45+</div>
              <p className="text-gray-600">Countries Sourced From</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8 mb-10">
          <h2 className="text-2xl font-semibold mb-6">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* This would be replaced with an actual team member image */}
              </div>
              <h3 className="font-semibold">John Kamau</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* This would be replaced with an actual team member image */}
              </div>
              <h3 className="font-semibold">Sarah Wanjiku</h3>
              <p className="text-gray-600">Operations Manager</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4">
                {/* This would be replaced with an actual team member image */}
              </div>
              <h3 className="font-semibold">David Omondi</h3>
              <p className="text-gray-600">Customer Relations</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="text-[#e21a22] mr-3">✓</div>
              <div>
                <strong>100% Authentic Products</strong> - We guarantee that all our products are genuine and sourced from reputable suppliers.
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-[#e21a22] mr-3">✓</div>
              <div>
                <strong>Competitive Pricing</strong> - We offer the best prices by cutting out middlemen and working directly with manufacturers.
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-[#e21a22] mr-3">✓</div>
              <div>
                <strong>Fast Nationwide Delivery</strong> - We deliver to all parts of Kenya within 2-5 business days.
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-[#e21a22] mr-3">✓</div>
              <div>
                <strong>Excellent Customer Service</strong> - Our dedicated support team is available 24/7 to assist you with any queries.
              </div>
            </li>
            <li className="flex items-start">
              <div className="text-[#e21a22] mr-3">✓</div>
              <div>
                <strong>Secure Payment Options</strong> - We offer multiple secure payment methods for your convenience.
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
