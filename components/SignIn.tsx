import { SignInButton } from "@clerk/nextjs";

const SignIn = async () => {
  return (
    <SignInButton mode="modal">
      <button className="text-lightColor font-semibold text-sm hoverEffect hover:text-darkColor">
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;
