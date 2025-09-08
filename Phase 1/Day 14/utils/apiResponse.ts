export const successResponse = (data: any, message = "Success") => {
  return {
    status: "success",
    message,
    data,
  };
};

export const errorResponse = (message = "Something went wrong") => {
  return {
    status: "error",
    message,
  };
};
