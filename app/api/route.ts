import Ably from "ably";

// ensure Vercel doesn't cache the result of this route,
// as otherwise the token request data will eventually become outdated
// and we won't be able to authenticate on the client side
export const revalidate = 0;

//@ts-ignore
export async function GET(request) {
   //@ts-ignore
   const client = new Ably.Rest(
      "CzGc1g.LeHb7Q:bf99NKEDv_KJvMJpqt2120di9oc_VwBybbHGtPVevA4"
   );
   const tokenRequestData = await client.auth.createTokenRequest({
      clientId: "ably-nextjs-demo",
   });
   return Response.json(tokenRequestData);
}
