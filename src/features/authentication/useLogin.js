import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Email hoặc mật khẩu không chính xác");
    },
  });

  return { login, isLoading };
}
