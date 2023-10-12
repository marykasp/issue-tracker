"use client";

import { AlertDialog, Button, Flex } from "@radix-ui/themes";

// client component since requires user interaction
const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className="cursor-pointer">
          Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
        <AlertDialog.Description>
          Are you seure you want to delete this issue? This action cannot be
          undone.
        </AlertDialog.Description>
        <Flex mt="4" gap="3">
          <AlertDialog.Cancel>
            <Button color="gray" variant="soft">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" className="cursor-pointer">
              Confirm
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default DeleteIssueButton;
