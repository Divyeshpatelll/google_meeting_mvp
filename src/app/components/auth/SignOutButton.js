import { signOut } from "next-auth/react";

const SignOutButton = () => (
  <button
    onClick={() => signOut()}
    className="text-sm bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
  >
    Sign Out
  </button>
);

export default SignOutButton; 