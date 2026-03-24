import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
  animation?: "fade-in-up" | "fade-in-left" | "fade-in-right";
  delay?: string;
}

const animationMap = {
  "fade-in-up": "animate-fade-in-up",
  "fade-in-left": "animate-fade-in-left",
  "fade-in-right": "animate-fade-in-right",
} as const;

const ScrollReveal = ({ children, className, animation = "fade-in-up", delay }: Props) => {
  const { ref, isVisible } = useScrollReveal(0.1);
  return (
    <div
      ref={ref}
      className={cn("opacity-0", isVisible && animationMap[animation], className)}
      style={delay && isVisible ? { animationDelay: delay, animationFillMode: "forwards" } : isVisible ? { animationFillMode: "forwards" } : undefined}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
