import ModalProvider from "../providers/ModalProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import PointTimerProvider from "@/providers/PointTimerProvider";

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <PointTimerProvider>
        <ModalProvider>{children}</ModalProvider>
      </PointTimerProvider>
    </AuthProvider>
  );
}
