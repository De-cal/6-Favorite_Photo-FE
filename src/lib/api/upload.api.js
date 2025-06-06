export const POST = async (req) => {
  const body = await req.json();
  return Response.json({ success: true, data: body });
}
