import type { ReactElement } from "react";
import CardUi from "../../Home/component/CardUi";

type AiInsightCardProps = {
  icon: ReactElement;
  iconBgColor: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

const AiInsightCard = ({
  icon,
  iconBgColor,
  title,
  description,
  children,
}: AiInsightCardProps) => {
  return (
    <CardUi className="hover:shadow-md hover:transition-all hover:duration-200">
      <div className="flex flex-col space-y-4">
        <div className="flex items-start space-x-3">
          <span
            className={`${iconBgColor} shrink-0 rounded-full p-3 text-lg text-white`}
          >
            {icon}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-[#1E293B]">{title}</h3>
            <p className="text-sm font-light text-gray-500">{description}</p>
          </div>
        </div>

        <div className="rounded-xl bg-[#F1F5F9] px-4 py-3 text-sm font-light leading-relaxed text-[#1E293B]">
          {children}
        </div>
      </div>
    </CardUi>
  );
};

export default AiInsightCard;
