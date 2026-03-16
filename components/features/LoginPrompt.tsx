import Logo from "../Logo";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const LoginPrompt = () => {
  return (
    <div className="h-[70vh] flex flex-col justify-center items-center">
      <div className="inset-0 rounded-2xl px-5 py-4 max-w-sm mx-auto flex flex-col gap-4 items-center justify-center bg-gray-200">
        <Logo />
        <h2 className="text-2xl tracking-tight">Welcome Back!</h2>
        <p className="text-gray-500 text-center">
          Login to view your wishlist items. Don't miss out on your cart
          products to make the payment.
        </p>
        <SignInButton>
          <Button className="bg-shop_light_green hover:bg-shop_dark_green w-full">
            Sign In
          </Button>
        </SignInButton>
        <p>Already have an account?</p>
         <SignUpButton>
          <Button className="bg-gray-400 hover:bg-gray-500 w-full">
              Create an Account
          </Button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default LoginPrompt;
