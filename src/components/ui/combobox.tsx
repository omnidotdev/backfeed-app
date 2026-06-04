import {
  Combobox as ArkCombobox,
  createListCollection,
} from "@ark-ui/react/combobox";
import { Portal } from "@ark-ui/react/portal";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo } from "react";

type Item = {
  label: string;
  value: string;
  disabled?: boolean;
};

type ComboboxProps = {
  items: Item[];
  placeholder?: string;
  value?: string[];
  onValueChange?: (value: string[]) => void;
  inputValue?: string;
  onInputValueChange?: (value: string) => void;
  disabled?: boolean;
};

const Combobox = ({
  items,
  placeholder = "Select...",
  value,
  onValueChange,
  inputValue,
  onInputValueChange,
  disabled,
}: ComboboxProps) => {
  const collection = useMemo(() => createListCollection({ items }), [items]);

  return (
    <ArkCombobox.Root
      collection={collection}
      value={value}
      onValueChange={(details) => onValueChange?.(details.value)}
      inputValue={inputValue}
      onInputValueChange={(details) => onInputValueChange?.(details.inputValue)}
      disabled={disabled}
      loopFocus
    >
      <ArkCombobox.Control className="relative">
        <ArkCombobox.Input
          placeholder={placeholder}
          className="w-full rounded-lg border border-input bg-muted px-3 py-2 pr-8 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <ArkCombobox.Trigger className="absolute top-1/2 right-2 -translate-y-1/2">
          <ChevronsUpDown className="size-4 text-muted-foreground" />
        </ArkCombobox.Trigger>
      </ArkCombobox.Control>

      <Portal>
        <ArkCombobox.Positioner>
          <ArkCombobox.Content className="z-50 max-h-60 w-[var(--reference-width)] overflow-y-auto rounded-lg border border-border bg-popover p-1 shadow-md">
            {items.map((item) => (
              <ArkCombobox.Item
                key={item.value}
                item={item}
                className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-popover-foreground text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              >
                <ArkCombobox.ItemIndicator>
                  <Check className="size-4" />
                </ArkCombobox.ItemIndicator>
                <ArkCombobox.ItemText>{item.label}</ArkCombobox.ItemText>
              </ArkCombobox.Item>
            ))}

            <ArkCombobox.Empty className="px-2 py-4 text-center text-muted-foreground text-sm">
              No results
            </ArkCombobox.Empty>
          </ArkCombobox.Content>
        </ArkCombobox.Positioner>
      </Portal>
    </ArkCombobox.Root>
  );
};

export default Combobox;
