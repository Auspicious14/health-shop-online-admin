import Image, { ImageProps, StaticImageData } from "next/image";
import React from "react";

interface IProps extends ImageProps {}

export const ApImage: React.FC<IProps> = (props: IProps) => {
  return (
    <Image
      width={props.width || 200}
      height={props.width || 200}
      {...props}
      alt="image"
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
    <div className={className}>
      <div
        style={{
          backgroundImage: `url(${src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          width: "100%",
          height: "100%",
          margin: "0%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
