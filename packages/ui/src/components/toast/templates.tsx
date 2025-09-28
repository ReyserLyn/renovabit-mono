"use client";

import {
  RiCheckboxCircleFill,
  RiErrorWarningFill,
  RiInformationFill,
  RiSpam3Fill,
} from "@remixicon/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
} from "@renovabit/ui/components/ui/alert";
import { toast } from "sonner";

export const toastTemplates = {
  success: (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <Alert icon="success" onClose={() => toast.dismiss(t)} variant="mono">
          <AlertIcon>
            <RiCheckboxCircleFill />
          </AlertIcon>
          <AlertTitle>{title}</AlertTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </Alert>
      ),
      {
        duration: 5000,
      }
    ),

  error: (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <Alert
          icon="destructive"
          onClose={() => toast.dismiss(t)}
          variant="mono"
        >
          <AlertIcon>
            <RiErrorWarningFill />
          </AlertIcon>
          <AlertTitle>{title}</AlertTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </Alert>
      ),
      {
        duration: 5000,
      }
    ),

  warning: (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <Alert icon="warning" onClose={() => toast.dismiss(t)} variant="mono">
          <AlertIcon>
            <RiSpam3Fill />
          </AlertIcon>
          <AlertTitle>{title}</AlertTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </Alert>
      ),
      {
        duration: 5000,
      }
    ),

  info: (title: string, description?: string) =>
    toast.custom(
      (t) => (
        <Alert icon="info" onClose={() => toast.dismiss(t)} variant="mono">
          <AlertIcon>
            <RiInformationFill />
          </AlertIcon>
          <AlertTitle>{title}</AlertTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </Alert>
      ),
      {
        duration: 5000,
      }
    ),
};
