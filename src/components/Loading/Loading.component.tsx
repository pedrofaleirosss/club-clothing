import Colors from "../../theme/theme.colors";
import { LoadingContainer } from "./Loading.styles";
import { SyncLoader } from "react-spinners";

const Loading = () => {
  return (
    <LoadingContainer>
      <SyncLoader size={30} color={Colors.background.dark} />
    </LoadingContainer>
  );
};

export default Loading;
