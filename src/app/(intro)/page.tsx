import React from "react";
import { SignInButton } from "@/features/intro/components/signin-button";

const IntroPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="flex flex-col space-y-2 items-center">
        <h1 className="text-6xl">Microservices Application</h1>
        <span className="text-md text-foreground/80">
          using golang and nextjs
        </span>
        <SignInButton />
      </div>
    </div>
  );
};

export default IntroPage;
