import { Button } from '@/components/ui/button';
import { BuiltinThemePreset, COLOR_PRESETS } from '@/features/preferences';
import { Palette } from '@/icons';
import { useBuiltinType, usePreferencesStore } from '@/store/preferences';

function AuthenticationColorToggle() {
  const builtinType = useBuiltinType();
  const setTheme = usePreferencesStore((state) => state.setTheme);

  const handleSelect = (theme: BuiltinThemePreset) => {
    setTheme({ builtinType: theme.type });
  };

  return (
    <div className="group relative flex items-center overflow-hidden">
      <div className="flex w-0 overflow-hidden transition-all duration-500 ease-out group-hover:w-60">
        {COLOR_PRESETS.map((preset) => (
          <Button
            key={preset.color}
            className="flex-center flex-shrink-0"
            size="icon"
            variant="icon"
            onClick={() => handleSelect(preset)}
          >
            <div
              style={{ backgroundColor: preset.color }}
              className="flex-center relative size-5 rounded-full hover:scale-110"
            >
              {builtinType === preset.type && (
                <svg
                  className="h-3.5 w-3.5 text-white"
                  height="1em"
                  viewBox="0 0 15 15"
                  width="1em"
                >
                  <path
                    clipRule="evenodd"
                    d="M11.467 3.727c.289.189.37.576.181.865l-4.25 6.5a.625.625 0 0 1-.944.12l-2.75-2.5a.625.625 0 0 1 .841-.925l2.208 2.007l3.849-5.886a.625.625 0 0 1 .865-.181"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </Button>
        ))}
      </div>

      <Button size="icon" variant="icon">
        <Palette className="text-primary size-4" />
      </Button>
    </div>
  );
}

export default AuthenticationColorToggle;
