export function getResponseMsg(err) {
  return err?.response?.data?.message || err?.message || "Something went wrong";
}

export function getMediaPath(file) {
  return file || null;
}
