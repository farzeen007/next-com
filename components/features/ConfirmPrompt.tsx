import Logo from "../Logo";
import { Button } from "../ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const ConfirmPrompt = ({title,saveBtn,cancelBtn}:{title:string,savebtn:void,cancelBtn:void}) => {return <div className="fixed inset-0 flex justify-center bg-black/10 backdrop-blur-xs z-1000">
            <div className="bg-white absolute top-30 rounded-lg p-5 min-h-60 min-w-110 flex flex-col justify-center items-center gap-10">
              <h4 className="text-2xl font-medium">
               {title}
              </h4>
              <div className="flex justify-evenly w-full">
                <button
                  className="bg-shop_light_green hover:bg-shop_btn_dark_green hoverEffect py-2 px-10 text-white rounded-xl text-lg"
                  onClick={cancelBtn}
                >
                  No
                </button>
                <button
                  className="bg-red-500 hover:bg-red-600 hoverEffect py-2 px-10 text-white rounded-xl text-lg"
                  onClick={saveBtn}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>}
          export default ConfirmPrompt