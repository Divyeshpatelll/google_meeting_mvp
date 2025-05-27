import { signIn } from "next-auth/react";

const SignInButton = () => (
  <button
    onClick={() => signIn("google")}
    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Sign in with Google
  </button>
);

export default SignInButton; 