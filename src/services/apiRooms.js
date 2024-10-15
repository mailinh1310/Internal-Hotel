import supabase from "./supabase";

export async function getRooms() {
  const { data, error } = await supabase.from("rooms").select("*");

  if (error) {
    console.log(error);
    throw new Error("Không tải được phòng");
  }

  return data;
}
