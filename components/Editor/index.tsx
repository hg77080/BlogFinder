import React, { useState } from "react";
import Logo from "@/public/assets/blogLogo.png";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Box, Button, Input, Link, Text } from "@chakra-ui/react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });
export default function Editor() {
  const [value, setValue] = useState(
    "Hello Markdown! `Tab` key uses default behavior"
  );
  const [selectedView, setSelectedView] = useState<"edit" | "preview">("edit");
  return (
    <>
      <Box className="flex items-center justify-between w-[60vw] pt-4 ml-4">
        <Box className="flex items-center gap-[16px]">
          <Link href="/">
            <img src={Logo.src} height="50px" width="50px" />
          </Link>
          <Text fontSize="md" fontWeight={500}>
            Create Post
          </Text>
        </Box>
        <Box className="flex items-center gap-[16px]">
          <Button
            variant="ghost"
            className={`${selectedView == "edit" ? "text-primaryBlue" : ""}`}
            onClick={() => setSelectedView("edit")}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className={`${selectedView == "preview" ? "text-primaryBlue" : ""}`}
            onClick={() => setSelectedView("preview")}
          >
            Preview
          </Button>
        </Box>
      </Box>
      <Box className="flex gap-4 mt-4 ml-10 mr-10">
        <Box className="ml-4 bg-[#fff] w-[60vw] flex flex-col m-auto border-[1px] border-solid border-borderColor rounded-lg">
          <Box className="pl-12 pt-5 pr-5 pb-5 flex flex-col">
            <Button
              size="md"
              height="48px"
              width="200px"
              border="2px"
              borderColor="#dfdfe0"
            >
              Add a cover image
            </Button>
            <Input
              border={0}
              fontSize={40}
              fontWeight={800}
              marginTop={8}
              paddingInlineStart={0}
              focusBorderColor={"#fff"}
              placeholder="New post title here...."
              _placeholder={{
                color: "rgb(82, 82, 82)",
                fontSize: "40px",
                fontWeight: "800",
              }}
            />
            <Input
              border={0}
              fontSize={16}
              fontWeight={400}
              focusBorderColor={"#fff"}
              paddingInlineStart={0}
              marginTop={4}
              placeholder="Add upto 4 tags..."
              _placeholder={{
                opacity: 0.6,
                color: "rgb(82, 82, 82)",
                fontSize: "16px",
                fontWeight: "400",
              }}
            />
          </Box>
          <MDEditor
            style={{ width: "100%" }}
            value={value}
            height={300}
            toolbarHeight={60}
            onChange={(val) => {
              setValue(val!);
            }}
            // previewOptions={{}}
            preview={selectedView}
          />
        </Box>
        <Box className=" h-auto w-[30vw] border-[1px] border-solid border-borderColor p-16">
          <Text fontSize="24px" fontWeight={500}>Editor Basics</Text>
        </Box>
      </Box>
    </>
  );
}
