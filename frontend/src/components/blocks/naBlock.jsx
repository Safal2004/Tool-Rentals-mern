import { ShieldAlert } from "lucide-react";

const NaBlock = ({
  message = "Page not found or you are not authorized.",
}) => (
  <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <ShieldAlert className="mb-4 h-16 w-16 text-gray-600" />
    <h2 className="mb-4 text-center text-2xl font-semibold">{message}</h2>
    <a href="/" className="text-blue-500 hover:underline">
      Go to Home
    </a>
  </div>
);

export default NaBlock;
