import React from "react";
import ActionButton from "@/components/ui/buttons/ActionButton";
export default function AuthSubmitButton({
  label = "",
  isDisabled = true,
  className = "",
  ...props
}) {
  return (
    <ActionButton
      type="submit"
      variant="primary"
      disabled={isDisabled}
      className="w-full h-[55px] text-base md:text-lg md:h-[60px]"
    >
      {label}
    </ActionButton>
  );
}
