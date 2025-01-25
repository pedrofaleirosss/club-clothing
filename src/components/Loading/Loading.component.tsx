import Colors from "../../theme/theme.colors";
import { LoadingContainer } from "./loading.styles";
import { MoonLoader } from "react-spinners";

interface LoadingProps {
  message?: string;
}

const Loading = ({ message }: LoadingProps) => {
  return (
    <LoadingContainer>
      {message && <p>{message}</p>}
      <MoonLoader size={30} color={Colors.background.dark} />
    </LoadingContainer>
  );
};

export default Loading;
