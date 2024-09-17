import Link from "next/link";
import {
  SparklesIcon,
  FaceSmileIcon,
  PencilSquareIcon,
  DocumentChartBarIcon,
  CubeTransparentIcon,
  FireIcon,
} from "@heroicons/react/24/solid";

const iconsMap = {
  sparkles: SparklesIcon,
  smile: FaceSmileIcon,
  personal: PencilSquareIcon,
  insight: DocumentChartBarIcon,
  simulation: CubeTransparentIcon,
  risk: FireIcon,
};

type IconKey = keyof typeof iconsMap;

type ServiceCardProps = {
  name: string;
  description: string;
  href: string;
  icon: IconKey;
};

export default function ServiceCard({
  name,
  description,
  href,
  icon,
}: ServiceCardProps) {
    const Icon = iconsMap[icon]
  return (
    <Link href={href} className="hover:scale-105 transition ease-in-out max-w-72">
      <div className="flex flex-col justify-around items-center h-80 max-w-72 border-2 bg-slate-800 rounded-lg p-5 border-green-200 shadow-md shadow-green-200">
        <div className="text-xl font-bold max-w-48 text-center">{name}</div>
        <Icon className="size-14"/>
        <p>{description}</p>
      </div>
    </Link>
  );
}
