import UserProvider from "../context/userContext";
import "../styles/globalStyles.css";
import Layout from "../src/components/organisms/Layout";

// Custom App to wrap it with context provider
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
