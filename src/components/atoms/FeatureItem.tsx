import React from "react";
import Title, { TitleProps } from "@/components/atoms/Title";
import Description, { DescriptionProps } from "@/components/atoms/Description";
import clsx from "clsx";

interface FeatureItemProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: React.ReactNode;
  titleProps?: Omit<TitleProps, "text" | "children">;
  descriptionProps?: Omit<DescriptionProps, "children">;
  className?: string;
  iconClassName?: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({
  icon: Icon,
  title,
  description,
  titleProps = {},
  descriptionProps = {},
  className = "",
  iconClassName = "",
}) => {
  return (
    <div className={clsx("flex items-start gap-3", className)}>
      <div className="w-10 h-10 rounded-lg bg-lime-50 flex items-center justify-center flex-shrink-0">
        <Icon className={clsx("w-5 h-5 text-lime-600", iconClassName)} />
      </div>
      <div>
        <Title 
          text={title} 
          size="sm" 
          className="lg:text-lg"
          {...titleProps}
        />
        <Description 
          size="xs" 
          className="lg:text-sm" 
          {...descriptionProps}
        >
          {description}
        </Description>
      </div>
    </div>
  );
};

export default FeatureItem;