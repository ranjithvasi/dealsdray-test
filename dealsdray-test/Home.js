import React from "react";
import PageTitleNavbar from "./PageTitleNavbar";
import MainNavbar from "./MainNavbar";

import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <MainNavbar /> {/* Show the main navigation */}
      <PageTitleNavbar pageTitle="Home" /> {/* Display page name */}
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Efficient Logistics and Supply Chain Solutions
            </h1>
            <p className="text-lg mb-6">
              Dealsdray offers a comprehensive suite of logistics and supply
              chain services designed to streamline your business operations.
              Get in touch today to optimize your processes!
            </p>
            <Link
              to="/services"
              className="bg-white text-blue-600 font-bold py-2 px-4 rounded"
            >
              Explore Services
            </Link>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0"></div>
        </div>
      </section>
      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Warehouse Management</h3>
              <p>
                Efficiently manage your inventory with our advanced warehouse
                solutions. We provide seamless tracking, storage, and
                distribution.
              </p>
            </div>
            {/* Service 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Last-Mile Delivery</h3>
              <p>
                Deliver products to your customers quickly and reliably. Our
                last-mile delivery solutions ensure timely and secure
                deliveries.
              </p>
            </div>
            {/* Service 3 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">
                Supply Chain Optimization
              </h3>
              <p>
                Optimize your supply chain for cost-efficiency and speed. Our
                expert team helps streamline processes from procurement to
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Dealsdray?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Real-Time Tracking</h3>
              <p>
                Monitor your shipments with real-time GPS tracking and ensure
                transparency at every stage of the delivery process.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Scalable Solutions</h3>
              <p>
                Whether you're a small business or a large enterprise, our
                solutions scale to meet your needs as you grow.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">24/7 Customer Support</h3>
              <p>
                Our dedicated support team is available around the clock to
                assist with any issues or questions you may have.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-blue-600 text-white py-6">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Dealsdray. All Rights Reserved.
          </p>
          <div className="space-x-4 mt-4">
            <Link to="/privacy" className="text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
