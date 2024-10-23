/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditRoom } from "../../services/apiRooms";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateRoomForm({ roomToEdit = {} }) {
  const { id: editId, ...editValues } = roomToEdit;

  const isEditSession = Boolean(editId);

  // use register, handleSubmit and reset from useForm()
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;
  console.log(errors);

  // useQueryClient() for updating
  const queryClient = useQueryClient();

  // use mutate và isLoading từ useMutation()
  const { mutate: createRoom, isLoading: isCreating } = useMutation({
    mutationFn: createEditRoom,
    onSuccess: () => {
      toast.success("Phòng mới đã được thêm thành công");
      // update data
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const { mutate: editRoom, isLoading: isEditing } = useMutation({
    mutationFn: ({ newRoomData, id }) => createEditRoom(newRoomData, id),
    onSuccess: () => {
      toast.success("Thông tin phòng đã được sửa thành công");
      // update data
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editRoom({ newRoomData: { ...data, image }, id: editId });
    else createRoom({ ...data, image: data.image[0] });
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
          disabled={isWorking}
          {...register("name", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow label="Sức chứa tối đa" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("regularPrice", {
            required: "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow label="Giảm giá" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
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
          disabled={isWorking}
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
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "Cần điền thông tin",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Huỷ
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Sửa thông tin" : "Thêm phòng"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateRoomForm;
