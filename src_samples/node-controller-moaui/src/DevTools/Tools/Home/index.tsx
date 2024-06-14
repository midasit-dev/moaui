import { useState } from "react";
import { GuideBox, Panel, MidasController } from "@midasit-dev/moaui";
import { default as ToolsHome } from "./PanelRight";
import { AnimatePresence, motion } from "framer-motion";

const App = (props: any) => {
  const {
    children,
    title,
    setTitle,
    containerSize,
    setContainerSize,
    bgColor,
    setBgColor,
  } = props;

  const [isOpen, setOpen] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        className="w-full h-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <GuideBox show width="100%" row fill="#f5f6f7">
					<div className='w-auto h-[calc(100vh-56px)] justify-center items-center flex flex-grow z-0'>
            <div id="container">
              <Panel
                variant="shadow2"
                padding={0}
                borderRadius="4px"
                border="1px solid #a7a777a"
              >
                <div className="w-auto">
                  <MidasController
                    icoSrc={`${process.env.PUBLIC_URL}/favicon.ico`}
                    title={title}
                  />
                  {children}
                </div>
              </Panel>
            </div>
					</div>

          <motion.div
            className="fixed top-[24px] right-[24px] w-auto h-auto z-1"
            animate={isOpen ? "open" : "closed"}
          >
            <motion.div
							className="hidden"
              variants={{
                open: { display: 'flex', opacity: 1, x: 0 },
                closed: { display: 'none', opacity: 0, x: 350 },
              }}
            >
              <Panel
                variant="box"
                backgroundColor="#fff"
                padding={0}
                borderRadius="4px"
                border="1px solid #d1d1d1"
              >
                <GuideBox width={350} padding={2}>
                  <GuideBox width="100%">
                    <ToolsHome
                      titleState={[title, setTitle]}
                      containerSizeState={[containerSize, setContainerSize]}
                      bgColorState={[bgColor, setBgColor]}
                    />
                  </GuideBox>
                </GuideBox>
              </Panel>
            </motion.div>

            <motion.div className="fixed bottom-[24px] right-[24px]">
              <motion.div
                className="w-10 h-10 cursor-pointer"
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                onClick={() => setOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <SvgMinimize />
              </motion.div>
            </motion.div>
          </motion.div>
        </GuideBox>
      </motion.div>
    </AnimatePresence>
  );
};

export default App;

const SvgMinimize = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15 18L9 12L15 6"
      stroke="#353a3e"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
