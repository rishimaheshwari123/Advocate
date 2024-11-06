import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="font-sans bg-gray-100">
      <section
        className="relative text-white py-24"
        style={{
          backgroundImage:
            'url("https://cms.ezylegal.in/wp-content/uploads/2022/06/difference-between-advocate-and-lawyer.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0 bg-black opacity-60"
          style={{
            zIndex: -1,
          }}
        ></div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome to S.D Taxation Associate
          </h1>
          <p className="mt-4 text-lg">
            Providing expert taxation services to individuals and businesses
          </p>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">About Us</h2>
          <p className="mt-4 text-lg text-gray-700">
            At S.D Taxation Associate, we specialize in providing top-notch
            taxation and consultancy services. With a team of expert
            professionals, we ensure that our clients receive comprehensive,
            personalized, and tax-efficient solutions. Whether you're an
            individual or a business, we are here to help you navigate complex
            tax regulations and optimize your tax strategy.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold">Our Services</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">Tax Filing</h3>
              <p className="mt-4 text-gray-600">
                We offer expert tax filing services for individuals and
                businesses to ensure compliance and optimize your tax
                liabilities.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">Tax Consultancy</h3>
              <p className="mt-4 text-gray-600">
                Our team of experts provides tailored advice to help you
                minimize your tax obligations while maximizing financial
                benefits.
              </p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-semibold">Business Taxation</h3>
              <p className="mt-4 text-gray-600">
                We specialize in helping businesses navigate corporate tax laws
                and create strategies that promote growth and minimize risk.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 text-center ">
          <h2 className="text-3xl font-semibold">Get in Touch</h2>
          <p className="mt-4 text-lg">
            Have any questions or need assistance? Contact us today!
          </p>
          <div
            className="mt-8 flex flex-col lg:flex-row
           justify-center space-x-6"
          >
            <div className="flex flex-col  items-center space-y-2">
              <h3 className="text-xl font-semibold">Call Us</h3>
              <div className="flex space-x-2">
                <Link
                  to="tel:+919039150897"
                  className="text-blue-600 hover:text-blue-800"
                >
                  +91 90391 50897
                </Link>
                <span className="text-xl text-gray-600">||</span>
                <Link
                  to="tel:+919993556791"
                  className="text-blue-600 hover:text-blue-800"
                >
                  +91 99935 56791
                </Link>
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-xl font-semibold">Email Us</h3>
              <Link
                to="mailto:sdtaxation@gmail.com"
                className="text-blue-600 hover:text-blue-800"
              >
                sdtaxation@gmail.com
              </Link>
            </div>

            {/* Address */}
            <div className="flex flex-col items-center space-y-2">
              <h3 className="text-xl font-semibold">Address</h3>
              <span className="text-gray-600">
                S.D Taxation Associate, Main St.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
