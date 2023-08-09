export default function handler(req, res) {
  if (req.method === "POST") {
    //process a post request
  } else {
    //handle any other http method
  }
  res.status(200).json({ name: "John Doe" });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
