import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signup as signupApi } from "../../services/apiAuth";

export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Tài khoản được đăng ký thành công. Hãy xác minh tài khoản tại địa chỉ email đã đăng ký"
      );
    },
  });

  return { signup, isLoading };
}
