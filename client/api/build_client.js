import axios from "axios";

const buildClient = ({ req }) => {
  if (typeof window === "undefined") {
    // We're in the server.
    return axios.create({
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // We're in the browser.
    return axios.create({ baseURL: "/" });
  }
};

export default buildClient;
