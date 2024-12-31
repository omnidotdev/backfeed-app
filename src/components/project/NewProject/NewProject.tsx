"use client";

import { Dialog } from "@omnidev/sigil";

import { app } from "lib/config";

interface Props {
  /** State to determine if the dialog is open. */
  isOpen: boolean;
  /** Callback to manage the open state of the dialog. */
  setIsOpen: (isOpen: boolean) => void;
}

/**
 * Dialog for creating a new project.
 */
const NewProject = ({ isOpen, setIsOpen }: Props) => (
  <Dialog
    title={app.dashboardPage.cta.newProject.label}
    description={app.dashboardPage.cta.newProject.description}
    open={isOpen}
    onOpenChange={({ open }) => setIsOpen(open)}
  />
);

export default NewProject;
