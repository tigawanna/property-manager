import { useRef, useEffect } from "react";
import Editor, { type EventMap } from "@toast-ui/editor";
import type { EditorProps, EventNames } from "./types";

export default function MyToastUIEditor(props: EditorProps) {
  const rootEl = useRef<HTMLDivElement>(null);
  const editorInst = useRef<Editor | null>(null);

  const getBindingEventNames = () => {
    return Object.keys(props)
      .filter((key) => /^on[A-Z][a-zA-Z]+/.test(key))
      .filter((key) => props[key as EventNames]);
  };

  const bindEventHandlers = () => {
    // biome-ignore lint/complexity/noForEach: <explanation>
    getBindingEventNames().forEach((key) => {
      const eventName = key[2].toLowerCase() + key.slice(3);
      editorInst.current?.off(eventName);
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      editorInst.current?.on(eventName, props[key as EventNames]!);
    });
  };

  const getInitEvents = () => {
    return getBindingEventNames().reduce(
      (acc: Record<string, EventMap[keyof EventMap]>, key) => {
        const eventName = (key[2].toLowerCase() +
          key.slice(3)) as keyof EventMap;
        acc[eventName] = props[key as EventNames];
        return acc;
      },
      {},
    );
  };

  useEffect(() => {
    if (!rootEl.current) return;
    editorInst.current = new Editor({
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      el: rootEl.current!,
      ...props,
      events: getInitEvents(),
    });

    const addfsClick = () => {
      const editorUI = document.querySelector("#my-toastui-editor");

      editorUI?.classList.add(
        "!h-screen",
        "z-50",
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "bottom-0",
        "!animate-in",
        "duration-1000",
      );
    };
    const removefsClick = () => {
      const editorUI = document.querySelector("#my-toastui-editor");
      editorUI?.classList.remove(
        "!h-screen",
        "z-50",
        "fixed",
        "top-0",
        "left-0",
        "right-0",
        "bottom-0",
      );
    };
    // const toolbar = editorInst.current.getInstance().getUI().getToolbar();
    const fullscreenButton = document.createElement("button");
    fullscreenButton.type = "button";
    fullscreenButton.textContent = "<F>";
    fullscreenButton.addEventListener("click", addfsClick);
    const minimizeButton = document.createElement("button");
    minimizeButton.type = "button";
    minimizeButton.textContent = ">f<";
    minimizeButton.addEventListener("click", removefsClick);

    editorInst.current.insertToolbarItem(
      {
        groupIndex: 1,
        itemIndex: 5,
      },
      {
        name: "fs-button",
        el: fullscreenButton,
        tooltip: "full screen",
      },
    );
    editorInst.current.insertToolbarItem(
      {
        groupIndex: 1,
        itemIndex: 6,
      },
      {
        name: "reduce-button",
        el: minimizeButton,
        tooltip: "minimize full screen",
      },
    );
  }, []);

  useEffect(() => {
    const instance = editorInst.current;
    const { height, previewStyle } = props;

    if (height && props.height !== height) {
      instance?.setHeight(height);
    }

    if (previewStyle && props.previewStyle !== previewStyle) {
      instance?.changePreviewStyle(previewStyle);
    }

    bindEventHandlers();
  }, [props]);

  return (
    <div
      id="my-toastui-editor"
      ref={rootEl}
      className="w-full  "
    />
  );
}
