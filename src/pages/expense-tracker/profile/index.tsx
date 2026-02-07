import { useState, useEffect } from 'react';
import { useAuth } from '@/store';
import Page from '@/components/helmet-page';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Calendar, Shield, Settings } from 'lucide-react';
import ProfileForm from './ProfileForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function Profile() {
  const { user } = useAuth();
  const [initials, setInitials] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (user?.fullName) {
      const names = user.fullName.split(' ');
      const initials = names
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
      setInitials(initials);
    }
  }, [user?.fullName]);

  if (!user) {
    return (
      <Page title="Profile">
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-500">Loading profile...</p>
        </div>
      </Page>
    );
  }

  const getStatusColor = (status: number) => {
    return status === 1
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getInitialAvatar = () => {
    if (user?.imgFullPath) {
      return user.imgFullPath;
    }
    if (user?.imageUrl) {
      return user.imageUrl;
    }
    return undefined;
  };

  return (
    <Page title="My Profile">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 ">
        {/* Profile Header Card */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 border-0 shadow-xl overflow-hidden mb-6">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Avatar Section */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-slate-800 shadow-lg">
                  <AvatarImage src={getInitialAvatar()} alt={user?.fullName} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white ${
                    user?.status === 1 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                ></div>
              </div>

              {/* User Info Section */}
              <div className="flex-1 text-white text-center md:text-left">
                <div className="mb-2">
                  <h1 className="text-4xl font-bold mb-1">{user?.fullName}</h1>
                  <p className="text-blue-100 text-lg">
                    {user?.role || 'User'}
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start">
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(user?.status || 0)} border-0`}
                  >
                    {user?.status === 1 ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-white/20 text-white border-0"
                  >
                    {user?.isVerified ? '✓ Verified' : 'Not Verified'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              icon: Mail,
              label: 'Email',
              value: user?.email || 'N/A'
            },
            {
              icon: Phone,
              label: 'Mobile',
              value: user?.mobile || 'N/A'
            },
            {
              icon: MapPin,
              label: 'Location',
              value: user?.city || user?.state || 'N/A'
            },
            {
              icon: Calendar,
              label: 'Member Since',
              value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : 'N/A'
            }
          ].map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <Card
                key={idx}
                className="p-4 hover:shadow-md transition-all duration-300 border-l-4 border-l-purple-500 dark:border-l-purple-400"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <IconComponent className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                      {item.label}
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Tabs Section */}
        <Card className="border border-purple-200 dark:border-purple-900/40 shadow-lg">
          <div className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-slate-800">
                <TabsTrigger
                  value="profile"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Profile</span>
                </TabsTrigger>
                <TabsTrigger
                  value="password"
                  className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 data-[state=active]:text-white"
                >
                  <Shield className="w-4 h-4" />
                  <span className="hidden sm:inline">Change Password</span>
                  <span className="sm:hidden">Password</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Update Your Profile
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Keep your profile information up to date
                  </p>
                </div>
                <ProfileForm user={user} />
              </TabsContent>

              <TabsContent value="password" className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    Change Your Password
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Keep your account secure with a strong password
                  </p>
                </div>
                <ChangePasswordForm />
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </div>
    </Page>
  );
}
