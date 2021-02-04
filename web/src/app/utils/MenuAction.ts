export interface MenuAction {
  label: string;
  isEnabled: boolean;
  execute: () => void;
}
