import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import {
  $createLinkNode,
  AutoLinkNode,
  LinkNode,
  TOGGLE_LINK_COMMAND,
} from "@lexical/link";
import {
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListItemNode,
  ListNode,
} from "@lexical/list";
import {
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  CHECK_LIST,
  HEADING,
  INLINE_CODE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  LINK as LINK_TRANSFORMER,
  ORDERED_LIST,
  QUOTE,
  STRIKETHROUGH,
  UNORDERED_LIST,
} from "@lexical/markdown";
import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from "@lexical/react/LexicalAutoLinkPlugin";
import { CheckListPlugin } from "@lexical/react/LexicalCheckListPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { TabIndentationPlugin } from "@lexical/react/LexicalTabIndentationPlugin";
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
  $getSelection,
  $insertNodes,
  $isRangeSelection,
  $setSelection,
  COMMAND_PRIORITY_LOW,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  PASTE_COMMAND,
} from "lexical";
import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListChecks,
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
  Klass,
  LexicalEditor,
  LexicalNode,
  TextFormatType,
  TextNode,
} from "lexical";
import type { ComponentProps, ReactNode, RefObject } from "react";

/** Imperative handle exposed via `editorApi` for clearing/focusing the editor. */
export interface EditorApi {
  clearContent: () => void;
  focus: () => void;
}

/** Default node-class theme, mapped onto Sigil/Tailwind tokens. Override via the `theme` prop. */
const defaultTheme: EditorThemeClasses = {
  paragraph: "mb-2 last:mb-0",
  heading: {
    h1: "mt-4 mb-2 font-bold text-xl first:mt-0",
    h2: "mt-3 mb-2 font-bold text-lg first:mt-0",
    h3: "mt-3 mb-1 font-semibold text-base first:mt-0",
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

/**
 * Markdown shortcuts the editor understands as you type (e.g. `- ` for a
 * bullet, `1. ` for a numbered list, `# ` for a heading, `> ` for a quote,
 * `**bold**`, `` `code` ``). Code blocks are intentionally excluded (the
 * editor does not register a code-block node by default).
 */
const MARKDOWN_TRANSFORMERS = [
  HEADING,
  QUOTE,
  UNORDERED_LIST,
  ORDERED_LIST,
  CHECK_LIST,
  BOLD_ITALIC_STAR,
  BOLD_ITALIC_UNDERSCORE,
  BOLD_STAR,
  BOLD_UNDERSCORE,
  ITALIC_STAR,
  ITALIC_UNDERSCORE,
  STRIKETHROUGH,
  INLINE_CODE,
  LINK_TRANSFORMER,
];

// Matches absolute URLs (with scheme or a leading `www.`) so a bare link the
// user types or pastes becomes an anchor. Bare domains like `example.com` are
// intentionally left alone to avoid linkifying things like `file.txt`.
const URL_MATCHER =
  /((https?:\/\/(www\.)?)|(www\.))[-\w@:%.+~#=]{1,256}\.[a-z]{2,6}\b([-\w@:%+.~#?&/=]*)/i;
const EMAIL_MATCHER = /[\w.+-]+@([\w-]+\.)+[a-z]{2,}/i;

/**
 * AutoLink matchers turning bare URLs and email addresses into links as the
 * user types or pastes. Scheme-less URLs get an `https://` prefix; emails get a
 * `mailto:` scheme.
 */
const AUTO_LINK_MATCHERS = [
  createLinkMatcherWithRegExp(URL_MATCHER, (text) =>
    text.startsWith("http") ? text : `https://${text}`,
  ),
  createLinkMatcherWithRegExp(EMAIL_MATCHER, (text) => `mailto:${text}`),
];

/**
 * Normalize a pasted token into a link href, or null when it is not a single
 * URL/email. Drives "paste a URL over a selection to link it": only a lone
 * token (no whitespace) that reads as a URL or email becomes a link, so pasting
 * a sentence still replaces the selection as text.
 */
const linkFromText = (text: string): string | null => {
  const value = text.trim();
  if (!value || /\s/.test(value)) return null;
  if (/^https?:\/\/\S+$/i.test(value)) return value;
  if (/^www\.\S+$/i.test(value)) return `https://${value}`;
  if (/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) return `mailto:${value}`;
  return null;
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

/** Minimal formatting toolbar: bold, italic, lists, link, optional checklist. */
const Toolbar = ({ enableChecklist }: { enableChecklist?: boolean }) => {
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
      {enableChecklist && (
        <ToolbarButton
          label="Checklist"
          onClick={() =>
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined)
          }
        >
          <ListChecks />
        </ToolbarButton>
      )}
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

/**
 * Link affordances for selections: paste a URL over highlighted text to wrap it
 * in a link, and Cmd/Ctrl+K to link the selection (the keyboard equivalent of
 * the toolbar link button). Both no-op on a collapsed selection so normal paste
 * and other shortcuts are untouched.
 */
const LinkShortcutsPlugin = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    const unregisterPaste = editor.registerCommand<ClipboardEvent>(
      PASTE_COMMAND,
      (event) => {
        const selection = $getSelection();
        if (!$isRangeSelection(selection) || selection.isCollapsed()) {
          return false;
        }
        const href = linkFromText(
          event.clipboardData?.getData("text/plain") ?? "",
        );
        if (!href) return false;
        event.preventDefault();
        editor.dispatchCommand(TOGGLE_LINK_COMMAND, href);
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );

    const unregisterShortcut = editor.registerCommand<KeyboardEvent>(
      KEY_MODIFIER_COMMAND,
      (event) => {
        const isLinkShortcut =
          (event.metaKey || event.ctrlKey) &&
          !event.altKey &&
          event.key.toLowerCase() === "k";
        if (!isLinkShortcut) return false;

        const selection = $getSelection();
        if (!$isRangeSelection(selection) || selection.isCollapsed()) {
          return false;
        }
        event.preventDefault();
        const url = window.prompt("Link URL");
        if (url?.trim()) {
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, url.trim());
        }
        return true;
      },
      COMMAND_PRIORITY_LOW,
    );

    return () => {
      unregisterPaste();
      unregisterShortcut();
    };
  }, [editor]);

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

/** An item offered in the `#`-reference typeahead (e.g. an issue/post). */
export interface IssueReferenceItem {
  /** Stable id (e.g. post rowId). */
  id: string;
  /** Numeric reference inserted after `#` (e.g. an issue number). */
  number: number;
  /** Title, shown in the menu. */
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
 * title and inserts the selected reference as plain `#<number>` text (GitHub
 * `#123` style). Consumers linkify the inserted reference when rendering.
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
  /** Show a checklist (task list) button in the toolbar and enable the plugin. */
  enableChecklist?: boolean;
  /** Extra Lexical node classes to register (e.g. an app's image node). */
  extraNodes?: ReadonlyArray<Klass<LexicalNode>>;
  /** Extra Lexical plugins rendered inside the composer (e.g. image paste, code highlighting). */
  plugins?: ReactNode;
  /** Override the node-class theme (e.g. to match an app's prose styling). */
  theme?: EditorThemeClasses;
  /** Class applied to the loading skeleton. */
  skeletonClassName?: string;
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
  enableChecklist,
  extraNodes,
  plugins,
  theme,
  skeletonClassName,
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
      <Skeleton
        className={cn("h-24 w-full rounded-md", skeletonClassName ?? className)}
        {...rest}
      />
    );
  }

  const initialConfig = {
    namespace: "RichTextEditor",
    theme: theme ?? defaultTheme,
    editable,
    onError: (error: Error) => console.error("Lexical error:", error),
    nodes: [
      HeadingNode,
      QuoteNode,
      ListNode,
      ListItemNode,
      LinkNode,
      AutoLinkNode,
      ...(extraNodes ?? []),
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
        {!hideToolbar && editable && (
          <Toolbar enableChecklist={enableChecklist} />
        )}

        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className={cn(
                  // 16px floor on mobile stops iOS Safari from auto-zooming the
                  // viewport on focus (it zooms any field under 16px and never
                  // zooms back out); drop to 14px from md up to match Input/Textarea
                  "min-h-20 px-3 py-2 text-base outline-none md:text-sm",
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
          {enableChecklist && <CheckListPlugin />}
          {/* Tab / Shift+Tab to indent + nest list items */}
          <TabIndentationPlugin />
          {/* markdown-style input: `- `, `1. `, `# `, `> `, `**bold**`, etc. */}
          <MarkdownShortcutPlugin transformers={MARKDOWN_TRANSFORMERS} />
          <LinkPlugin />
          {/* paste a URL over a selection to link it; Cmd/Ctrl+K to link */}
          <LinkShortcutsPlugin />
          {/* turn bare URLs / emails into links as they are typed or pasted */}
          <AutoLinkPlugin matchers={AUTO_LINK_MATCHERS} />
          {mentionItems?.length ? (
            <MentionTypeahead items={mentionItems} />
          ) : null}
          {issueReferenceItems?.length ? (
            <IssueReferenceTypeahead items={issueReferenceItems} />
          ) : null}
          {plugins}
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

// Matches a bare URL (scheme or `www.`) or email in a run of text. Combined
// into one pass so a generated anchor is never re-scanned (e.g. the address in
// `https://user@host` is not also matched as an email).
const LINKIFY_PATTERN =
  /(?:https?:\/\/|www\.)[^\s<]+|[^\s<@]+@[^\s<@]+\.[a-z]{2,}/gi;
// Trailing sentence punctuation that should sit outside the link, not in it.
const TRAILING_PUNCTUATION = /[.,!?;:)\]]+$/;

/**
 * Linkify bare URLs and email addresses in a rich-text HTML string so plain
 * links in stored content render as anchors. Splits on tags so matching only
 * happens in text (never inside attributes), and skips text already inside an
 * anchor so existing links are never double-wrapped.
 */
const linkifyBareUrls = (html: string): string => {
  let anchorDepth = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((segment) => {
      if (segment.startsWith("<")) {
        if (/^<a[\s>]/i.test(segment)) anchorDepth++;
        else if (/^<\/a\s*>/i.test(segment) && anchorDepth > 0) anchorDepth--;
        return segment;
      }
      if (anchorDepth > 0) return segment;
      return segment.replace(LINKIFY_PATTERN, (match) => {
        const isEmail =
          match.includes("@") && !/^(https?:\/\/|www\.)/i.test(match);
        const trailing = isEmail
          ? ""
          : (TRAILING_PUNCTUATION.exec(match)?.[0] ?? "");
        const core = trailing ? match.slice(0, -trailing.length) : match;
        const href = isEmail
          ? `mailto:${core}`
          : core.startsWith("http")
            ? core
            : `https://${core}`;
        return `<a href="${href}">${core}</a>${trailing}`;
      });
    })
    .join("");
};

// Markdown inline link `[text](url)`, restricted to real link targets
// (http(s), mailto, or a root-relative path) so prose like `[label](note)` is
// left alone. DOMPurify is the backstop for the resulting href.
const MARKDOWN_LINK_PATTERN =
  /\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|\/[^\s)]*)\)/g;

/**
 * Collapse markdown inline links `[text](url)` into anchors. The keystroke-only
 * MarkdownShortcutPlugin never converts links that are pasted (or otherwise not
 * typed character by character), so they reach storage as literal markdown;
 * this renders them as proper labeled links. Splits on tags so matching only
 * happens in text, and skips text already inside an anchor. Run before
 * {@link linkifyBareUrls} so the target becomes the href instead of being
 * re-linkified as bare text.
 */
const linkifyMarkdownLinks = (html: string): string => {
  let anchorDepth = 0;
  return html
    .split(/(<[^>]+>)/)
    .map((segment) => {
      if (segment.startsWith("<")) {
        if (/^<a[\s>]/i.test(segment)) anchorDepth++;
        else if (/^<\/a\s*>/i.test(segment) && anchorDepth > 0) anchorDepth--;
        return segment;
      }
      if (anchorDepth > 0) return segment;
      return segment.replace(
        MARKDOWN_LINK_PATTERN,
        (_match, text, url) => `<a href="${url}">${text}</a>`,
      );
    })
    .join("");
};

/**
 * Open external links in a new tab without leaking the opener. Relative links
 * (e.g. in-app issue references) are left to navigate in the same tab.
 */
const openLinksInNewTab = (node: Element): void => {
  const href = node.tagName === "A" ? node.getAttribute("href") : null;
  if (href && /^https?:\/\//i.test(href)) {
    node.setAttribute("target", "_blank");
    node.setAttribute("rel", "noopener noreferrer");
  }
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

  // Collapse pasted markdown links first, then linkify any remaining bare
  // URLs/emails (incl. legacy plain-text content); add the hook around this
  // single synchronous sanitize so the new-tab behavior does not leak onto
  // other DOMPurify callers.
  DOMPurify.addHook("afterSanitizeAttributes", openLinksInNewTab);
  const clean = DOMPurify.sanitize(
    linkifyBareUrls(linkifyMarkdownLinks(html)),
    {
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
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "span",
      ],
      ALLOWED_ATTR: ["href", "target", "rel", "class"],
    },
  );
  DOMPurify.removeHook("afterSanitizeAttributes");

  return (
    <div
      className={cn(
        "[&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2 [&_blockquote]:my-2 [&_blockquote]:border-border [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_blockquote]:italic [&_code]:rounded [&_code]:bg-muted [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_h1]:font-bold [&_h1]:text-xl [&_h2]:font-bold [&_h2]:text-lg [&_h3]:font-semibold [&_h3]:text-base [&_ol]:ml-5 [&_ol]:list-decimal [&_ol_ol]:list-[lower-alpha] [&_p:last-child]:mb-0 [&_p]:mb-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul_ul]:list-[circle]",
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
