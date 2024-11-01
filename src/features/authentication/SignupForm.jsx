import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Họ và tên" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "Cần điền thông tin" })}
        />
      </FormRow>

      <FormRow label="Địa chỉ email" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "Cần điền thông tin",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Vui lòng nhập địa chỉ email hợp lệ",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Mật khẩu (ít nhất 8 ký tự)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "Cần điền thông tin",
            minLength: {
              value: 8,
              message: "Mật khẩu cần có ít nhất 8 ký tự",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Nhập lại mật khấu"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "Cần điền thông tin",
            validate: (value) =>
              value === getValues().password || "Cần nhập lại đúng mật khẩu",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          Huỷ
        </Button>
        <Button>Tạo người dùng mới</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
