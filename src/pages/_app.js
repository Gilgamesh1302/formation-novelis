import LayoutWithHeader from "@/layout/LayoutWithHeader";
import "../styles/globals.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";


const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => (<LayoutWithHeader>{page}</LayoutWithHeader>))
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </Provider>
  );
}
