import buildClient from "../api/build_client";

import Header from "../components/header";

import "bootstrap/dist/css/bootstrap.css";

// This component overrides the default component wrapper that next uses.
// Any global css needs to be imported here since it's the only component
// that's guaranteed to be loaded on every route.
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

// The context for the custom app component is
// different from a normal page.
AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
