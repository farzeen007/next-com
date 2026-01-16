import { ClerkLoaded, SignedOut, UserButton } from "@clerk/nextjs";
import CartIcon from "./CartIcon";
import Container from "./Container";
import FavoriteIcon from "./FavoriteIcon";
import HeaderMenu from "./HeaderMenu";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import SearchBar from "./SearchBar";
import SignIn from "./SignIn";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const user = await currentUser();
  return (
    <header className="py-5 sticky top-0 bg-white/50 backdrop-blur">
      <Container className="flex flex-row justify-between items-center">
        <div className="flex justify-between items-center gap-5 md:gap-0 ">
          <MobileMenu />
          <Logo />
        </div>
        <HeaderMenu />
        <div className="w-auto md:1/3 flex items-center justify-center gap-5">
          <SearchBar />
          <CartIcon />
          <FavoriteIcon />
          <ClerkLoaded>
            {user ? (
              <UserButton />
            ) : (
              <SignedOut>
                <SignIn />
              </SignedOut>
            )}
          </ClerkLoaded>
        </div>
      </Container>
    </header>
  );
};

export default Header;
