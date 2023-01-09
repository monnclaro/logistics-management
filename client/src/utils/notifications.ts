import toast from "react-hot-toast";

export const deletionNotify = () =>
  toast.success("Successfully deleted!", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#1f61fb",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#1f61fb",
    },
  });

export const deleteErrorNotify = () =>
  toast.error("This didn't work.", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#FF0000",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#FF0000",
    },
  });

export const creationNotify = () =>
  toast.success("Successfully created!", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#1f61fb",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#1f61fb",
    },
  });

export const creationErrorNotify = () =>
  toast.error("This didn't work.", {
    position: "bottom-right",
    style: {
      borderRadius: "10px",
      background: "#FF0000",
      color: "#fff",
      fontSize: "15px",
    },
    iconTheme: {
      primary: "#FFF",
      secondary: "#FF0000",
    },
  });
