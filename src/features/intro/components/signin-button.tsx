"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const SignInButton = () => {
  return (
    <Link href="/signin" className="text-xl hover:text-foreground/60">
      Sign In
    </Link>
  );
};
