import PulseLoader from 'react-spinners/PulseLoader'
import { CSSProperties } from "react";

interface IPropTypes {
  loaded: boolean
  onlySpinner: boolean
  children?: any
}

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

function Loader(props: IPropTypes): JSX.Element {
  if (!props.loaded || props.onlySpinner) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <PulseLoader color="#00dfff" cssOverride={override} loading />
        </div>
      </div>
    )
  } else {
    return (
      <>
        {props.loaded && props.children}
      </>
    )
  }
}

export default Loader
