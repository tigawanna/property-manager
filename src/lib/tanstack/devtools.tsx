import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
interface ReactQueryDevtoolsWrapperProps {}

export default function ReactQueryDevtoolsWrapper({}: ReactQueryDevtoolsWrapperProps) {
  return <ReactQueryDevtools initialIsOpen={false} />;
}
