import Image from "next/image";

const brandLogoMap = {
  ZIFAT999: "/zifat999.png",
  SIFA999: "/sifa999.png",
} as const;

const accentMap = {
  ZIFAT999: "ring-teal-100 bg-teal-50/80",
  SIFA999: "ring-green-100 bg-green-50/80",
} as const;

interface BrandLogoProps {
  brand: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-10 w-10 rounded-xl",
  md: "h-14 w-14 rounded-2xl",
  lg: "h-16 w-16 rounded-2xl md:h-20 md:w-20 md:rounded-3xl",
} as const;

export default function BrandLogo({ brand, size = "md", className = "" }: BrandLogoProps) {
  const normalizedBrand = brand === "SIFA999" ? "SIFA999" : brand === "ZIFAT999" ? "ZIFAT999" : null;

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden border border-white/70 shadow-sm ring-1 ${
        normalizedBrand ? accentMap[normalizedBrand] : "ring-border bg-card"
      } ${sizeMap[size]} ${className}`}
    >
      <Image
        src={normalizedBrand ? brandLogoMap[normalizedBrand] : "/phatngocanhlogo.jpg"}
        alt={`Logo ${brand}`}
        fill
        className="object-contain p-1.5"
        sizes={size === "lg" ? "80px" : size === "md" ? "56px" : "40px"}
      />
    </div>
  );
}
