import { FaChalkboardTeacher, FaBroom, FaTruck, FaBabyCarriage, FaCar, FaDog, FaTools } from "react-icons/fa"; // Add more icons if needed
import { FaFootball } from "react-icons/fa6";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {/* Service 1 - Mobile Auto Care */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaCar className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Auto Mobile</h3>
            <p className="text-gray-600">
              Whether it's routine maintenance or an emergency repair, our mobile auto services bring the mechanic to you, making car care more convenient than ever.
            </p>
          </div>
          {/* Service 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaChalkboardTeacher className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Coaching</h3>
            <p className="text-gray-600">
              Personalized coaching for sports, fitness, career growth, and more — helping you reach your goals.
            </p>
          </div>
          {/* Service 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaBroom className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Housekeeping</h3>
            <p className="text-gray-600">
              Our trusted housekeeping services will make your home shine. Enjoy a cleaner, more organized space with ease.
            </p>
          </div>
          {/* Service 4 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaTruck className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Delivery</h3>
            <p className="text-gray-600">
              Fast, reliable, and professional delivery services for packages of all sizes.
            </p>
          </div>
          {/* Service 5- Handyman Services */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaTools className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Handyman Services</h3>
            <p className="text-gray-600">
              From minor repairs to home improvement, our handymen will fix anything. Get the job done right with skilled professionals at your service.
            </p>
          </div>
          {/* Service 6 - Pet */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="mb-4">
              <FaDog className="text-4xl text-green-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Pet Services</h3>
            <p className="text-gray-600">
              From pet grooming to sitting, we provide top-quality care for your furry friends, ensuring they stay happy and healthy when you're away.
            </p>
          </div>

        </div>

        {/* "See More" Section */}
        <div className="mt-12">
          <a
            href="#"
            className="inline-block bg-green-500 text-white text-lg py-3 px-6 rounded-full hover:bg-green-600 transition duration-300"
          >
            See More Services
          </a>
        </div>
      </div>
    </section>
  );
}