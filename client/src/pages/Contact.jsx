import React, { useState } from "react";
import { sendContactForm } from "../services/operations/contact";
import contact from "../assets/contact.jpg";
import { FaChevronDown } from "react-icons/fa";
const Contact = () => {
  const initialFormData = {
    name: "",
    email: "",
    contact: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await sendContactForm(formData);
    if (response?.data?.success) {
      setFormData(initialFormData);
    }
  };

  return (
    <>
      <div className="relative flex justify-center items-center">
        <img
          src={contact}
          alt="contact"
          className="w-full max-h-[85vh] object-cover"
        />

        <div className="absolute flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl text-white font-bold">
            Get in Touch with S.D Taxation Associate
          </h1>
          <FaChevronDown className="text-white text-3xl mt-4 animate-bounce" />
        </div>
      </div>

      <div className="w-11/12 mx-auto text-center flex flex-wrap gap-6 mt-12 justify-center">
        <div className="lg:w-[30%] w-full text-left">
          <h3 className="text-2xl font-semibold mb-4">Our Location</h3>
          <p className="text-lg">S.D Taxation Associate</p>
          <p className="text-lg">Address</p>
        </div>
        <div className="lg:w-[30%] w-full text-left">
          <h3 className="text-2xl font-semibold mb-4">Call Us</h3>
          <p className="text-lg">+91 9039150897 || +91 9993556791</p>
        </div>
        <div className="lg:w-[30%] w-full text-left">
          <h3 className="text-2xl font-semibold mb-4">Email Us</h3>
          <p className="text-lg">
            <a
              href="mailto:info@sd-taxation.com"
              className="text-blue-500 hover:underline"
            >
              sdtaxation@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between p-10 bg-gray-100 mt-10 rounded-xl">
        <div className="md:w-1/2 bg-white p-8 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Why Partner with S.D Taxation Associate?
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-700 space-y-3">
            <li>
              <strong>Expertise in Taxation:</strong> We offer professional
              advice on all taxation matters.
            </li>
            <li>
              <strong>Efficient Solutions:</strong> Timely, transparent, and
              effective taxation services.
            </li>
            <li>
              <strong>Tailored Strategies:</strong> Our services are customized
              to meet your business needs.
            </li>
            <li>
              <strong>Global Network:</strong> Partnering with leading experts
              and consultants across industries.
            </li>
            <li>
              <strong>Flexible Services:</strong> Choose services that fit your
              requirements.
            </li>
            <li>
              <strong>Customer First:</strong> We focus on building long-term
              relationships.
            </li>
          </ul>
        </div>

        <div className="md:w-1/2 bg-white p-10 rounded-lg shadow-lg mt-6 md:mt-0">
          <h2 className="text-3xl font-semibold mb-6 text-gray-800">
            Connect with Us
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Your Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="Enter your contact number"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn">
              <span>Submit</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
