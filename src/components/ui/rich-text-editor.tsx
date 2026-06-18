import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  $createLinkNode,
  AutoLinkNode,
  LinkNode,
  TOGGLE_LINK_COMMAND,
} from "@lexical/link";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import {
  LexicalTypeaheadMenuPlugin,
  MenuOption,
  useBasicTypeaheadTriggerMatch,
} from "@lexical/react/LexicalTypeaheadMenuPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import DOMPurify from "isomorphic-dompurify";
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $insertNodes,
  $setSelection,
  FORMAT_TEXT_COMMAND,
} from "lexical";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import cn from "@/lib/utils";

import type {
  EditorState,
  EditorThemeClasses,
  LexicalEditor,
  TextFormatType,
  TextNode,
} from "lexical";
import type { ComponentProps, ReactNode, RefObject } from "react";

/** Imperative handle exposed via `editorApi` for clearing/focusing the editor. */
export interface EditorApi {
  clearContent: () => void;
  focus: () => void;
}

/** Node-class theme, mapped onto Sigil/Tailwind tokens. */
const theme: EditorThemeClasses = {
  paragraph: "mb-2 last:mb-0",
  heading: {
    h1: "mt-4 mb-2 font-bold text-xl first:mt-0",
    h2: "mt-3 mb-2 font-bold text-lg first:mt-0",
  },
  text: {
    bold: "font-semibold",
    italic: "italic",
    strikethrough: "line-through",
    underline: "underline",
    code: "rounded bg-muted px-1 py-0.5 font-mono text-[0.85em]",
  },
  list: {
    ul: "mb-2 ml-5 list-disc",
    ol: "mb-2 ml-5 list-decimal",
    listitem: "mb-1",
  },
  link: "text-primary underline underline-offset-2 hover:opacity-80",
  quote: "my-2 border-border border-l-2 pl-3 text-muted-foreground italic",
};

/** Read the editor's content as an HTML string. */
const exportToHtml = (editor: LexicalEditor): string => {
  let html = "";
  editor.getEditorState().read(() => {
    html = $generateHtmlFromNodes(editor);
  });
  return html;
};

/** Read the editor's plain-text content. */
const getTextContent = (editor: LexicalEditor): string => {
  let text = "";
  editor.getEditorState().read(() => {
    text = $getRoot().getTextContent();
  });
  return text;
};

/** Whether the editor holds only whitespace. */
const isEditorEmpty = (editor: LexicalEditor): boolean => {
  let empty = true;
  editor.getEditorState().read(() => {
    empty = $getRoot().getTextContent().trim().length === 0;
  });
  return empty;
};

/** Replace the editor's content with parsed HTML. */
const importFromHtml = (editor: LexicalEditor, html: string): void => {
  editor.update(() => {
    const dom = new DOMParser().parseFromString(html, "text/html");
    const nodes = $generateNodesFromDOM(editor, dom);
    const root = $getRoot();
    root.clear();
    $insertNodes(nodes);
    $setSelection(null);
  });
};

interface ToolbarButtonProps extends ComponentProps<typeof Button> {
  label: string;
}

/**
 * Toolbar button. Uses onMouseDown + preventDefault so clicking it does not
 * blur the editor and lose the current selection before the command runs.
 */
const ToolbarButton = ({
  label,
  children,
  className,
  ...rest
}: ToolbarButtonProps) => (
  <Button
    type="button"
    size="icon"
    variant="ghost"
    aria-label={label}
    title={label}
    className={cn("size-8", className)}
    onMouseDown={(event) => event.preventDefault()}
    {...rest}
  >
    {children}
  </Button>
);

/** Minimal formatting toolbar: bold, italic, lists, link. */
const Toolbar = () => {
  const [editor] = useLexicalComposerContext();

  const format = (type: TextFormatType) =>
    editor.dispatchCommand(FORMAT_TEXT_COMMAND, type);

  const insertLink = () => {
    const url = window.prompt("Link URL");
    if (url) editor.dispatchCommand(TOGGLE_LINK_COMMAND, url.trim());
  };

  return (
    <div className="flex items-center gap-0.5 border-input border-b px-1 py-1">
      <ToolbarButton label="Bold" onClick={() => format("bold")}>
        <Bold />
      </ToolbarButton>
      <ToolbarButton label="Italic" onClick={() => format("italic")}>
        <Italic />
      </ToolbarButton>
      <ToolbarButton
        label="Bulleted list"
        onClick={() =>
          editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)
        }
      >
        <List />
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        onClick={() =>
          editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)
        }
      >
        <ListOrdered />
      </ToolbarButton>
      <ToolbarButton label="Link" onClick={insertLink}>
        <LinkIcon />
      </ToolbarButton>
    </div>
  );
};

/** Keep Lexical's editable state in sync with the `editable` prop. */
const EditablePlugin = ({ editable }: { editable: boolean }) => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(editable);
  }, [editor, editable]);

  return null;
};

/** Seed initial HTML content and wire up the imperative `editorApi` handle. */
const EditorApiPlugin = ({
  editorApi,
  defaultContent,
}: {
  editorApi?: RefObject<EditorApi | null>;
  defaultContent?: string;
}) => {
  const [editor] = useLexicalComposerContext();
  const seeded = useRef(false);

  useEffect(() => {
    if (defaultContent && !seeded.current) {
      seeded.current = true;
      importFromHtml(editor, defaultContent);
    }
  }, [editor, defaultContent]);

  useEffect(() => {
    if (!editorApi) return;
    editorApi.current = {
      clearContent: () =>
        editor.update(() => {
          const root = $getRoot();
          root.clear();
          const paragraph = $createParagraphNode();
          root.append(paragraph);
          paragraph.select();
        }),
      focus: () =>
        editor.focus(() =>
          editor.update(() => {
            $getRoot().selectEnd();
          }),
        ),
    };
  }, [editor, editorApi]);

  return null;
};

/** A mentionable entity offered in the `@`-typeahead. */
export interface MentionItem {
  /** Stable id (e.g. user id). */
  id: string;
  /** Display label, shown after the `@` (no leading `@`). */
  label: string;
  /** Optional link target inserted for the mention. */
  url?: string;
}

class MentionTypeaheadOption extends MenuOption {
  item: MentionItem;

  constructor(item: MentionItem) {
    super(item.id);
    this.item = item;
  }
}

/**
 * `@`-mention typeahead. Filters the provided `items` by the typed query and
 * inserts the selected mention as a link (`@label` → `url`).
 */
const MentionTypeahead = ({ items }: { items: MentionItem[] }) => {
  const [editor] = useLexicalComposerContext();
  const [query, setQuery] = useState<string | null>(null);

  const triggerFn = useBasicTypeaheadTriggerMatch("@", { minLength: 0 });

  const options = useMemo(() => {
    const normalized = (query ?? "").toLowerCase();
    return items
      .filter((item) => item.label.toLowerCase().includes(normalized))
      .slice(0, 6)
      .map((item) => new MentionTypeaheadOption(item));
  }, [items, query]);

  const onSelectOption = useCallback(
    (
      option: MentionTypeaheadOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void,
    ) => {
      editor.update(() => {
        const mention = $createLinkNode(option.item.url ?? "#");
        mention.append($createTextNode(`@${option.item.label}`));
        if (nodeToReplace) nodeToReplace.replace(mention);
        const trailing = $createTextNode(" ");
        mention.insertAfter(trailing);
        trailing.select();
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <LexicalTypeaheadMenuPlugin<MentionTypeaheadOption>
      onQueryChange={setQuery}
      onSelectOption={onSelectOption}
      triggerFn={triggerFn}
      options={options}
      menuRenderFn={(
        anchorRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) =>
        anchorRef.current && options.length
          ? createPortal(
              <ul className="z-50 max-h-56 min-w-44 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                {options.map((option, index) => (
                  <li
                    key={option.key}
                    className={cn(
                      "cursor-pointer rounded-sm px-2 py-1.5 text-sm",
                      selectedIndex === index && "bg-muted",
                    )}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectOptionAndCleanUp(option);
                    }}
                  >
                    @{option.item.label}
                  </li>
                ))}
              </ul>,
              anchorRef.current,
            )
          : null
      }
    />
  );
};

/** An issue (post) offered in the `#`-reference typeahead. */
export interface IssueReferenceItem {
  /** Post rowId. */
  id: string;
  /** Per-project issue number (the `#` token inserted). */
  number: number;
  /** Post title, shown in the menu. */
  title: string;
}

class IssueReferenceOption extends MenuOption {
  item: IssueReferenceItem;

  constructor(item: IssueReferenceItem) {
    super(String(item.id));
    this.item = item;
  }
}

/**
 * `#`-reference typeahead. Filters the provided `items` by the typed number or
 * title and inserts the selected reference as plain `#<number>` text, which the
 * read renderer linkifies to the referenced post (GitHub `#123` style).
 */
const IssueReferenceTypeahead = ({
  items,
}: {
  items: IssueReferenceItem[];
}) => {
  const [editor] = useLexicalComposerContext();
  const [query, setQuery] = useState<string | null>(null);

  const triggerFn = useBasicTypeaheadTriggerMatch("#", { minLength: 0 });

  const options = useMemo(() => {
    const normalized = (query ?? "").toLowerCase();
    return items
      .filter(
        (item) =>
          String(item.number).startsWith(normalized) ||
          item.title.toLowerCase().includes(normalized),
      )
      .slice(0, 6)
      .map((item) => new IssueReferenceOption(item));
  }, [items, query]);

  const onSelectOption = useCallback(
    (
      option: IssueReferenceOption,
      nodeToReplace: TextNode | null,
      closeMenu: () => void,
    ) => {
      editor.update(() => {
        const reference = $createTextNode(`#${option.item.number}`);
        if (nodeToReplace) nodeToReplace.replace(reference);
        const trailing = $createTextNode(" ");
        reference.insertAfter(trailing);
        trailing.select();
        closeMenu();
      });
    },
    [editor],
  );

  return (
    <LexicalTypeaheadMenuPlugin<IssueReferenceOption>
      onQueryChange={setQuery}
      onSelectOption={onSelectOption}
      triggerFn={triggerFn}
      options={options}
      menuRenderFn={(
        anchorRef,
        { selectedIndex, selectOptionAndCleanUp, setHighlightedIndex },
      ) =>
        anchorRef.current && options.length
          ? createPortal(
              <ul className="z-50 max-h-56 min-w-56 max-w-72 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
                {options.map((option, index) => (
                  <li
                    key={option.key}
                    className={cn(
                      "flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
                      selectedIndex === index && "bg-muted",
                    )}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      selectOptionAndCleanUp(option);
                    }}
                  >
                    <span className="shrink-0 font-medium text-muted-foreground">
                      #{option.item.number}
                    </span>
                    <span className="truncate">{option.item.title}</span>
                  </li>
                ))}
              </ul>,
              anchorRef.current,
            )
          : null
      }
    />
  );
};

interface RichTextEditorProps
  extends Omit<ComponentProps<"div">, "placeholder" | "onChange"> {
  /** Imperative handle for clearing/focusing the editor. */
  editorApi?: RefObject<EditorApi | null>;
  /** Called on every change with the current HTML/text and empty state. */
  onUpdate?: (update: {
    getHTML: () => string;
    getText: () => string;
    isEmpty: boolean;
  }) => void;
  /** Initial HTML content. */
  defaultContent?: string;
  /** Whether the editor accepts input. */
  editable?: boolean;
  /** Placeholder shown when empty. */
  placeholder?: string;
  /** Hide the formatting toolbar. */
  hideToolbar?: boolean;
  /** When provided, enables an `@`-mention typeahead over these items. */
  mentionItems?: MentionItem[];
  /** When provided, enables a `#`-issue-reference typeahead over these items. */
  issueReferenceItems?: IssueReferenceItem[];
  /** Class applied to the editor surface. */
  editorClassName?: string;
}

/**
 * Friendly rich-text editor built on Lexical: bold, italic, lists, and links
 * via a minimal toolbar. Content is read out as sanitizable HTML through
 * `onUpdate`. Render stored HTML back with {@link RichTextContent}.
 */
const RichTextEditor = ({
  editorApi,
  onUpdate,
  defaultContent,
  editable = true,
  placeholder,
  hideToolbar = false,
  mentionItems,
  issueReferenceItems,
  className,
  editorClassName,
  ...rest
}: RichTextEditorProps) => {
  const [mounted, setMounted] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!defaultContent);

  // Lexical touches the DOM, so only render it on the client to stay SSR-safe.
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <Skeleton className={cn("h-24 w-full rounded-md", className)} {...rest} />
    );
  }

  const initialConfig = {
    namespace: "RichTextEditor",
    theme,
    editable,
    onError: (error: Error) => console.error("Lexical error:", error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
    ],
  };

  const handleChange = (_state: EditorState, editor: LexicalEditor) => {
    const empty = isEditorEmpty(editor);
    setIsEmpty(empty);
    onUpdate?.({
      getHTML: () => exportToHtml(editor),
      getText: () => getTextContent(editor),
      isEmpty: empty,
    });
  };

  return (
    <div
      className={cn(
        "rounded-md border border-input bg-background text-sm focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
      {...rest}
    >
      <LexicalComposer initialConfig={initialConfig}>
        {!hideToolbar && editable && <Toolbar />}

        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={cn(
                  "min-h-20 px-3 py-2 outline-none",
                  editorClassName,
                )}
                spellCheck
              />
            }
            placeholder={
              placeholder && isEmpty ? (
                <div className="pointer-events-none absolute top-2 left-3 select-none text-muted-foreground">
                  {placeholder}
                </div>
              ) : null
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <ListPlugin />
          <LinkPlugin />
          {mentionItems?.length ? (
            <MentionTypeahead items={mentionItems} />
          ) : null}
          {issueReferenceItems?.length ? (
            <IssueReferenceTypeahead items={issueReferenceItems} />
          ) : null}
          <OnChangePlugin onChange={handleChange} />
          <EditablePlugin editable={editable} />
          <EditorApiPlugin
            editorApi={editorApi}
            defaultContent={defaultContent}
          />
        </div>
      </LexicalComposer>
    </div>
  );
};

interface RichTextContentProps extends ComponentProps<"div"> {
  /** Stored HTML to render (sanitized before insertion). */
  html: string;
  /** Optional fallback when there is no content. */
  fallback?: ReactNode;
}

/**
 * Render stored rich-text HTML, sanitized with DOMPurify to keep
 * user-generated content safe. Mirrors the editor's node-class theme.
 */
const RichTextContent = ({
  html,
  fallback = null,
  className,
  ...rest
}: RichTextContentProps) => {
  if (!html?.trim()) return <>{fallback}</>;

  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "b",
      "strong",
      "i",
      "em",
      "u",
      "s",
      "code",
      "pre",
      "ul",
      "ol",
      "li",
      "a",
      "h1",
      "h2",
      "blockquote",
      "span",
    ],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
  });

  return (
    <div
      className={cn(
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-2 [&_blockquote]:border-border [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h1]:font-bold [&_h1]:text-xl [&_h2]:font-bold [&_h2]:text-lg [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:mb-2 [&_p:last-child]:mb-0 [&_ul]:ml-5 [&_ul]:list-disc",
        className,
      )}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized above with DOMPurify
      dangerouslySetInnerHTML={{ __html: clean }}
      {...rest}
    />
  );
};

export { RichTextEditor, RichTextContent };
export default RichTextEditor;
