import { LangSwitch } from '@/features/lang';
import { ThemeModeSwitch } from '@/features/theme';
import { cn } from '@/lib/utils';
import AuthenticationColorToggle from '../color-toggle';

const toolbarList = ['color', 'language', 'layout', 'theme'];
const preferences = { widget: { languageToggle: true, themeToggle: true } };

function AuthenticationToolbar() {
  const showColor = toolbarList.includes('color');
  const showLanguage = toolbarList.includes('language');
  const showTheme = toolbarList.includes('theme');
  return (
    <div
      className={cn(
        { 'rounded-3xl bg-accent px-3 py-1': toolbarList.length > 1 },
        'flex-center absolute right-2 top-4 z-10',
      )}
    >
      {/* Only show on medium and larger screens */}
      <div className="hidden md:flex">
        {showColor && <AuthenticationColorToggle />}
      </div>
      {/* Always show Language and Theme toggles */}
      {showLanguage && preferences.widget.languageToggle && <LangSwitch />}
      {showTheme && preferences.widget.themeToggle && <ThemeModeSwitch />}
    </div>
  );
}

export default AuthenticationToolbar;
