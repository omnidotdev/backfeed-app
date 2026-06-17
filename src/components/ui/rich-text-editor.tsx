import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import { AutoLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
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
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import DOMPurify from "isomorphic-dompurify";
import {
  $createParagraphNode,
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
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import cn from "@/lib/utils";

import type {
  EditorState,
  EditorThemeClasses,
  LexicalEditor,
  TextFormatType,
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
