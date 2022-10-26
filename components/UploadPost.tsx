import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import type { NextPage } from "next";
import { CameraIcon } from "@heroicons/react/outline";
import { Modal } from "antd";

interface IUploadPostProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const UploadPost: NextPage<IUploadPostProps> = ({ open, setOpen }) => {
  return (
    <Modal
      open={open}
      footer={null}
      maskClosable={false}
      onCancel={() => setOpen(false)}
      width={380}
    >
      <div className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-red-100">
        <CameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
      </div>

      <div>
        <div className="mt-3 text-center sm:mt-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload a photo</h3>

          <div>
            <input type="file" hidden />
          </div>

          <div className="mt-2">
            <input
              className="w-full border-none text-center focus:ring-0"
              type="text"
              placeholder="Please enter a caption..."
            />
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 hover:bg-red-700 hover:disabled:bg-gray-300 sm:text-sm"
        >
          Upload Post
        </button>
      </div>
    </Modal>
  );
};
