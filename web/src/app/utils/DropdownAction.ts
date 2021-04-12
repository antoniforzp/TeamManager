export interface DropdownAction {
  label: string;
  isEnabled: boolean;
  isVisible?: boolean;
  action: () => void;
}
