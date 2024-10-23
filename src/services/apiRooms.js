import supabase, { supabaseUrl } from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("Rooms").select("*");

  if (error) {
    console.log(error);
    throw new Error("Không tải được phòng");
  }

  return data;
}

export async function deleteRoom(id) {
  const { data, error } = await supabase.from("Rooms").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Không thể xoá phòng");
  }

  return data;
}

export async function createEditRoom(newRoom, id) {
  const hasImagePath = newRoom.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newRoom.image
    : `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Create and edit room
  // Tách query để reuse
  let query = supabase.from("Rooms");

  // Create
  if (!id) query = query.insert([{ ...newRoom, image: imagePath }]);

  // Edit
  if (id) query = query.update({ ...newRoom, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Phòng mới không được thêm thành công");
  }

  // 2. Upload image
  const { error: storageError } = await supabase.storage
    .from("room-images")
    .upload(imageName, newRoom.image);

  // 3. Delete the room if there was an error uploading image
  if (storageError) {
    await supabase.from("Rooms").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Lỗi tải ảnh lên, phòng mới không được thêm thành công");
  }

  return data;
}
