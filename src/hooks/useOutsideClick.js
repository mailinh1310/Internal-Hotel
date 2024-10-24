import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleCLick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("Click bên ngoài");
          handler();
        }
      }

      document.addEventListener("click", handleCLick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleCLick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}

export default useOutsideClick;
