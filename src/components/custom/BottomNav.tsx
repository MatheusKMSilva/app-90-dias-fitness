"use client";

import { Home, Dumbbell, UtensilsCrossed, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
    },
    {
      name: "Treinos",
      icon: Dumbbell,
      href: "/treinos",
    },
    {
      name: "Dieta",
      icon: UtensilsCrossed,
      href: "/dieta",
    },
    {
      name: "Perfil",
      icon: User,
      href: "/perfil",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-lg rounded-t-3xl z-50">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-around h-20">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "text-orange-600 dark:text-orange-500 scale-110"
                    : "text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400"
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-all duration-300 ${
                    isActive ? "stroke-[2.5]" : "stroke-[2]"
                  }`}
                />
                <span
                  className={`text-xs font-medium transition-all duration-300 ${
                    isActive ? "font-semibold" : ""
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
