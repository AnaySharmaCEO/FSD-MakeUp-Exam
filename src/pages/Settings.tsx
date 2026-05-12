import { Settings as SettingsIcon, Palette, Shield, Layout, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../app/components/ui/card';
import { Label } from '../app/components/ui/label';
import { Switch } from '../app/components/ui/switch';
import { useTheme, ThemeType, AccentColor, getAccentClasses } from '../context/ThemeContext';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function Settings() {
  const { theme, setTheme, accentColor, setAccentColor, kidsMode, toggleKidsMode } = useTheme();
  const accentClasses = getAccentClasses(accentColor);

  const themes: { value: ThemeType; label: string; description: string }[] = [
    { value: 'dark', label: 'Dark Mode', description: 'Classic dark theme' },
    { value: 'light', label: 'Light Mode', description: 'Bright and clean' },
    { value: 'cinematic', label: 'Cinematic', description: 'Netflix-style experience' },
    { value: 'minimal', label: 'Minimal', description: 'Clean and simple' },
    { value: 'kids', label: 'Kids Theme', description: 'Colorful and fun' }
  ];

  const colors: { value: AccentColor; label: string; class: string }[] = [
    { value: 'red', label: 'Red', class: 'bg-red-500' },
    { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
    { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
    { value: 'emerald', label: 'Emerald', class: 'bg-emerald-500' },
    { value: 'gold', label: 'Gold', class: 'bg-yellow-500' }
  ];

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme}`);
  };

  const handleAccentChange = (color: AccentColor) => {
    setAccentColor(color);
    toast.success(`Accent color changed to ${color}`);
  };

  const handleKidsModeToggle = () => {
    toggleKidsMode();
    toast.success(kidsMode ? 'Kids Mode disabled' : 'Kids Mode enabled');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Settings</h1>
          <p className="text-slate-400">Customize your movie experience</p>
        </div>

        <div className="space-y-6">
          {/* Kids Mode */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  Kids Mode
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Enable a safe, family-friendly browsing experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="kids-mode" className="text-slate-300 text-base">
                      {kidsMode ? 'Kids Mode is ON' : 'Kids Mode is OFF'}
                    </Label>
                    <p className="text-sm text-slate-500 mt-1">
                      {kidsMode
                        ? 'Showing only G, PG, and PG-13 rated family content'
                        : 'All content is visible'}
                    </p>
                  </div>
                  <Switch
                    id="kids-mode"
                    checked={kidsMode}
                    onCheckedChange={handleKidsModeToggle}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Theme Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Layout className="w-5 h-5" />
                  Theme
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Choose your preferred visual theme
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {themes.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => handleThemeChange(t.value)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        theme === t.value
                          ? `${accentClasses.border} bg-slate-800`
                          : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                      }`}
                    >
                      <div className="font-semibold text-white mb-1">{t.label}</div>
                      <div className="text-sm text-slate-400">{t.description}</div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Accent Color */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Palette className="w-5 h-5" />
                  Accent Color
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Personalize your app with your favorite color
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => handleAccentChange(color.value)}
                      className={`relative w-16 h-16 rounded-full ${color.class} transition-transform hover:scale-110 ${
                        accentColor === color.value ? 'ring-4 ring-white' : ''
                      }`}
                      title={color.label}
                    >
                      {accentColor === color.value && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-4 h-4 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications (Mock) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 text-base">Recommendation Alerts</Label>
                      <p className="text-sm text-slate-500 mt-1">Get notified about new recommendations</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 text-base">Watch Reminders</Label>
                      <p className="text-sm text-slate-500 mt-1">Reminders for movies in your watchlist</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 text-base">Favorites Updates</Label>
                      <p className="text-sm text-slate-500 mt-1">Updates about your favorite movies</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
