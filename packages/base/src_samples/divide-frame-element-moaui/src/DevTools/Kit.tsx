import React from "react";
import { GuideBox } from "@midasit-dev/moaui";
import Home from "./Tools/Home";
import Playground, { type Schema } from "@midasit-dev/playground";
import SideMenu from "./SideMenu";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AppSchemaStateForExport, AppSchemaStateForImport, CurrentMenuState } from "./recoilState";

const useStateKit = () => {
  const [title, setTitle] = React.useState("");
  React.useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/manifest.json`)
      .then((response) => response.json())
      .then((data) => (data.name ? setTitle(data.name) : null))
      .catch((error) => console.error("Error fetching manifest.json:", error));
  }, []);

  const [containerSize, setContainerSize] = React.useState({
    width: 0,
    height: 0,
  });

  return {
    title,
    setTitle,
    containerSize,
    setContainerSize,
  };
};

interface KitProps {
  children: React.ReactNode;
  bgColorState: [string, React.Dispatch<React.SetStateAction<string>>];
}

const Kit = (props: KitProps) => {
  const { children, bgColorState } = props;

  const [bgColor, setBgColor] = bgColorState;
  const { title, setTitle, containerSize, setContainerSize } = useStateKit();

  const currentMenu = useRecoilValue(CurrentMenuState);
	const appSchemaStateForImport = useRecoilValue(AppSchemaStateForImport);
	const setAppSchemaStateForExport = useSetRecoilState(AppSchemaStateForExport);

	const sideMenuRef = React.useRef<HTMLDivElement>(null);

  return (
    <GuideBox width="100%" height="100vh">
      <div className="w-full h-[56px] z-0" ref={sideMenuRef}>
        <SideMenu sideMenuRef={sideMenuRef} />
      </div>

      {currentMenu === "Home" && (
        <div className="w-full z-[200]">
          <Home
            title={title}
            setTitle={setTitle}
            containerSize={containerSize}
            setContainerSize={setContainerSize}
            bgColor={bgColor}
            setBgColor={setBgColor}
          >
            {children}
          </Home>
        </div>
      )}

      {currentMenu === "Playground" && (
        <div className="w-full">
          <Playground
            schema={appSchemaStateForImport}
            onChange={(schema: Schema) => setAppSchemaStateForExport(schema)}
          />
        </div>
      )}
    </GuideBox>
  );
};

export default Kit;
