import { Button, Icon, Label, Stack } from "@omnidev/sigil";
import { Reorder } from "motion/react";
import { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import { PiDotsSixVerticalBold } from "react-icons/pi";

import { updateProjectOptions } from "@/lib/form/updateProjectOptions";
import { withForm } from "@/lib/hooks/useForm";

import type { ProjectLink } from "@/lib/form/updateProjectOptions";

const MAX_PROJECT_LINKS = 10;

let pendingCounter = 0;

const createPendingLink = (order: number): ProjectLink => ({
  rowId: `pending-${++pendingCounter}-${Date.now()}`,
  projectId: "",
  url: "",
  title: "",
  order,
});

interface ReorderableLinksProps {
  items: ProjectLink[];
  onReorder: (items: ProjectLink[]) => void;
  onRemove: (index: number) => void;
  onAdd: () => void;
  // biome-ignore lint/suspicious/noExplicitAny: TanStack Form AppField type is complex
  AppField: any;
}

const ReorderableLinks = ({
  items,
  onReorder,
  onRemove,
  onAdd,
  AppField,
}: ReorderableLinksProps) => {
  const [localItems, setLocalItems] = useState<ProjectLink[]>(items);

  // Sync local state when form state changes externally
  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  const hasMultipleLinks = localItems.length > 1;

  const handleReorder = (newOrder: ProjectLink[]) => {
    setLocalItems(newOrder);
  };

  const handleDragEnd = () => {
    const updatedOrder = localItems.map((link, index) => ({
      ...link,
      order: index,
    }));
    onReorder(updatedOrder);
  };

  // Get the form index for a given rowId
  const getFormIndex = (rowId: string) => {
    return items.findIndex((item) => item.rowId === rowId);
  };

  return (
    <Stack gap={5}>
      <Label mb={-4}>Links</Label>

      <Reorder.Group
        axis="y"
        values={localItems}
        onReorder={handleReorder}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        {localItems.map((link) => {
          const formIndex = getFormIndex(link.rowId);

          return (
            <Reorder.Item
              key={link?.rowId}
              value={link}
              onDragEnd={handleDragEnd}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                listStyle: "none",
                position: "relative",
              }}
              whileDrag={{
                scale: 1.01,
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                zIndex: 1,
              }}
            >
              <Icon
                src={PiDotsSixVerticalBold}
                cursor="grab"
                color="foreground.subtle"
                flexShrink={0}
                style={{ touchAction: "none" }}
              />
              <AppField name={`projectLinks[${formIndex}].url`}>
                {({
                  URLField,
                }: {
                  URLField: React.FC<Record<string, unknown>>;
                }) => (
                  <URLField
                    placeholder="https://example.com"
                    containerProps={{
                      flex: 1,
                    }}
                    displayRemoveTrigger={hasMultipleLinks}
                    removeFieldProps={{
                      onClick: (evt: React.MouseEvent) => {
                        evt.preventDefault();
                        onRemove(formIndex);
                      },
                    }}
                    errorProps={{
                      top: -5,
                      right: 12,
                    }}
                  />
                )}
              </AppField>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      {localItems.length < MAX_PROJECT_LINKS && (
        <Button
          size="sm"
          variant="outline"
          className="border-primary text-primary hover:bg-primary/10"
          w="fit"
          onClick={(evt) => {
            evt.preventDefault();
            onAdd();
          }}
        >
          <Icon src={LuPlus} />
          Add Link
        </Button>
      )}
    </Stack>
  );
};

/**
 * Update Links form. This is a child form for Update Project and expects the same shape for default values.
 */
const UpdateLinks = withForm({
  ...updateProjectOptions,
  props: {
    projectId: "",
  },
  render: ({ form: { Field, AppField } }) => {
    return (
      <Field name="projectLinks" mode="array">
        {({ state: arrayState, pushValue, removeValue, setValue }) => (
          <ReorderableLinks
            items={arrayState.value}
            onReorder={setValue}
            onRemove={removeValue}
            onAdd={() => pushValue(createPendingLink(arrayState.value.length))}
            AppField={AppField}
          />
        )}
      </Field>
    );
  },
});

export default UpdateLinks;
