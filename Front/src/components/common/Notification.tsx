import { useEffect, useState } from "react";

interface NotificationProps {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
}

export default function Notification({ message, type = "success", onClose }: NotificationProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeout1 = setTimeout(() => setIsVisible(false), 2500);
    const timeout2 = setTimeout(onClose, 3000);
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-4 right-4 px-4 py-2 rounded shadow text-black z-50 transition-all duration-500 ease-in-out
        ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}
        slide-in-start
        bg-white
        border-b-4
        ${type === "success" ? "border-green-600" : "border-red-600"}
        max-w-[350px] w-auto
      `}
      style={{
        willChange: "transform, opacity",
      }}
    >
      {message}
      <style jsx>{`
        .slide-in-start {
          transform: translateX(100%);
          animation: slideIn 0.2s forwards ease-out;
        }

        @keyframes slideIn {
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
