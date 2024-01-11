import { CloseOutlined } from "@ant-design/icons";
import { Card, Divider } from "antd";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useState } from "react";
// import { AiOutlineClose } from "react-icons/ai";

interface IProps {
  title?: string;
  show: boolean;
  children: React.ReactNode;
  possition?: "left" | "right";
  onDimiss?: () => void;
  closeBtnClassName?: string;
  containerClassName?: string;
  notOverflow?: boolean;
  otherProps?: React.ReactNode;
}

export const ApModal: React.FC<IProps> = ({
  title,
  show,
  otherProps,
  containerClassName,
  children,
  possition = "right",
  onDimiss,
  notOverflow,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <>
      {show && (
        // <Card
        //   className="w-full fixed top-0 left-0 bottom-0"
        //   style={{
        //     background: "#403c3c75",
        //     height: "100vw",
        //     zIndex: 20,
        //   }}
        // >
        //   <div
        //     style={{ zIndex: 100 }}
        //     className={` bg-white overflow-hidden h-screen fixed top-0 ${
        //       notOverflow ? null : "overflow-y-scroll"
        //     }  ${containerClassName}`}
        //   >
        //     <div className="flex justify-between items-center ">
        //       {title && (
        //         <h1 className="text-lg font-bold uppercase  w-full p-4">
        //           {title}
        //         </h1>
        //       )}
        //       <CloseOutlined
        //         onClick={onDimiss}
        //         className={` z-50 text-black `}
        //       />
        //     </div>
        //     <Divider />

        //     {children}
        //   </div>
        // </Card>
        <Transition.Root show={show} as={Fragment}>
          <Dialog
            as="div"
            className={`relative z-50 ${containerClassName}`}
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="mx-24 my-12 p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="max-w-full relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all ">
                    <div className="w-full bg-white px-4 sm:p-6 sm:pb-4">
                      <div className="flex justify-between items-center ">
                        {title && (
                          <h1 className="text-lg font-bold uppercase  w-full">
                            {title}
                          </h1>
                        )}
                        <CloseOutlined
                          onClick={onDimiss}
                          className={` z-50 text-black `}
                        />
                      </div>
                      <Divider />
                      {children}
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={onDimiss}
                      >
                        Cancel
                      </button>
                      {otherProps && otherProps}
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      )}
    </>
  );
};
