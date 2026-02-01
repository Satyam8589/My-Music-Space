import Register from "@/components/auth/register";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading register...</div>}>
      <Register />
    </Suspense>
  );
}
