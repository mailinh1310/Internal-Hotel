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

export async function createRoom(newRoom) {
  const imageName = `${Math.random()}-${newRoom.image.name}`.replaceAll(
    "/",
    ""
  );

  // https://xbjtrlkyucjibnsbphqt.supabase.co/storage/v1/object/public/room-images/cabin-001.jpg

  const imagePath = `${supabaseUrl}/storage/v1/object/public/room-images/${imageName}`;

  // 1. Create room
  const { data, error } = await supabase
    .from("Rooms")
    .insert([{ ...newRoom, image: imagePath }])
    .select();
  console.log(data);

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
