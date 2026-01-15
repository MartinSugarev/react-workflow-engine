import { ComponentPropsWithoutRef, ReactNode } from "react";

export type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export type HeadingProps = {
  as: HeadingTag;
  children: ReactNode
} & ComponentPropsWithoutRef<HeadingTag>;

export const Heading = ({
  as,
  children,
  ...props
}: HeadingProps) => {
  const Component = as;
  return <Component {...props}>{children}</Component>;
};