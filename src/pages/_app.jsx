// _app.tsx
import { useEffect, useState, createContext } from "react";
import 'src/styles/globals.css';
import 'src/styles/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { ChakraProvider } from '@chakra-ui/react'
export const AppContext = createContext(null);

export default function App({ Component, pageProps }) {
  const [state, setState] = useState({});
  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
    const storedUserName = sessionStorage.getItem("userName");
    const storedPassword = sessionStorage.getItem("password");

    setState(userInfo);
    setCredentials({
      userName: storedUserName || "",
      password: storedPassword || ""
    });
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  return (
<ChakraProvider>
  
    <AppContext.Provider value={{ state, setState, credentials, setCredentials }}>
      <Component {...pageProps} />
    </AppContext.Provider>
</ChakraProvider>
  );
}
