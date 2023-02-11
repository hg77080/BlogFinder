import React from "react";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
export default function Editor() {
  const [value, setValue] = React.useState(
    "Hello Markdown! `Tab` key uses default behavior"
  );
  return (
    <div className="mt-4 ml-4">
      {/* <Button>Button</Button> */}
      <MDEditor
        style={{ width: "70vw" }}
        value={value}
        height={500}
        toolbarHeight={60}
        onChange={(val) => {
          setValue(val!);
        }}
        // previewOptions={{}}
        // preview={"preview"}
      />
    </div>
  );
}
