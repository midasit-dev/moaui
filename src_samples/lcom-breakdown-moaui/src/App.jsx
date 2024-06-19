import * as React from "react";
import { GuideBox, Panel } from "@midasit-dev/moaui";
import Sep from "@midasit-dev/moaui/Components/Separator";
import { useSnackbar, SnackbarProvider } from "notistack";
import * as Buttons from "./Components/Buttons";
import { midasAPI } from "./Function/Common";
import { VerifyUtil, VerifyDialog } from "@midasit-dev/moaui";
import Textfield from "@midasit-dev/moaui/Components/TextField";
import { CheckGroup, Check } from "@midasit-dev/moaui";
import { Button } from "@midasit-dev/moaui";
import { Radio, RadioGroup } from "@midasit-dev/moaui";
import { useEffect } from "react";
import { useState } from "react";

function Separator() {
  return (
    <div width="100%">
      <Sep direction="vertical" />
    </div>
  );
}

function App() {
  const [showDialog, setDialogShowState] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState(["Fx"]);
  const [all, setAll] = useState(false);
  const [comb, setComb] = useState({});
  const [elem,setelement] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRadio, setSelectedRadio] = useState("");
  const [newLoadCaseName, setNewLoadCaseName] = useState("");
  const [selectedObject] = useState(null);
  const [selectedPart, setSelectedPart] = useState("I"); 
  let successfulEndpoint = null;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRange, setSelectedRange] = useState(["max"]);
  const [loading] = useState(false);
  const LoadingSpinner = () => {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  };
  const handleBreakdown = async () => {
    try {
      setIsLoading(true);
      await BreakdownData(selectedCheckboxes, selectedRange);
      // After BreakdownData completes
      setIsLoading(false);
    } catch (error) {
      // Handle errors
      setIsLoading(false);
    }
  };
  

  const handleCheckboxChange = (name) => {
    if (selectedCheckboxes.includes(name)) {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((checkbox) => checkbox !== name)
      );
    } else {
      setSelectedCheckboxes([...selectedCheckboxes, name]);
    }
  };

  const handleSelectAll = () => {
    if (all) {
      setSelectedCheckboxes([]);
    } else {
      setSelectedCheckboxes(["Fx", "Fy", "Fz", "Mx", "My", "Mz"]);
    }
    setAll(!all);
  };

  const handleRangeChange = (e) => {
    const value = e.target.name;

    if (selectedRange.includes(value)) {
      setSelectedRange(selectedRange.filter((range) => range !== value));
    } else {
      setSelectedRange([...selectedRange, value]);
    }
  };

 
  function getAdjustedLCName(lcname, loadCombinations, name, loadNames_getAdjusted) {
    const combinationEntry = Object.values(loadCombinations).find(
        (combination) => combination.NAME === lcname
    );

    // Check if lcname is present in the loadNames_getAdjusted array
    const isInLoadNamesGetAdjusted = loadNames_getAdjusted.includes(lcname);

    if ((combinationEntry && combinationEntry.iTYPE === 1) || isInLoadNamesGetAdjusted) {
        lcname += `(${name})`;
    }

    return lcname;
}


  async function searchLoadCombination(factor,vcombArray,newVCOMB,loadNames,loadCombinations,selectedObject,beamforces,userSelection,name, loadNames_getAdjusted) {
    const forceIndexMapping = {Fx:4,Fy:5,Fz: 6,Mx:7,My:8, Mz:9,};
    const selectedForceIndex = forceIndexMapping[userSelection];
    let existingVCOMBIndex;
    if (selectedObject.iTYPE === 0) {
      
      for (const vcombObj of vcombArray) {
        let lcname = vcombObj.LCNAME;
        if (loadNames.includes(lcname)) {
          existingVCOMBIndex = newVCOMB.findIndex(item => item.LCNAME === lcname);
          if (existingVCOMBIndex !== -1) {
            newVCOMB[existingVCOMBIndex].FACTOR += factor * vcombObj.FACTOR;
          } else {
            newVCOMB.push({
              ANAL: vcombObj.ANAL,
              LCNAME: lcname,
              FACTOR: factor * vcombObj.FACTOR,
            });
          }
        } else {
          let foundLoadCombination = null;

          for (const loadCombinationKey in loadCombinations) {
            const loadCombination = loadCombinations[loadCombinationKey];

            if (loadCombination.NAME === lcname) {
              foundLoadCombination = loadCombination;
              foundLoadCombination.VCOMB = loadCombination.vCOMB
              break;   
            }
          }

          // If foundVCOMB is not null, call searchLoadCombination recursively with foundVCOMB
          if (foundLoadCombination) {
            await searchLoadCombination(
              factor * vcombObj.FACTOR,
              foundLoadCombination.VCOMB, // Pass the found vCOMB list
              newVCOMB,
              loadNames,
              loadCombinations,
              foundLoadCombination,
              beamforces,
              userSelection,
              name, loadNames_getAdjusted
            );
          }
        }
      }
      return newVCOMB; // Return the updated newVCOMB array

    }
    else {

      // Variables to track the maximum and minimum force values and corresponding factors
      let maxForceValue = Number.NEGATIVE_INFINITY;
      let minForceValue = Number.POSITIVE_INFINITY;
      let maxVcombObj = null; // This will hold the vCOMB object with the maximum force value
      let minVcombObj = null; // This will hold the vCOMB object with the minimum force value
      let maxCorrespondingFactor = 0; // This will hold the factor for the maximum force value
      let minCorrespondingFactor = 0; // This will hold the factor for the minimum force value
     
      // Iterate through each vCOMB object in the vcombArray
      for (const vcombObj of vcombArray) {
        // Extract the LCNAME from the vCOMB object
        let lcname = vcombObj.LCNAME;

        // Adjust the lcname based on its corresponding entry's iTYPE in loadCombinations
        lcname = getAdjustedLCName(lcname, loadCombinations, name, loadNames_getAdjusted); // Updated to pass name parameter
        console.log(lcname);
        // Filter `beamforces.DATA` to find entries that match the adjusted LCNAME (`lcname`)
        const filteredForces = beamforces.BeamForce.DATA.filter(
          (force) => force[2] === lcname
        );
        console.log(filteredForces);

        for (const forceData of filteredForces) {
          let selectedForceValue = forceData[selectedForceIndex] * vcombObj.FACTOR;
          if (name === "max") {
            // Update maxForceValue and maxCorrespondingFactor if necessary
            if (selectedForceValue > maxForceValue) {
              maxForceValue = selectedForceValue;
              maxVcombObj = vcombObj; // Update the maximum vCOMB object
              maxCorrespondingFactor = factor * vcombObj.FACTOR; // Update the corresponding factor
            }
          } else if (name === "min") {
            // Update minForceValue and minCorrespondingFactor if necessary
            if (selectedForceValue < minForceValue) {
              minForceValue = selectedForceValue;
              minVcombObj = vcombObj; // Update the minimum vCOMB object
              minCorrespondingFactor = factor * vcombObj.FACTOR; // Update the corresponding factor
            }
          }
        }
      }

      // Handle the maximum and minimum vCOMB objects found
      if (name === "max" && maxVcombObj) {
        // Check if LCNAME is present in loadNames
        if (loadNames.includes(maxVcombObj.LCNAME)) {
          // Update newVCOMB array
            existingVCOMBIndex = newVCOMB.findIndex(
            (item) => item.LCNAME === maxVcombObj.LCNAME
          );
          if (existingVCOMBIndex !== -1) {
            // Update the factor for the existing entry
            newVCOMB[existingVCOMBIndex].FACTOR += maxCorrespondingFactor;
          } else {
            // Add a new entry to newVCOMB
            newVCOMB.push({
              ANAL: maxVcombObj.ANAL,
              LCNAME: maxVcombObj.LCNAME,
              FACTOR: maxCorrespondingFactor,
            });
          }
        } else {
          // Search for lcname in loadCombinations and handle accordingly
          for (const loadCombination of Object.values(loadCombinations)) {

            if (name === "max" && loadCombination.NAME === maxVcombObj.LCNAME) {
              // Check if all vcombObj objects inside the load combination are present in loadNames
              const allLCNamesPresentInCombination = loadCombination.vCOMB.every(
                (vcombObj) => loadNames.includes(vcombObj.LCNAME)
              );

              // If all LCNAME values are present in loadNames, return the complete maxVcombObj
              if (allLCNamesPresentInCombination) {
                let targetLoadCombination = null;
                for (const loadCombinationKey in loadCombinations) {
                  const currentLoadCombination = loadCombinations[loadCombinationKey];
                  if (currentLoadCombination.NAME === maxVcombObj.LCNAME) {
                    targetLoadCombination = currentLoadCombination;
                    break;
                  }
                }
                if (allLCNamesPresentInCombination) {
                  let targetLoadCombination = null;
                  for (const loadCombinationKey in loadCombinations) {
                      const currentLoadCombination = loadCombinations[loadCombinationKey];
                      // Check if the LCNAME matches the current loadCombination's NAME
                      if (currentLoadCombination.NAME === maxVcombObj.LCNAME) {
                          targetLoadCombination = currentLoadCombination;
                          break; // Exit the loop as we found the matching LCNAME
                      }
                  }
              
                  if (targetLoadCombination) {
                      if (targetLoadCombination.iTYPE === 1) {
                          // Call searchLoadCombination recursively
                          await searchLoadCombination(
                              maxCorrespondingFactor,
                              targetLoadCombination.vCOMB,
                              newVCOMB,
                              loadNames,
                              loadCombinations,
                              targetLoadCombination,
                              beamforces,
                              userSelection,
                              name, loadNames_getAdjusted
                          );
                      } else {
                          for (const vcomb of targetLoadCombination.vCOMB) {
                              const existingVCOMBIndex = newVCOMB.findIndex(item => item.LCNAME === vcomb.LCNAME);
              
                              if (existingVCOMBIndex !== -1) {
                                  // If an entry with the same LCNAME exists, update its FACTOR
                                  newVCOMB[existingVCOMBIndex].FACTOR += vcomb.FACTOR * maxCorrespondingFactor;
                              } else {
                                  // If no entry with the same LCNAME exists, create a new one
                                  newVCOMB.push({
                                      ANAL: vcomb.ANAL,
                                      LCNAME: vcomb.LCNAME,
                                      FACTOR: vcomb.FACTOR * maxCorrespondingFactor
                                  });
                              }
                          }
              
                          return newVCOMB;
                      }
                  }
              }
              
              
                
              } else {
                const newSelectedObject = loadCombination;
                await searchLoadCombination(
                  maxCorrespondingFactor,
                  loadCombination.vCOMB,
                  newVCOMB,
                  loadNames,
                  loadCombinations,
                  newSelectedObject,
                  beamforces,
                  userSelection,
                  name, loadNames_getAdjusted
                );
                break;
              }
            }
          }
        }
      } else if (name === "min" && minVcombObj) {
        if (loadNames.includes(minVcombObj.LCNAME)) {
          
          const existingVCOMBIndex = newVCOMB.findIndex(
            (item) => item.LCNAME === minVcombObj.LCNAME
          );
          if (existingVCOMBIndex !== -1) {
            
            newVCOMB[existingVCOMBIndex].FACTOR += minCorrespondingFactor;
          } else {
            
            newVCOMB.push({
              ANAL: minVcombObj.ANAL,
              LCNAME: minVcombObj.LCNAME,
              FACTOR: minCorrespondingFactor,
            });
          }
        } else {
         
          for (const loadCombination of Object.values(loadCombinations)) {
            if (loadCombination.NAME === minVcombObj.LCNAME) {
              
              const allLCNamesPresentInCombination = loadCombination.vCOMB.every(
                (vcombObj) => loadNames.includes(vcombObj.LCNAME)
              );

              
              if (allLCNamesPresentInCombination) {
                let targetLoadCombination = null;
                for (const loadCombinationKey in loadCombinations) {
                    const currentLoadCombination = loadCombinations[loadCombinationKey];
                    // Check if the LCNAME matches the current loadCombination's NAME
                    if (currentLoadCombination.NAME === minVcombObj.LCNAME) {
                        targetLoadCombination = currentLoadCombination;
                        break; // Exit the loop as we found the matching LCNAME
                    }
                }
            
                if (targetLoadCombination) {
                    if (targetLoadCombination.iTYPE === 1) {
                        // Call searchLoadCombination recursively
                        await searchLoadCombination(
                            minCorrespondingFactor,
                            targetLoadCombination.vCOMB,
                            newVCOMB,
                            loadNames,
                            loadCombinations,
                            targetLoadCombination,
                            beamforces,
                            userSelection,
                            name, loadNames_getAdjusted
                        );
                    } else {
                        for (const vcomb of targetLoadCombination.vCOMB) {
                            const existingVCOMBIndex = newVCOMB.findIndex(item => item.LCNAME === vcomb.LCNAME);
            
                            if (existingVCOMBIndex !== -1) {
                                // If an entry with the same LCNAME exists, update its FACTOR
                                newVCOMB[existingVCOMBIndex].FACTOR += vcomb.FACTOR * minCorrespondingFactor;
                            } else {
                                // If no entry with the same LCNAME exists, create a new one
                                newVCOMB.push({
                                    ANAL: vcomb.ANAL,
                                    LCNAME: vcomb.LCNAME,
                                    FACTOR: vcomb.FACTOR * minCorrespondingFactor
                                });
                            }
                        }
            
                        return newVCOMB;
                    }
                }
            }
            else {
                const newSelectedObject = loadCombination;
                await searchLoadCombination(
                  minCorrespondingFactor,
                  loadCombination.vCOMB,
                  newVCOMB,
                  loadNames,
                  loadCombinations,
                  newSelectedObject,
                  beamforces,
                  userSelection,
                  name, loadNames_getAdjusted
                );
                break; 
              }
            }
          }
        }

        return newVCOMB;
      }
    }
  }

  async function add_envelope(selectedObject, loadNames, loadCombinations, selectedForce, beamforces, name, loadNames_getAdjusted) {
    console.log(selectedForce)
    const newLoadCaseNameValue = newLoadCaseName || selectedObject.NAME;
      let factor = 1;
      let newVCOMB = [];
      searchLoadCombination(
        factor,
        selectedObject.vCOMB,
        newVCOMB,
        loadNames,
        loadCombinations,
        selectedObject,
        beamforces,
        selectedForce,
        name, loadNames_getAdjusted
      );
      console.log(newVCOMB);
      const newLoadCaseNameValue_selectedForce = `${newLoadCaseNameValue}_${selectedForce}`;

      const newObject = {
        ...selectedObject,
        NAME: newLoadCaseNameValue_selectedForce,
        vCOMB: newVCOMB,
      };

      console.log(newObject);
      return newObject;
    // }
  }

  async function BreakdownData(selectedForces, selectedRange) {
    if (selectedForces.length===0 && selectedRange.length===0){
      enqueueSnackbar("Error: Please Select a Force and Evelope type", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
      });
      return;
    }
    if (selectedRange.length===0){
      enqueueSnackbar("Error: Please Select Envelope Type", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
      });
      return;
    }
    if (selectedForces.length===0){
      enqueueSnackbar("Error: Please Select a Force", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
      });
      return;
    }
    await fetchData();
    const LoadCombinations = comb;

    let lastKey = parseInt(Object.keys(LoadCombinations).pop(), 10);
    console.log("Last key:", lastKey);

    console.log(LoadCombinations);
    loadCombinations = Object.values(LoadCombinations);
    console.log(LoadCombinations);
    console.log(loadCombinations);

    const inputObject = {
      Argument: {
        TABLE_NAME: "BeamForce",
        TABLE_TYPE: "BEAMFORCE",
        EXPORT_PATH: "C:\\MIDAS\\Result\\Output.JSON",
        UNIT: {
          FORCE: "kN",
          DIST: "m",
        },
        STYLES: {
          FORMAT: "Fixed",
          PLACE: 12,
        },
        COMPONENTS: [
          "Elem",
          "Load",
          "Part",
          "Axial",
          "Shear-y",
          "Shear-z",
          "Torsion",
          "Moment-y",
          "Moment-z",
        ],
        NODE_ELEMS: {
          KEYS: [1],
        },
        LOAD_CASE_NAMES: ["load(CB:all)"],
        PARTS: [`Part ${selectedPart}`],
      },
    };
    const cs_forces = {
      Argument: {
        TABLE_NAME: "BeamForce",
        TABLE_TYPE: "BEAMFORCE",
        EXPORT_PATH: "C:\\MIDAS\\Result\\Output.JSON",
        STYLES: {
          FORMAT: "Fixed",
          PLACE: 12,
        },
        COMPONENTS: [
          "Elem",
          "Load",
          "Part",
          "Axial",
          "Shear-y",
          "Shear-z",
          "Torsion",
          "Moment-y",
          "Moment-z",
        ],
        NODE_ELEMS: {
          KEYS:  [1],
        },
        LOAD_CASE_NAMES:  ["Summation(CS)","Dead Load(CS)","Tendon Primary(CS)","Creep Primary(CS)","Shrinkage Primary(CS)","Tendon Secondary(CS)","Creep Secondary(CS)","Shrinkage Secondary(CS)"],
        PARTS: [`Part ${selectedPart}`],
        OPT_CS: true,
        STAGE_STEP: [],
      },
    };
    const stct = await midasAPI("GET", "/db/stct");
    const stldData = await midasAPI("GET", "/db/stld");
    const smlc = await midasAPI("GET", "/db/smlc");
    const mvldid = await midasAPI("GET", "/db/mvldid");
    const mvld = await midasAPI("GET","/db/mvld");
    const mvldch = await midasAPI("GET","/db/mvldch");
    const mvldeu = await midasAPI("GET","/db/mvldeu");
    const mvldbs = await midasAPI("GET","/db/mvldbs");
    const mvldpl = await midasAPI("GET","/db/mvldpl")
    const splc = await midasAPI("GET", "/db/splc");
    const loadNames = [
      "Dead Load",
      "Tendon Primary",
      "Creep Primary",
      "Shrinkage Primary",
      "Tendon Secondary",
      "Creep Secondary",
      "Shrinkage Secondary",
    ];
    const loadNames_getAdjusted = [];

    const loadCombinationNames_max = Object.values(loadCombinations)
      .filter((combination) => typeof combination === "object") 
      .map((combination) => {
        const names_max = [];
        if (combination.iTYPE === 0) {
          names_max.push(`${combination.NAME}(CBC:max)`);
          names_max.push(`${combination.NAME}(CBC)`);
          names_max.push(`${combination.NAME}(CB:max)`);
          names_max.push(`${combination.NAME}(CB)`);
          names_max.push(`${combination.NAME}(CBS:max)`);
          names_max.push(`${combination.NAME}(CBS)`);
          names_max.push(`${combination.NAME}(CBR:max)`);
          names_max.push(`${combination.NAME}(CBR)`);
          names_max.push(`${combination.NAME}(CBSC:max)`);
          names_max.push(`${combination.NAME}(CBSC)`);
        } else if (combination.iTYPE === 1) {
          names_max.push(`${combination.NAME}(CB:max)`);
          names_max.push(`${combination.NAME}(CBC:max)`);
          names_max.push(`${combination.NAME}(CBS:max)`);
          names_max.push(`${combination.NAME}(CBR:max)`);
          names_max.push(`${combination.NAME}(CBSC:max)`);
        }
        return names_max;
      })
      .flat() 
      .filter((name) => name !== null);

    const loadCombinationNames_min = Object.values(loadCombinations)
      .filter((combination) => typeof combination === "object") // Filter out non-object properties
      .map((combination) => {
        const names_min = [];
        if (combination.iTYPE === 0) {
          names_min.push(`${combination.NAME}(CBC:min)`);
          names_min.push(`${combination.NAME}(CBC)`);
          names_min.push(`${combination.NAME}(CB:min)`);
          names_min.push(`${combination.NAME}(CB)`);
          names_min.push(`${combination.NAME}(CBS:min)`);
          names_min.push(`${combination.NAME}(CBS)`);
          names_min.push(`${combination.NAME}(CBR:min)`);
          names_min.push(`${combination.NAME}(CBR)`);
          names_min.push(`${combination.NAME}(CBSC:min)`);
          names_min.push(`${combination.NAME}(CBSC)`);
        } else if (combination.iTYPE === 1) {
          names_min.push(`${combination.NAME}(CB:min)`);
          names_min.push(`${combination.NAME}(CBC:min)`);
          names_min.push(`${combination.NAME}(CBS:min)`);
          names_min.push(`${combination.NAME}(CBR:min)`);
          names_min.push(`${combination.NAME}(CBSC:min)`);
        }
        return names_min;
      })
      .flat()
      .filter((name) => name !== null);

    if (stct && stct.STCT) {
      for (const key in stct.STCT) {
        const item = stct.STCT[key];
        if (item.vEREC) {
          item.vEREC.forEach((erec) => {
            if (erec.LTYPECC) {
              loadNames.push(erec.LTYPECC);
              loadCombinationNames_max.push(`${erec.LTYPECC}(CS)`);
              loadCombinationNames_min.push(`${erec.LTYPECC}(CS)`);
              cs_forces.Argument.LOAD_CASE_NAMES.push(`${erec.LTYPECC}(CS)`);
            }
          });
        }
      }
    }
    if (stldData && Object.keys(stldData)[0].length > 0) {
      const stldKeys = Object.keys(stldData)[0];
      if (stldKeys && stldKeys.length > 0) {
        for (const key in stldData[stldKeys]) {
          if (stldData[stldKeys].hasOwnProperty(key)) {
            const name = stldData[stldKeys][key].NAME;
            loadNames.push(name);
            loadCombinationNames_max.push(`${name}(ST)`);
            loadCombinationNames_min.push(`${name}(ST)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${name}(ST)`);
          }
        }
      }
    }
    if (smlc && smlc.SMLC) {
      for (const key in smlc.SMLC) {
        const item = smlc.SMLC[key];
        if (item.NAME) {
          const smlcName = item.NAME;
          loadNames.push(smlcName);
          loadCombinationNames_max.push(`${smlcName}(SM:max)`);
          loadCombinationNames_min.push(`${smlcName}(SM:min)`);
          inputObject.Argument.LOAD_CASE_NAMES.push(`${smlcName}(SM:max)`);
          inputObject.Argument.LOAD_CASE_NAMES.push(`${smlcName}(SM:min)`);
          loadNames_getAdjusted.push(smlcName);
        }
      }
    }

    if (mvldid && mvldid.MVLDID) {
      for (const key in mvldid.MVLDID) {
        if (mvldid.MVLDID.hasOwnProperty(key)) {
          const item = mvldid.MVLDID[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    console.log(mvldid);
    if (mvld && mvld.MVLD) {
      for (const key in mvld.MVLD) {
        if (mvld.MVLD.hasOwnProperty(key)) {
          const item = mvld.MVLD[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    if (mvldch && mvldch.MVLDCH) {
      for (const key in mvldch.MVLDCH) {
        if (mvldch.MVLDCH.hasOwnProperty(key)) {
          const item = mvldch.MVLDCH[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    if (mvldeu && mvldeu.MVLDEU) {
      for (const key in mvldeu.MVLDEU) {
        if (mvldeu.MVLDEU.hasOwnProperty(key)) {
          const item = mvldeu.MVLDEU[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    if (mvldbs && mvldbs.MVLDBS) {
      for (const key in mvldbs.MVLDBS) {
        if (mvldbs.MVLDBS.hasOwnProperty(key)) {
          const item = mvldbs.MVLDBS[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    if (mvldpl && mvldpl.MVLDPL) {
      for (const key in mvldpl.MVLDPL) {
        if (mvldpl.MVLDPL.hasOwnProperty(key)) {
          const item = mvldpl.MVLDPL[key];

          if (item && item.LCNAME) {
            loadNames.push(item.LCNAME);
            loadCombinationNames_max.push(`${item.LCNAME}(MV:max)`);
            loadCombinationNames_min.push(`${item.LCNAME}(MV:min)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:max)`);
            inputObject.Argument.LOAD_CASE_NAMES.push(`${item.LCNAME}(MV:min)`);
            loadNames_getAdjusted.push(item.LCNAME);
          }
        }
      }
    }
    if (splc && splc.SPLC) {
      for (const key in splc.SPLC) {
        const item = splc.SPLC[key];
        if (item.NAME) {
          const spName = item.NAME;
          loadNames.push(spName);
          loadCombinationNames_max.push(`${spName}(RS)`);
          loadCombinationNames_min.push(`${spName}(RS)`);
          inputObject.Argument.LOAD_CASE_NAMES.push(`${spName}(RS)`);
        }
      }
    }
    let newLoadCombinations = { ...LoadCombinations };

    const selectedComb = combArray.find(
      (item) => item.NAME === selectedRadio
    );
    if (selectedComb === undefined || selectedComb === null) {

      enqueueSnackbar("Please Select a Load Combination", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        },
      });
      return null;
    }
    const allLCNamesPresent = selectedComb.vCOMB.every((vcombObj) =>
      loadNames.includes(vcombObj.LCNAME)
    );

    if (allLCNamesPresent && selectedComb.iTYPE === 0) {
     
      enqueueSnackbar("All loadcases are already present inside the LoadCombination", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center"
        // },  
      }});
      return;
    }
    let a = 0;
    for (let i = 0; i < elementArray.length; i++) {
    console.log(elementArray.length);
    const loadCombinationSets = [
      { name: "max", loadCombinationNames: loadCombinationNames_max },
      { name: "min", loadCombinationNames: loadCombinationNames_min },
    ];
    inputObject.Argument.NODE_ELEMS.KEYS = [elementArray[i]];
    cs_forces.Argument.NODE_ELEMS.KEYS = [elementArray[i]];
    console.log(cs_forces);
    console.log(inputObject);

    for (const { name, loadCombinationNames } of loadCombinationSets) {
      console.log(`Processing ${name} load combinations`);
      
      
      if (selectedRange.includes(name)) {
        console.log(`Processing ${name} load combinations`);
        cs_forces.Argument.STAGE_STEP = `Min/Max:${name}`;
        console.log(cs_forces);
        let iterationOffset = 0 + a;

        for (const selectedForce of selectedForces) {
          const updatedArgument = {
            ...inputObject.Argument,
            LOAD_CASE_NAMES: loadCombinationNames.map((name) => `${name}`),
          };

          console.log(updatedArgument);
          let static_forces = await midasAPI("POST", "/post/table", {
            Argument: updatedArgument,
          });
          console.log(static_forces)
          
          if ('error' in static_forces) {
            enqueueSnackbar("Please perform Analysis before load-Comb breakdown", {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            return null;
          }
          let cstr_forces = await midasAPI("POST", "/post/table", {
            Argument: cs_forces.Argument,
          });
          
          if ('error' in cstr_forces) {
            enqueueSnackbar("Please perform Analysis before load-Comb breakdown", {
              variant: "error",
              anchorOrigin: {
                vertical: "top",
                horizontal: "center",
              },
            });
            return null;
          }
          console.log(cstr_forces);
          const forces = {
            ...static_forces,
            BeamForce: {
              ...static_forces.BeamForce,
              DATA: static_forces.BeamForce.DATA.concat(cstr_forces.BeamForce.DATA),
            },
          };
          console.log('forces:', forces);
         

          console.log(
            `Beam forces for ${selectedForce} with ${name} load combinations:`,
            forces
          );


          iterationOffset += 1;
          const selectedComb = combArray.find(
            (item) => item.NAME === selectedRadio
          );
          console.log(
            `Selected combination for ${selectedForce} with ${name} load combinations:`,
            selectedComb
          );

          if (!selectedComb) {
            console.log(
              `Error: No selected combination found for ${selectedForce} with ${name} load combinations.`
            );
            continue;
          }

          console.log(
            `iTYPE of selected combination for ${selectedForce} with ${name} load combinations:`,
            selectedComb.iTYPE
          );
          let updatedObject = null;
          if (selectedComb.iTYPE === 0 || selectedComb.iTYPE === 1) {
            updatedObject = await add_envelope(selectedComb, loadNames, loadCombinations, selectedForce, forces, name, loadNames_getAdjusted);
          }

          if (updatedObject) {
            const newLoadCombinationID = lastKey + iterationOffset;
            console.log(`New Load Combination ID: ${newLoadCombinationID}`);
            updatedObject.iTYPE = 0;
            updatedObject.NAME = `${updatedObject.NAME}_${name}_${elementArray[i]}`;
            if (updatedObject.NAME.length > 20) {
               enqueueSnackbar("Error: Load combination name length exceeds 20 characters. Reduce the load combination name length.", {
                variant: "error",
                anchorOrigin: {
                vertical: "top",
                horizontal: "center",
               },
            });
            return;
            }
            const payload = {
              Assign: updatedObject,
            };
            newLoadCombinations[newLoadCombinationID] = payload.Assign;

            console.log(
              `Updating object for force ${selectedForce} with ${name} load combinations:`,
              updatedObject
            );

            console.log(
              `Updated object for force ${selectedForce} with ${name} load combinations:`,
              updatedObject
            );
          } else {
            console.log(
              `Error: Updated object is null for force ${selectedForce} with ${name} load combinations.`
            );
          }
          a = iterationOffset;
        }
      }
    }
  }
    const response = await midasAPI("PUT", `${successfulEndpoint}`, {
      Assign: newLoadCombinations,
    });
    console.log(response)
    if ('LCOM-GEN' in response || 'LCOM-CONC' in response || 'LCOM-SRC' in response || 'LCOM-STEEL' in response || 'LCOM-STLCOMP' in response) {
      enqueueSnackbar("Load-Combination Generated Successfully", {
        variant: "success",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    } else {
      console.log("Response error:", response);
      enqueueSnackbar("Error in Generating Load-Combination", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
    }
    console.log("New Load Combinations:", response);
  }



  let loadCombinations;

  const importLoadCombinations = async () => {
    await fetchData();
    await fetchElement();
  };

  async function fetchElement() {
    try {
      const response = await midasAPI("GET", "/view/select");

      if (response.error) {
        console.error(`Error fetching element data: ${response.error.message}`);
        return null;
      }

      const elements = response["SELECT"]["ELEM_LIST"];
      console.log("Elements:", elements);

      if (elements.length === 0) {
        enqueueSnackbar("Please Select an Element", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        setelement([' ']);
        return null; 
      }
      if (elements.length > 5) {
        enqueueSnackbar("Please select upto 5 elements only", {
          variant: "warning",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
        return null;
      }
      setelement(elements);
      return elements;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  }

  async function fetchData() {
      const endpointsDataKeys = [
        { endpoint: "/db/lcom-gen", dataKey: "LCOM-GEN" },
        { endpoint: "/db/lcom-conc", dataKey: "LCOM-CONC" },
        { endpoint: "/db/lcom-src", dataKey: "LCOM-SRC" },
        { endpoint: "/db/lcom-steel", dataKey: "LCOM-STEEL" },
        { endpoint: "/db/lcom-stlcomp", dataKey: "LCOM-STLCOMP" },
      ];

      for (const { endpoint, dataKey } of endpointsDataKeys) {
        try {
          const response = await midasAPI("GET", endpoint);
          if (response && !response.error) {
            setComb(response[dataKey]);
            console.log(`Data from ${endpoint}:`, response[dataKey]);
            successfulEndpoint = endpoint;
            return; 
          } else {
            enqueueSnackbar("Please Check Connection And Defined Load Combination", {
                  variant: "error",
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "center"        
                  },
                });
                return null;
          }
        } catch (error) {
          console.error(`Error fetching data from ${endpoint}:`, error);
          enqueueSnackbar("Unable to Fetch Data Check Connection", {
            variant: "error",
            anchorOrigin: {
              vertical: "top",
              horizontal: "center"        
            },
          });
          return null;
        }
      }
      if (combArray.length===0) {
        enqueueSnackbar("Please Define Load Combination", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center"        
          },
        });
        return;
      }
      fetchElement();
    
  }

  useEffect(() => {
    if (
      !VerifyUtil.isExistQueryStrings("redirectTo") &&
      !VerifyUtil.isExistQueryStrings("mapiKey")
    ) {
      setDialogShowState(true);
    }
  }, []);
  const combArray = Object.values(comb);
  console.log(combArray);
  const elementArray = Object.values(elem);
  

  return (
    <div className="App">
      {loading && <LoadingSpinner />}
      {showDialog && <VerifyDialog />}
      <GuideBox padding={2} center>
        <Panel width={520} height={400} variant="shadow2">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Panel width={255} height={330} marginX={1} marginTop={2}>
              <div
                style={{
                  color: "gray",
                  fontSize: "14px",
                  marginBottom: "10px",
                }}
              >
                Select Load Combination
              </div>
              <div style={{ overflowY: "auto", maxHeight: "280px" }}>
                <RadioGroup onChange={(e) => setSelectedRadio(e.target.value)}>
                  {combArray.map((c) => (
                    <Radio key={c.NAME} name={c.NAME} value={c.NAME} />
                  ))}
                </RadioGroup>
              </div>
            </Panel>

            <Panel width={255} height={330} marginTop={2} padding={0.25}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  justifyContent: "space-between",
                }}
              >
                <span style={{ fontSize: "14px", color: "gray" }}>
                  Options for Breakdown
                </span>
                <br></br>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      height: "24px",
                      display: "inline-block",
                      verticalAlign: "bottom",
                      marginTop: "4px",
                    }}
                  >
                    LCB Title:
                  </span>
                  <Textfield
                    id="load-case-name"
                    value={newLoadCaseName}
                    onChange={(e) => setNewLoadCaseName(e.target.value)}
                    placeholder={
                      selectedObject
                        ? selectedObject.Name
                        : "Enter load case name"
                    }
                    title=""
                    titlewidth="70px"
                    width="100px"
                    spacing="50px"
                  />
                </div>
                <br></br>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontSize: "14px", marginTop: "0px" }}>
                    Target Element
                  </span>
                  <div
                    style={{
                      borderBottom: "1px solid gray",
                      height: "16px",
                      width: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ fontSize: "12px", paddingBottom: "2px" }}>
                      {elementArray.join(",")}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>End</span>
                  <RadioGroup
                    margin={1}
                    onChange={(e) => setSelectedPart(e.target.value)} 
                    value={selectedPart} 
                    text=""
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "start",
                        justifyContent: "space-between",
                        marginRight: "5px",
                        height: "20px",
                        width: "70px",
                      }}
                    >
                      <Radio
                        name="i"
                        value="I"
                        label="Part I" 
                        checked={selectedPart === "I"} 
                      />
                      <Radio
                        name="j"
                        value="J"
                        label="Part J" 
                        checked={selectedPart === "J"} 
                      />
                    </div>
                  </RadioGroup>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>Envelope Type</span>
                  <CheckGroup onChange={handleRangeChange}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Check
                        name="max"
                        label="Max"
                        checked={!!selectedRange.includes("max")}
                      />
                      <Check
                        name="min"
                        label="Min"
                        checked={!!selectedRange.includes("min")}
                      />
                    </div>
                  </CheckGroup>
                </div>
              </div>
              <Separator />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "gray",
                    marginBottom: "6px",
                  }}
                >
                  Critical L.C from View by Max Value
                </span>
                <CheckGroup text="">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-around",
                      flexWrap: "wrap",
                      height: "fit-content",
                      width: "100%",
                      margin: "0",
                      marginBottom: "6px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      {/* Adjust each checkbox's "checked" attribute and "onChange" handler */}
                      <Check
                        name="Fx"
                        width="100px"
                        height="30px"
                        checked={selectedCheckboxes.includes("Fx") || all}
                        onChange={() => handleCheckboxChange("Fx")}
                      />
                      <div style={{ marginRight: "0.4px" }}>
                        <Check
                          name="Fy"
                          width="100px"
                          height="30px"
                          checked={selectedCheckboxes.includes("Fy") || all}
                          onChange={() => handleCheckboxChange("Fy")}
                        />
                      </div>
                      <div style={{ marginRight: "4.2px" }}>
                        <Check
                          name="Fz"
                          height="30px"
                          checked={selectedCheckboxes.includes("Fz") || all}
                          onChange={() => handleCheckboxChange("Fz")}
                        />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginBottom: "5px",
                      }}
                    >
                      <Check
                        name="Mx"
                        checked={selectedCheckboxes.includes("Mx") || all}
                        onChange={() => handleCheckboxChange("Mx")}
                      />
                      <Check
                        name="My"
                        checked={selectedCheckboxes.includes("My") || all}
                        onChange={() => handleCheckboxChange("My")}
                      />
                      <Check
                        name="Mz"
                        checked={selectedCheckboxes.includes("Mz") || all}
                        onChange={() => handleCheckboxChange("Mz")}
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      height: "20px",
                      marginLeft: "0px",
                    }}
                  >
                    <Button
                      color="normal"
                      onClick={handleSelectAll}
                      width="100%"
                      variant="outlined"
                      style={{ color: "black" }}
                    >
                      {all ? "Deselect All" : "Select All"}
                    </Button>
                  </div>
                </CheckGroup>
              </div>
            </Panel>
          </div>
          {/* <br></br> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0px",
              marginTop: "10px",
              marginBottom: "30px",
            }}
          >
            {Buttons.NormalButton("contained","Import Load Combinations",importLoadCombinations)}
             {Buttons.MainButton("contained",isLoading ? "Loading..." : "Breakdown Data",handleBreakdown)}
          </div>
        </Panel>
      </GuideBox>
    </div>
  );
}

function AppWithSnackbar() {
  return (
    <SnackbarProvider maxSnack={1}>
      <App />
    </SnackbarProvider>
  );
}
export default AppWithSnackbar;
