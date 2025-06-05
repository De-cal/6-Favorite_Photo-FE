import QueryProvider from "@/providers/QueryProvider";
import ModalProvider from "../providers/ModalProvider";
import PointTimerProvider from "@/providers/PointTimerProvider";
import AuthProvider from "@/providers/AuthProvider";
import RouteGuard from "@/providers/RouteGuard";

export default function Providers({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <PointTimerProvider>
          <RouteGuard>
            <ModalProvider>{children}</ModalProvider>
          </RouteGuard>
        </PointTimerProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
