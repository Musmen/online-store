export interface Page {
  render: () => string;
  init?: () => void;
  unmount?: () => void;
}
