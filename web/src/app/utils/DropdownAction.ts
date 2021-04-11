export interface DropdownAction {
  label: string;
  isEnabled: boolean;
  action: () => void;
}
