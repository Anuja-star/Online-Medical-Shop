// AboutPage.js
import React from 'react';
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Truck, 
  Leaf, 
  Star, 
  Target,
  CheckCircle,
  Globe,
  Package,
  Clock,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Dr. Sarah Chen',
      role: 'Chief Nutritionist',
      bio: 'PhD in Nutritional Sciences with 15+ years of clinical experience',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Quality Assurance Director',
      bio: 'Former pharmaceutical executive specializing in supplement safety',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w-400&h=400&fit=crop'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Research Director',
      bio: 'Published researcher in clinical nutrition and supplement efficacy',
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop'
    },
    {
      name: 'Lisa Park',
      role: 'Customer Wellness Coach',
      bio: 'Certified nutrition coach with focus on holistic health approaches',
      image: 'https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop'
    }
  ];

  const milestones = [
    { year: '2015', event: 'Founded with a vision for transparent nutrition' },
    { year: '2017', event: 'Opened first GMP-certified manufacturing facility' },
    { year: '2019', event: 'Served 10,000+ customers nationwide' },
    { year: '2021', event: 'Launched personalized supplement consultation service' },
    { year: '2023', event: 'Expanded to international markets' },
    { year: '2024', event: 'Achieved 50,000+ satisfied customers' }
  ];

  const values = [
    {
      icon: <Shield className="text-blue-600" size={28} />,
      title: 'Quality & Safety',
      description: 'All products are third-party tested and manufactured in GMP-certified facilities'
    },
    {
      icon: <Leaf className="text-green-600" size={28} />,
      title: 'Natural Ingredients',
      description: 'We use only clean, bioavailable ingredients without unnecessary additives'
    },
    {
      icon: <Target className="text-purple-600" size={28} />,
      title: 'Science-Backed',
      description: 'Every formulation is based on clinical research and nutritional science'
    },
    {
      icon: <Users className="text-amber-600" size={28} />,
      title: 'Personalized Care',
      description: 'Individualized recommendations based on your unique health needs'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering Your Health Journey
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl">
                We're more than a supplement company - we're your partner in achieving optimal health through science-backed nutrition and personalized care.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                  Meet Our Team
                </button>
                <button className="px-8 py-3 bg-blue-500/30 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-blue-500/40 transition-all border border-white/20">
                  Watch Our Story
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 transform rotate-3">
                <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl p-8 transform -rotate-3 shadow-2xl">
                  <Heart className="w-24 h-24 mx-auto text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Award className="text-green-600" size={28} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">5,000+</p>
                    <p className="text-gray-600">5-Star Reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">The Vitality Nutrition Story</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Founded in 2015, we started with a simple mission: to provide pure, effective supplements that actually work. 
            Today, we've grown into a trusted health partner for thousands worldwide.
          </p>
        </div>

        <div className="relative">
          {/* Timeline */}
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-green-500"></div>
          
          <div className="space-y-12 lg:space-y-0">
            {milestones.map((milestone, index) => (
              <div key={index} className={`flex flex-col lg:flex-row items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={`lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                  <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold mb-4">
                      <Star size={14} />
                      {milestone.year}
                    </div>
                    <p className="text-xl text-gray-800">{milestone.event}</p>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center my-8 lg:my-0">
                  <div className="w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                </div>
                <div className="lg:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Values */}
      <div className="bg-gradient-to-b from-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product formulation to customer service
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="p-4 bg-gray-50 rounded-xl w-fit mb-6">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Meet the Team */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold mb-4">
            Our Experts
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Meet Our Health Experts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of certified nutritionists, researchers, and health professionals are dedicated to your wellness
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <button className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Assurance */}
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
                Our Promise
              </span>
              <h2 className="text-4xl font-bold mb-6">Uncompromising Quality Standards</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-400 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Third-Party Testing</h4>
                    <p className="text-gray-300">Every batch is independently tested for purity and potency</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-400 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">GMP Certified Facilities</h4>
                    <p className="text-gray-300">Manufactured in facilities meeting pharmaceutical standards</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="text-green-400 mt-1" size={24} />
                  <div>
                    <h4 className="text-xl font-semibold mb-2">Transparent Labeling</h4>
                    <p className="text-gray-300">No hidden ingredients or proprietary blends</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Package className="w-12 h-12 text-blue-400 mb-4" />
                <p className="text-3xl font-bold">50,000+</p>
                <p className="text-gray-300">Products Delivered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Globe className="w-12 h-12 text-green-400 mb-4" />
                <p className="text-3xl font-bold">15+</p>
                <p className="text-gray-300">Countries Served</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Clock className="w-12 h-12 text-amber-400 mb-4" />
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-gray-300">Support Available</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <Truck className="w-12 h-12 text-purple-400 mb-4" />
                <p className="text-3xl font-bold">99.8%</p>
                <p className="text-gray-300">On-Time Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Have Questions About Your Health?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our certified nutritionists are here to provide personalized recommendations
          </p>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm">
              <Phone className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Call Us</p>
                <p className="text-lg font-semibold text-gray-900">1-800-HEALTH-123</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm">
              <Mail className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Email Us</p>
                <p className="text-lg font-semibold text-gray-900">support@vitalitynutrition.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 bg-white px-6 py-4 rounded-xl shadow-sm">
              <MapPin className="text-blue-600" size={20} />
              <div className="text-left">
                <p className="text-sm text-gray-500">Visit Us</p>
                <p className="text-lg font-semibold text-gray-900">123 Wellness St, Health City</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-green-700 transition-all shadow-lg hover:shadow-xl">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;