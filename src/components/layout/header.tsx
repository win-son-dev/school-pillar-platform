import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from './language-switcher';

export function Header() {
  const t = useTranslations();

  return (
    <header className="border-b">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-xl font-bold">
            {t('footer.brand')}
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/tutors"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t('nav.findTutors')}
            </Link>
            <Link
              href="/subjects"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t('nav.subjects')}
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
            >
              {t('nav.about')}
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
