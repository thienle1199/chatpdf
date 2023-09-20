"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { type PutBlobResult } from "@vercel/blob";

const FileUpload = () => {
  const { getInputProps, getRootProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
    },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("acceptedFiles", acceptedFiles);
      const file = acceptedFiles[0];

      if (file.size > 4.5 * 1024 * 1024) {
        throw new Error("File can't exeed 4.5MB, please select another file");
      }

      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });

      const newBlob = (await response.json()) as PutBlobResult;
      console.log("newBlob", newBlob);
    },
  });
  return (
    <div className="bg-white p-2 rounded-xl">
      <div
        {...getRootProps({
          className:
            "borrder-dash border-2 rounded-xl cursor-poiter bg-gray-50 py-8 flex",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox />
          <p className="mt-2 text-sm text-slate-400">Drop your PDF Here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
