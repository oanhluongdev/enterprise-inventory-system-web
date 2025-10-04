"use client";

import Link from "next/link";
import React from "react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard/devices",
  },
  {
    title: "Controls",
    href: "/controls",
  },
  {
    title: "Data",
    href: "/data-management",
  },
  {
    title: "Reports",
    href: "/reports",
  },
  {
    title: "Settings",
    href: "/settings",
  },
];

export const NavMenu = () => {
  return (
    <ul className="flex items-center gap-4">
      {menuItems.map((item) => (
        <li key={item.title}>
          <Link
            href={item.href}
            className="hover:bg-accent px-3 py-1.5 rounded"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
