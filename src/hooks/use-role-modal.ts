import { create } from "zustand";
import { ModalStore } from "@/types/modal-store";
import { FormActions } from "@/types/form-action";

export const useRoleModal = create<ModalStore>((set) => ({
  id: "",
  formAction: FormActions.View,
  open: false,
  onOpen: (idInput, formActionInput) =>
    set({ id: idInput, formAction: formActionInput, open: true }),
  onClose: () => set({ id: "", formAction: FormActions.View, open: false }),
}));
