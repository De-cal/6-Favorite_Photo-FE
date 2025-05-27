import ModalProvider from "../providers/ModalProvider";
import PointTimerProvider from "@/providers/PointTimerProvider";

export default function Providers({ children }) {
  return (
    <PointTimerProvider>
      <ModalProvider>{children}</ModalProvider>
    </PointTimerProvider>
  );
}
