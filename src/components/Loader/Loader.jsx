import { BallTriangle } from "react-loader-spinner";
import css from "./Loader.module.css";

function Loader() {
  return (
    <BallTriangle
      height={48}
      width={48}
      radius={5}
      color="#535bf2"
      ariaLabel="ball-triangle-loading"
      wrapperStyle={{}}
      wrapperClass={css.loader}
      visible={true}
    />
  );
}

export default Loader;
