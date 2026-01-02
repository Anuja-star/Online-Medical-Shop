import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  MessageSquare,
  User,
  Building
} from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Phone className="text-blue-600" size={24} />,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
      description: "24/7 Customer Support"
    },
    {
      icon: <Mail className="text-green-600" size={24} />,
      title: "Email",
      details: ["support@medishop.com", "help@medishop.com"],
      description: "Response within 24 hours"
    },
    {
      icon: <MapPin className="text-purple-600" size={24} />,
      title: "Address",
      details: ["123 Medical Street", "Health City, HC 500001", "India"],
      description: "Visit our pharmacy"
    },
    {
      icon: <Clock className="text-amber-600" size={24} />,
      title: "Business Hours",
      details: ["Mon-Sat: 8AM - 10PM", "Sun: 9AM - 8PM"],
      description: "Emergency support available"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Have questions about medicines, prescriptions, or orders? We're here to help!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-xl p-6 flex items-center">
            <CheckCircle className="text-green-600 mr-3" size={24} />
            <div>
              <h3 className="font-semibold text-green-800">Message Sent Successfully!</h3>
              <p className="text-green-700">Our team will contact you within 24 hours.</p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="text-blue-600 mr-3" size={28} />
                <h2 className="text-2xl font-bold text-gray-900">Send us a Message</h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User size={16} className="inline mr-1" />
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail size={16} className="inline mr-1" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Phone size={16} className="inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      placeholder="10-digit mobile number"
                      maxLength="10"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Building size={16} className="inline mr-1" />
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                      <option value="">Select inquiry type</option>
                      <option value="order">Order Inquiry</option>
                      <option value="prescription">Prescription Help</option>
                      <option value="delivery">Delivery Issue</option>
                      <option value="medicine">Medicine Availability</option>
                      <option value="billing">Billing & Payment</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    placeholder="Describe your inquiry in detail..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all disabled:opacity-70 flex items-center justify-center shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <p className="text-sm text-gray-500 mt-6 text-center">
                We typically respond within 2-4 hours during business hours.
              </p>
            </div>
          </div>

          {/* Right - Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start mb-4">
                  <div className="p-3 bg-gray-50 rounded-lg mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-700">{detail}</p>
                  ))}
                </div>
              </div>
            ))}

            {/* Emergency Notice */}
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
              <h4 className="font-bold text-red-800 mb-3">⚠️ Medical Emergency?</h4>
              <p className="text-red-700 mb-4 text-sm">
                If this is a medical emergency requiring immediate attention, please contact:
              </p>
              <div className="space-y-3">
                <div className="bg-white border border-red-300 rounded-lg p-3">
                  <p className="font-bold text-red-700 text-center">Emergency Medical Services</p>
                  <p className="text-red-800 text-center text-2xl font-bold mt-1">108 / 102</p>
                </div>
                <p className="text-red-600 text-sm text-center">
                  Or visit the nearest hospital immediately
                </p>
              </div>
            </div>

            {/* Quick Response */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h4 className="font-bold text-blue-800 mb-3">Quick Response Channels</h4>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <Phone size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-blue-700">Call for Quick Help</p>
                    <p className="text-blue-600 text-sm">+91 1800-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <Mail size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-700">Email for Orders</p>
                    <p className="text-green-600 text-sm">orders@medishop.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;