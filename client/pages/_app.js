import "bootstrap/dist/css/bootstrap.css";

// This component overrides the default component wrapper that next uses.
// Any global css needs to be imported here since it's the only component
// that's guaranteed to be loaded on every route.
const App = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default App;
