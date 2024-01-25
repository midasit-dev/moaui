import React from "react";
import { createRoot } from "react-dom/client";
import MidasController from "@midasit-dev/moaui/Components/MidasController";

const MidasControllerWrapper = () => {
  const [manifest, setManifest] = React.useState({});
  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/manifest.json`)
      .then((response) => response.json())
      .then((data) => setManifest(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <MidasController
      icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}
      title={manifest.name}
    />
  );
};

const rootMidasController = createRoot(
  document.getElementById("midas-controller")
);
rootMidasController.render(<MidasControllerWrapper />);
