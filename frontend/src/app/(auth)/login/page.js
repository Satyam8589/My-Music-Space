import Login from "@/components/auth/login";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <Login />
    </Suspense>
  );
}
