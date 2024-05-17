import { Request } from 'express';

export const appendFilePathToRequestBody = (req: Request, key: string) => {
  // prepare image path and append in request body if image is uploaded
  console.log(req.file?.destination);
  if (req.file) {
    // prepare image path
    const imagePath = ((req.file?.destination as string) +
      req.file?.filename) as string;

    // Remove "./public/" from the imagePath
    let newPath = '';
    if (imagePath) {
      newPath = imagePath.replace('./public/', '');
    }

    // append logo path to the body payload
    req.body[key] = newPath;
  }

  return req.body;
};

export const appendFilesPathToRequestBody = (req: Request, key: string) => {
  // prepare image path and append in request body if image is uploaded
  if (req.files) {
    // prepare image path
    const images = (req?.files as any)?.map((file: any) => {
      // prepare image path
      const imagePath = ((file?.destination as string) +
        file?.filename) as string;

      // Remove "./public/" from the imagePath
      let newPath = '';
      if (imagePath) {
        newPath = imagePath.replace('./public/', '');
      }

      return newPath;
    });

    // append logo path to the body payload
    req.body[key] = images;
  }

  return req.body;
};
