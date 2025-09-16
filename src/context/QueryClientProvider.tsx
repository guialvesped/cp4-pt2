import { QueryClient, QueryClientProvider as TanstackProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function QueryClientProvider({children}:{children:React.ReactNode}){
    return(
        <TanstackProvider client={queryClient}>
            {children}
        </TanstackProvider>
    )
}