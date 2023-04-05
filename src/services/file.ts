const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as any);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  });
};

const urlToBase64 = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        resolve(reader.result as any);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
};

const getBase64Size = (base64String: string) => {
  let padding, inBytes, base64StringLength;
  if (base64String.endsWith("==")) padding = 2;
  else if (base64String.endsWith("==")) padding = 1;
  else padding = 0;

  base64StringLength = base64String.length;
  inBytes = (base64StringLength / 4) * 3 - padding;
  return inBytes / 1000;
};

const imageThumbnail = (base64Image: string, callback: any) => {
  const image = new Image();

  image.onload = function () {
    const width = image.width,
      height = image.height,
      canvas = document.createElement("canvas"),
      context = canvas.getContext("2d") as any;

    canvas.width = width / 4;
    canvas.height = height / 4;
    context.drawImage(
      image,
      0,
      0,
      width,
      height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    callback(context.canvas.toDataURL("image/jpeg", 0.5));
  };

  image.src = base64Image;
};

const isBase64 = (str: string) => {
  if (str === "" || str.trim() === "") {
    return false;
  }
  try {
    return btoa(atob(str)) == str;
  } catch (err) {
    return false;
  }
};

export const fileSvc = {
  isBase64,
  fileToBase64,
  getBase64Size,
  urlToBase64,
  imageThumbnail,
};
