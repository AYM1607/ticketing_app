import axios from "axios";

const Index = ({ currentUser }) => {
  console.log(currentUser);
  return <h1>Landing</h1>;
};

Index.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // We're on the server.
    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );
    return data;
  } else {
    // We're on the browser.
    const { data } = await axios.get("/api/users/currentuser");
    return data;
  }
};

export default Index;
