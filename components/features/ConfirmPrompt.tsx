import { createPortal } from "react-dom";

type ConfirmProps = {
  title: string,
  saveBtn: () => void,
  cancelBtn: () => void,
  isSubmitting?: boolean
}

const ConfirmPrompt = ({ title, saveBtn, cancelBtn, isSubmitting }: ConfirmProps) => {
  if (typeof window === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      <div className="bg-white rounded-lg p-6 w-[90%] max-w-md flex flex-col items-center gap-6 shadow-lg">
        <h4 className="text-xl font-medium text-center">{title}</h4>

        <div className="flex w-full gap-4">
          <button
            className="flex-1 bg-shop_light_green hover:bg-shop_btn_dark_green py-2 text-white rounded-xl"
            onClick={cancelBtn}
            disabled={isSubmitting}
          >
            No
          </button>

          <button
            className="flex-1 bg-red-500 hover:bg-red-600 py-2 text-white rounded-xl"
            onClick={saveBtn}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Please wait..." : "Yes"}
          </button>
        </div>
      </div>

    </div>,
    document.body
  );
};
export default ConfirmPrompt