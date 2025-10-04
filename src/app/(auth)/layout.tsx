import React from "react";

type IntroLayoutProps = {
  children: React.ReactNode;
};
const IntroLayout = ({ children }: IntroLayoutProps) => {
  return <div>{children}</div>;
};

export default IntroLayout;
