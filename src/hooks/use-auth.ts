import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useSignUp() {
  return api.auth.signUp.useMutation({
    onSuccess: (data) => {
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogin() {
  const router = useRouter();

  return api.auth.login.useMutation({
    onSuccess: () => {
      router.push("/dashboard");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  return api.auth.logout.useMutation({
    onSuccess: () => {
      router.push("/login");
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export function useGetSession() {
  return api.auth.getSession.useQuery();
}
