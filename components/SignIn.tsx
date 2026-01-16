import { SignInButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const SignIn = async () => {
  const user = await currentUser();
  return (
    <SignInButton mode="modal">
      <button className="text-lightColor font-semibold text-sm hoverEffect hover:text-darkColor">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
