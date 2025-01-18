import Colors from "../../theme/theme.colors";
import { LoadingContainer } from "./loading.styles";
import { MoonLoader } from "react-spinners";

const Loading = () => {
  return (
    <LoadingContainer>
      <MoonLoader size={30} color={Colors.background.dark} />
    </LoadingContainer>
  );
};

export default Loading;
