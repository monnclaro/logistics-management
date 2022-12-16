import * as Dialog from "@radix-ui/react-dialog";

function DeleteDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/60" />
      <Dialog.Content className="fixed top-1/2 left-1/2 w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#0d1117] py-8 px-10 text-white shadow-lg shadow-black/25">
        <Dialog.Title className="text-center">
          Item deleted successfully
        </Dialog.Title>
        <Dialog.Description className="pt-3 text-center text-sm text-[#8B949E]">
          This item has been successfully deleted.
        </Dialog.Description>

        <div className="flex justify-center pt-6">
          <Dialog.Close asChild>
            <button className="duration-20000 flex h-[30px] w-[180px] items-center justify-center gap-1 rounded-lg border border-zinc-700 bg-white pt-0 text-sm  font-bold text-black shadow-sm hover:bg-gray-400 hover:transition-colors">
              Got it, thanks!
            </button>
          </Dialog.Close>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default DeleteDialog;
