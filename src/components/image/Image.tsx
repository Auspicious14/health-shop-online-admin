import Image, { ImageProps } from "next/image";
import React from "react";
import Section from "../../../public/images/unsplash_MU70DTGr7d0.png";
interface IProps extends ImageProps {}

export const ApImage: React.FC<IProps> = (props: IProps) => {
  return (
    <Image
      style={{
        backgroundImage: "url(public/images/subtract.png)",
      }}
      // alt={'healthshop'}
      width={200}
      height={200}
      {...props}
    />
  );
};

interface IImageProps {
  children?: React.ReactNode;
  className?: string;
}
export const ApBackgroundImage: React.FC<IImageProps> = ({
  children,
  className,
}) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${Section.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "50%",
          height: "38.5rem",
          margin: "0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={className}
      >
        {children}
      </div>
    </>
  );
};
