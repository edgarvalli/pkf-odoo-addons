import type { ReactNode } from "react";

export interface EVModalProps {
  children?: ReactNode;
  open?: boolean;
  title?: string;
  heightCard?: string | number;
  minHeightCard?: string | number;
  onClose?: () => void;
  onOpen?: () => void;
}
