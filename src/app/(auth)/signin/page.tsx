import React from "react";
import { SignInForm } from "@/features/auth/components/sign-in-form";

const SignInPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <SignInForm />
    </div>
  );
};

export default SignInPage;
