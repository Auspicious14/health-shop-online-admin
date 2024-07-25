import axios from "axios";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import { IRequestSchema } from "./model";
import { getCookie } from "../../helper";

export const apiReqHandler = async ({
  endPoint,
  payload,
  method,
}: IRequestSchema) => {
  const bearerAuth = getCookie("token");

  let reqConfig = {
    url: endPoint,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    credentials: "include",
  };

  if (bearerAuth) {
    // @ts-ignore
    reqConfig.headers.Authorization = `Bearer ${bearerAuth}`;
  }

  if (payload) {
    // @ts-ignore
    reqConfig.data = payload;
  }

  try {
    const res = await axios(reqConfig);

    if (!res)
      toast.error("Error sending request", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    if (res && res.data.status === "Error")
      toast.error(res.data.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    if (res?.data?.status === "OK")
      toast.success("Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    return {
      res: res ? res : null,
    };
  } catch (err: any) {
    toast.error(err.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    return { res: null };
  }
};
