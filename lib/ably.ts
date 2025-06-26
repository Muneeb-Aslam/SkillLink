import { Realtime } from "ably";

//@ts-ignore
const ably = new Realtime(process.env.NEXT_PUBLIC_ABLY_API_KEY);

export default ably;
