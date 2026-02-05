import React, { ComponentPropsWithoutRef, ReactNode } from "react";

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = {
  as: HeadingTag;
  children: ReactNode
} & ComponentPropsWithoutRef<HeadingTag>;

const Heading: React.FC<HeadingProps> = ({
  as,
  children,
  ...props
}) => {

  const Component = as;
  return <Component {...props}>{children}</Component>;
};


export default Heading;