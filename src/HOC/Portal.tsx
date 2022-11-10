import React from "react";
import ReactDOM from "react-dom";

const Portal = ({ children }: any) => {
  const [container] = React.useState(() => document.createElement("div"));
  const root = document.body.children[0] as HTMLElement;

  React.useEffect(() => {
    root.appendChild(container);
    return () => {
      root.removeChild(container);
    };
  }, []);
  return ReactDOM.createPortal(children, container);
};

export default Portal;
