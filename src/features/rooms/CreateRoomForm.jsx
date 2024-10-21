import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateRoomForm() {
  // use register, handleSubmit and reset from useForm()
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;
  console.log(errors);

  // useQueryClient() for updating
  const queryClient = useQueryClient();

  // use mutate and isLoading from useMutation()
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: createRoom,
    onSuccess: () => {
      toast.success("Phòng mới đã được thêm thành công");
      // update data
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    console.log(data);
    mutate({ ...data, image: data.image[0] });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Tên phòng" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register("name", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow label="Sức chứa tối đa" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register("maxCapacity", {
            required: "Cần điền thông tin",
            min: {
              value: 1,
              message: "Cần ít nhất là 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Giá bình thường" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register("regularPrice", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow label="Giảm giá" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register("discount", {
            required: "Cần điền thông tin",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Cần ít hơn hoặc bằng giá bình thường",
          })}
        />
      </FormRow>

      <FormRow label="Mô tả phòng" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register("description", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow label="Hình ảnh phòng" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register("image", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Huỷ
        </Button>
        <Button disabled={isCreating}>Thêm phòng</Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;
