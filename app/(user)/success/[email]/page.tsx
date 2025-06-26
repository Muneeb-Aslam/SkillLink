import SendOTP from "./send-otp";

export default function Success() {
  return (
    <main className="bg-white h-screen w-full flex justify-center items-center py-6">
      <div className="w-[400px] h-full max-w-[1500px] flex flex-col justify-center items-center p-6">
        <SendOTP />
      </div>
    </main>
  );
}
