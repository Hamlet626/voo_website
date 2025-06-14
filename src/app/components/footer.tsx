
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Terms */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('terms.title')}</h3>
            <p className="text-gray-400 text-sm">{t('terms.description')}</p>
            <a href="https://voo-pro.web.app/terms-of-service" className="text-green-400 hover:text-green-300 inline-block mt-2">
              {t('terms.linkText')}
            </a>
          </div>

          {/* Privacy */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('privacy.title')}</h3>
            <p className="text-gray-400 text-sm">{t('privacy.description')}</p>
            <a href="https://voo-pro.web.app/privacy-policy" className="text-green-400 hover:text-green-300 inline-block mt-2">
              {t('privacy.linkText')}
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">{t('contact.title')}</h3>
            <p className="text-gray-400 text-sm">{t('contact.description')}</p>
            <a href="https://voo-pro.web.app/support" className="text-green-400 hover:text-green-300 inline-block mt-2">
              {t('contact.linkText')}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <p className="text-sm text-gray-500 text-center">
          {t('copyright',{year})}
        </p>
      </div>
    </footer>
  );
  }
  