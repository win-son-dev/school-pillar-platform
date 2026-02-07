import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold">{t('footer.brand')}</h3>
            <p className="text-muted-foreground mt-2 text-sm">{t('footer.tagline')}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t('footer.explore')}</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <Link
                  href="/tutors"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {t('footer.findTutors')}
                </Link>
              </li>
              <li>
                <Link
                  href="/subjects"
                  className="text-muted-foreground hover:text-foreground text-sm"
                >
                  {t('footer.subjects')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground text-sm">
                  {t('footer.about')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">{t('footer.legal')}</h4>
            <ul className="mt-2 space-y-2">
              <li>
                <span className="text-muted-foreground text-sm">{t('footer.terms')}</span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">{t('footer.privacy')}</span>
              </li>
            </ul>
          </div>
        </div>
        <Separator className="my-8" />
        <p className="text-muted-foreground text-center text-sm">
          {t('footer.copyright', { year })}
        </p>
      </div>
    </footer>
  );
}
