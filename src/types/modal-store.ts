import { FormActions } from "./form-action";

export interface ModalStore {
  id: string;
  formAction: FormActions;
  open: boolean;
  onOpen: (idInput: string, formActionInput: FormActions) => void;
  onClose: () => void;
}
