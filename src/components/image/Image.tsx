import Image, { ImageProps, StaticImageData } from "next/image";
import React from "react";

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
  src: string | StaticImageData;
}
export const ApBackgroundImage: React.FC<IImageProps> = ({
  children,
  className,
  src,
}) => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${src})`,
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
