import HeadRoom from 'react-headroom';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Menu,
  Settings,
  HomeIcon,
  LogOutIcon,
  ArrowLeft,
  Bell,
  BotIcon,
  Wallet,
  Clock,
  UserRound,
  BookOpenText,
  CalendarDays,
  CreditCard,
  GraduationCap,
  Book,
  Calendar
} from 'lucide-react';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger
} from '@/components/ui/menubar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useStore } from '@/store';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useState } from 'react';
import { BASE_URI } from '@/lib';
import { Image } from '../image';

const SideBar = [
  {
    icon: Home,
    label: 'Home',
    path: '/lms-app',
    role: ['Student', 'Faculty']
  },
  {
    icon: Wallet,
    label: 'Fee Details',
    path: '/lms-app/student/payment',
    role: ['Student']
  },
  {
    icon: CreditCard,
    label: 'Payment History',
    path: '/lms-app/student/payment-history',
    role: ['Student']
  },
  {
    icon: CalendarDays,
    label: 'Routine',
    path: '/lms-app/student/time-table',
    role: ['Student']
  },
  {
    icon: Clock,
    label: 'Attendance',
    path: '/lms-app/student/attendance-list',
    role: ['Student']
  },
  {
    icon: BookOpenText,
    label: 'Library',
    path: '/lms-app/student/library-home',
    role: ['Student']
  },
  {
    icon: UserRound,
    label: 'My Details',
    path: '/lms-app/student/details',
    role: ['Student']
  },
  {
    icon: Clock,
    label: 'Attendance',
    path: '/lms-app/faculty/create-attendance',
    role: ['Faculty']
  },
  // faculty Classes
  {
    icon: Book,
    label: 'Classes',
    path: '/lms-app/faculty/faculty-class',
    role: ['Faculty']
  },
  {
    icon: Calendar,
    label: 'Schedules',
    path: '/lms-app/faculty/schedule-faculty',
    role: ['Faculty']
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/lms-app/profile',
    role: ['Student', 'Faculty']
  }
  // faculty attendance
];

export default function SideBarMenu({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getTitle, logout, user } = useStore();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const equalPath = ['/lms-app/student/home', '/lms-app/faculty/home'];
  const isHomePage = equalPath?.includes(pathname);
  // const schoolName = localStorage.getItem('schoolName') ?? 'My School';

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsSheetOpen(false); // Close the sheet when navigating
  };

  const handleLogout = () => {
    logout();
    setIsSheetOpen(false); // Close the sheet when logging out
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-50 dark:bg-gray-900">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col bg-gradient-to-b from-primary to-primary-foreground/90 backdrop-blur-sm sm:flex">
        <nav className="flex flex-col items-center gap-6 px-2 py-8">
          <Link
            to="#"
            className="group flex h-12 w-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white text-lg font-semibold text-primary shadow-md transition-all hover:shadow-lg md:h-10 md:w-10 md:text-base"
          >
            <GraduationCap className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">School App</span>
          </Link>

          <div className="w-full pt-4">
            {SideBar.map((item, index) => (
              <Tooltip key={index + 1}>
                <TooltipTrigger asChild>
                  <Link
                    to={item.path}
                    className={`my-4 flex h-12 w-12 items-center justify-center rounded-xl transition-all hover:bg-white/20 md:h-10 md:w-10 ${
                      pathname === item.path
                        ? 'bg-white/20 text-white'
                        : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="sr-only">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="font-medium">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </nav>
      </aside>

      <div className="flex flex-col sm:pl-16">
        <HeadRoom>
          <header className="flex h-14 items-center gap-4 px-4 sm:px-6 bg-gradient-to-r from-primary to-primary/90 shadow-none">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              {/* Avatar menu */}
              {/* {isHomePage && (
                  <Button
                    size="icon"
                    variant="secondary"
                    className="sm:hidden rounded-full shadow-sm"
                  >
                    <Menu className="w-5 h-5 text-primary" />
                    <span className="sr-only">Menu</span>
                  </Button>
                )} */}
              {isHomePage && (
                <Menubar className="border-none shadow-none bg-transparent">
                  <MenubarMenu>
                    <MenubarTrigger className="rounded-full transition-transform hover:scale-105 p-0.5">
                      <Avatar className="h-10 w-10 border-2 border-white/30 shadow-sm">
                        <AvatarImage
                          src={`${BASE_URI}/${localStorage.getItem(
                            'schoolLogo'
                          )}`}
                          alt={localStorage.getItem('schoolLogo') || 'User'}
                        />
                        <AvatarFallback className="bg-white/10 text-white font-bold">
                          {localStorage.getItem('schoolLogo')?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </MenubarTrigger>
                    <MenubarContent className="rounded-xl shadow-lg border-none min-w-48">
                      <div className="px-4 py-3 bg-primary/5 rounded-t-xl">
                        <p className="font-bold text-primary">
                          {user?.fullName || 'User'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user?.role}
                        </p>
                      </div>
                      <MenubarSeparator />
                      <MenubarItem
                        className="flex items-center py-2 cursor-pointer"
                        onClick={() => navigate('/lms-app')}
                      >
                        <HomeIcon className="h-4 w-4 mr-3" />
                        <span className="font-medium">Home</span>
                      </MenubarItem>
                      <Link to={'/lms-app/notification'}>
                        <MenubarItem className="flex items-center py-2 cursor-pointer">
                          <Bell className="h-4 w-4 mr-3" />
                          <span className="font-medium">Notifications</span>
                          {/* <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                            2
                          </span> */}
                        </MenubarItem>
                      </Link>
                      <Link to={'/lms-app/profile'}>
                        <MenubarItem className="flex items-center py-2 cursor-pointer">
                          <Settings className="h-4 w-4 mr-3" />
                          <span className="font-medium">Settings</span>
                        </MenubarItem>
                      </Link>
                      <MenubarSeparator />
                      <MenubarItem
                        className="flex items-center py-2 cursor-pointer text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={() => logout()}
                      >
                        <LogOutIcon className="h-4 w-4 mr-3" />
                        <span className="font-medium">Logout</span>
                      </MenubarItem>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )}

              <SheetContent
                side="left"
                className="sm:max-w-xs rounded-r-2xl border-none bg-white"
              >
                <nav className="grid gap-6 text-lg font-medium">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 h-12 w-12 rounded-full shrink-0 flex items-center justify-center text-gray-500 font-bold text-lg">
                      <Image
                        src={`${BASE_URI}/${localStorage.getItem(
                          'schoolLogo'
                        )}`}
                        className="h-12 w-12 rounded-full border-2 border-gray-400"
                        alt="Profile Pic"
                      />
                      {/* {user?.fullName[0] ?? 'S'} */}
                    </div>
                    <div>
                      {/* <div className="font-bold text-lg">{schoolName}</div>
                      <div className="text-xs text-muted-foreground">
                        My School
                      </div> */}
                      <div className="font-bold text-sm text-primary">
                        {/* {user?.fullName || 'Student Name'} */}
                        {localStorage.getItem('schoolName')}
                      </div>
                      {/* <div className="text-xs text-muted-foreground">
                        {user?.role}
                      </div> */}
                    </div>
                  </div>
                  <Separator />

                  <div className="mt-4">
                    {/* <div className="flex items-center gap-3 px-2 mb-4">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage
                          src={user?.imgFullPath}
                          alt={user?.fullName || 'User'}
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                          {user?.fullName?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm line-clamp-1">
                          {user?.fullName || 'Student Name'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {user?.role}
                        </div>
                      </div>
                    </div> */}

                    {/* {SideBar.map((item, index) => (
                      <div
                        key={index + 1}
                        onClick={() => handleNavigate(item.path)}
                        className={`flex items-center gap-4 px-3 py-3 rounded-xl text-base transition-all hover:bg-primary/10 hover:text-primary ${
                          pathname === item.path
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        {item.label}
                      </div>
                    ))} */}

                    {SideBar.filter((item) =>
                      item.role.includes(user?.role ?? '')
                    ).map((itm, index) => (
                      <div
                        key={index + 1}
                        onClick={() => handleNavigate(itm.path)}
                        className={`flex items-center gap-4 px-3 py-3 rounded-xl text-base transition-all hover:bg-primary/10 hover:text-primary ${
                          pathname === itm.path
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-muted-foreground'
                        }`}
                      >
                        <itm.icon className="h-5 w-5" />
                        {itm.label}
                      </div>
                    ))}

                    {/* ai assesist button */}
                    <Link
                      to="/lms-app/chat-box"
                      className="flex items-center gap-4 px-3 py-3 rounded-xl text-base transition-all hover:bg-primary/10 hover:text-primary text-muted-foreground"
                    >
                      <BotIcon className="h-5 w-5" /> AI Assistant
                    </Link>

                    <Button
                      onClick={handleLogout}
                      className="w-full mt-6 rounded-xl font-medium"
                      variant="destructive"
                    >
                      <LogOutIcon className="h-5 w-5 mr-2" />
                      Logout
                    </Button>
                  </div>
                </nav>
              </SheetContent>
              {!isHomePage && (
                <button
                  className="text-white/90 hover:text-white transition-colors"
                  onClick={() => window.history.back()}
                >
                  <ArrowLeft className="h-6 w-6" />
                </button>
              )}

              <div className="flex-1">
                <div className="flex justify-center">
                  <h1 className="font-bold text-lg tracking-tight text-white w-52 truncate text-center">
                    {isHomePage ? user?.fullName ?? 'No name' : getTitle}
                  </h1>
                </div>
                {/* <h1 className="font-bold text-base tracking-tight text-white truncate text-center">
                  {isHomePage ? schoolName : getTitle}
                  
                </h1> */}
                {/* {isHomePage && (
                  <p className="text-xs font-medium text-white/80">My School</p>
                )} */}
              </div>

              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="secondary"
                  className="sm:hidden rounded-lg shadow-sm bg-white/70 backdrop-blur-sm"
                >
                  <Menu className="w-5 h-5 text-primary" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
            </Sheet>
          </header>
        </HeadRoom>

        {/* Main Content */}
        <main className="flex-1 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
