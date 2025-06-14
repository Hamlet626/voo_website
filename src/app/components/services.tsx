import { useTranslations } from "next-intl";
import { FaChalkboardTeacher, FaBroom, FaTruck, FaBabyCarriage, FaCar, FaDog, FaTools } from "react-icons/fa"; // Add more icons if needed
import { FaFootball } from "react-icons/fa6";


const iconMap = [
  <FaCar key={1} className="text-4xl text-green-500 mx-auto mb-4" />,
  <FaChalkboardTeacher key={2} className="text-4xl text-green-500 mx-auto mb-4" />,
  <FaBroom key={3} className="text-4xl text-green-500 mx-auto mb-4" />,
  <FaTruck key={4} className="text-4xl text-green-500 mx-auto mb-4" />,
  <FaTools key={5} className="text-4xl text-green-500 mx-auto mb-4" />,
  <FaDog key={6} className="text-4xl text-green-500 mx-auto mb-4" />
];


export default function ServicesSection() {
  const t = useTranslations('Services');
  const services = t.raw('items') as { title: string; description: string }[];
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-8">{t('title')}</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="mb-4">{iconMap[index]}</div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <a
            href="#"
            className="inline-block bg-green-500 text-white text-lg py-3 px-6 rounded-full hover:bg-green-600 transition duration-300"
          >
            {t('seeMore')}
          </a>
        </div>
      </div>
    </section>
  );
}