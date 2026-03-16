import Favorites from "@/components/favorites/Favorites";
import LoginPrompt from "@/components/features/LoginPrompt.tsx";
import { currentUser } from "@clerk/nextjs/server";

const page = async() => {
    const user = await currentUser();
  
    if (!user) return <LoginPrompt />;

  return <Favorites />;
};

export default page;
