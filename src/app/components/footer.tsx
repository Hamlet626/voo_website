export default function Footer() {
    return (
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Terms of Service */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Terms of Service</h3>
              <p className="text-gray-400 text-sm">
                By using our services, you agree to our terms. Learn more about your rights and responsibilities.
              </p>
              <a href="https://voo-pro.web.app/terms-of-service" className="text-green-400 hover:text-green-300 inline-block mt-2">
                Read More →
              </a>
            </div>
  
            {/* Privacy Policy */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Privacy Policy</h3>
              <p className="text-gray-400 text-sm">
                Your privacy is important to us. Read how we protect and use your data responsibly.
              </p>
              <a href="https://voo-pro.web.app/privacy-policy" className="text-green-400 hover:text-green-300 inline-block mt-2">
                Read More →
              </a>
            </div>
  
            {/* Contact Us */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
              <p className="text-gray-400 text-sm">
                Have questions? We're here to help! Reach out to our support team.
              </p>
              <a href="https://voo-pro.web.app/support" className="text-green-400 hover:text-green-300 inline-block mt-2">
                Get in Touch →
              </a>
            </div>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-700 my-6"></div>
  
          {/* Copyright */}
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} Voo Dev LLC. All Rights Reserved.
          </p>
        </div>
      </footer>
    );
  }
  