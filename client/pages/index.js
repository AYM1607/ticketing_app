import buildClient from "../api/build_client";

const Index = ({ currentUser }) => {
  return <h1>{currentUser ? "You are signed in" : "You are NOT signed in"}</h1>;
};

Index.getInitialProps = async (context) => {
  const client = buildClient(context);
  const { data } = await client.get("/api/users/currentuser");
  return data;
};

export default Index;
