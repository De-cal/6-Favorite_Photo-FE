import QueryProvider from "@/providers/QueryProvider";
import ModalProvider from "../providers/ModalProvider";
import PointTimerProvider from "@/providers/PointTimerProvider";
import AuthProvider from "@/providers/AuthProvider";

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <PointTimerProvider>
          <ModalProvider>{children}</ModalProvider>
        </PointTimerProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
