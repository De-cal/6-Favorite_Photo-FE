import QueryProvider from "@/providers/QueryProvider";
import ModalProvider from "../providers/ModalProvider";
import PointTimerProvider from "@/providers/PointTimerProvider";

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <PointTimerProvider>
        <ModalProvider>{children}</ModalProvider>
      </PointTimerProvider>
    </QueryProvider>
  );
}
