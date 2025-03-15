import { useSelector } from "react-redux";

const useLoginUser = () => {
  const { user } = useSelector((state) => state.user);
  return { user };
};

export default useLoginUser;
