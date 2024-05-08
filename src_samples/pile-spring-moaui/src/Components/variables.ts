import {SetRecoilState, atom, selector,DefaultValue} from 'recoil';
import {FoundationCoordinates, CalculatePileCoordinates, ExtractNumbers, CalculatePileCenterCoordinates} from '../utils_pyscript';
/** App variables */

export const ProjectName = atom({
    key: 'ProjectName',
    default: 'Test'
});

/** Pile Properties variables */
export const FoundationWidth = atom({
    key: 'Width',
    default: 10
});

export const SideLength = atom({
    key: 'SideLength',
    default: 10
});

export const TopLevel = atom({
    key: 'TopLevel',
    default: 50
});

/** Pile Initial Settings variables */

export const PileName = atom({
    key: 'PileName',
    default: 'Test1'
});

export const PileLength = atom({
    key: 'PileLength',
    default: 10
});

export const PileType = atom({
    key: 'varPileType',
    default: '현장타설말뚝'
});

export const ConstructionMethod = atom({
    key: 'ConstructionMethod',
    default: '타격말뚝(타격 공법)'
});

export const HeadCondition = atom({
    key: 'HeadCondition',
    default: '강결'
});

export const BottomCondition = atom({
    key: 'BottomCondition',
    default: '자유'
});



/** Basic Section variables */
export const ConcreteModulus_Title = atom({
    key: 'ConcreteModulus_Title',
    default: '탄성계수 (N/mm²)'
});

export const Steel_Title = atom({
    key: 'Steel_Title',
    default: '철근'
});

export const Concrete_Diameter = atom({
    key: 'Concrete_Diameter',
    default: 0
});

export const Concrete_Thickness = atom({
    key: 'Concrete_Thickness',
    default: 0
});

export const Concrete_Modulus = atom({
    key: 'Concrete_Modulus',
    default: 0
});

export const Steel_Diameter = atom({
    key: 'SteelCase_Diameter',
    default: 0
});

export const Steel_Thickness = atom({
    key: 'SteelCase_Thickness',
    default: 0
});

export const Steel_Modulus = atom({
    key: 'SteelCase_Modulus',
    default: 0
});

export const Steel_Dia_Title = atom({
    key: 'Steel_Dia_Names',
    default: '단면적 (cm²)'
});

export const Steel_Cor_Title = atom({
    key: 'Steel_Cor_Names',
    default: '부식대 (mm)'
});

export const Steel_Cor_Thickness = atom({
    key: 'Steel_Cor_Thickness',
    default: 0
});

/** Composite Section variables */
export const CompConcreteModulus_Title = atom<string>({
    key: 'CompConcreteModulus_Title',
    default: '탄성계수 (N/mm²)'
});

export const CompSteel_Title = atom<any>({
    key: 'CompSteel_Title',
    default: '철근'
});

export const CompConcrete_Diameter = atom({
    key: 'CompConcrete_Diameter',
    default: 0
});

export const CompConcrete_Thickness = atom({
    key: 'CompConcrete_Thickness',
    default: 0
});

export const CompConcrete_Modulus = atom({
    key: 'CompConcrete_Modulus',
    default: 0
});

export const CompSteel_Diameter = atom({
    key: 'CompSteelCase_Diameter',
    default: 0
});

export const CompSteel_Thickness = atom({
    key: 'CompSteelCase_Thickness',
    default: 0
});

export const CompSteel_Modulus = atom({
    key: 'CompSteelCase_Modulus',
    default: 0
});

export const CompSteel_Dia_Title = atom({
    key: 'CompSteel_Dia_Names',
    default: '단면적 (cm²)'
});

export const CompSteel_Cor_Title = atom({
    key: 'CompSteel_Cor_Names',
    default: '부식대 (mm)'
});

export const CompSteel_Cor_Thickness = atom({
    key: 'CompSteel_Corrthickness',
    default: 0
});



/** Pile Location variables */
export const Major_Ref_Value = atom({
    key: 'Major_Ref_Value',
    default: 1
});

export const Minor_Ref_Value = atom({
    key: 'Minor_Ref_Value',
    default: 1
});

export const Major_Start_Point = atom({
    key: 'Major_Start_Point',
    default: 0
});

export const Minor_Start_Point = atom({
    key: 'Minor_Start_Point',
    default: 0
});

export const Major_Space = atom({
    key: 'Major_Space',
    default: ''
});

export const Major_Degree = atom({
    key : 'Major_Degree',
    default: ''
});

export const Minor_Degree = atom({
    key : 'Minor_Degree',
    default: ''
});

/**Reinforced variables */
export const ReinforcedMethod = atom({
    key: 'ReinforcedMethod',
    default: '피복'
});

export const ReinforcedStartLength = atom({
    key: 'ReinforcedStartLength',
    default: 0
});

export const ReinforcedEndLength = atom({
    key: 'ReinforcedEndLength',
    default: 0
});

export const OuterThickness = atom({
    key: 'OuterThickness',
    default: 0
});

export const OuterModulus = atom({
    key: 'OuterModulus',
    default: 0
});

export const InnerThickness = atom({
    key: 'InnerThickness',
    default: 0
});

export const InnerModulus = atom({
    key: 'InnerModulus',
    default: 0
});

export const InnerInputState = atom({
    key: 'InnerInputState',
    default: false
});

/** AddComposite variables */

export const CompositeTypeCheck = atom({
    key: 'isTabDisabled',
    default: false
});

export const CompPileType = atom({
    key: 'varCompPileType',
    default: '현장타설말뚝'
});

export const CompStartLength = atom({
    key: 'CompStartLength',
    default: 0
});

/** Pile Chart variables */
export const FoundationCoordinate = selector({
    key : 'FoundationCoordinates',
    get : ({get}) => {
        const width = get(FoundationWidth)
        const sideLength = get(SideLength)
        const Coordinates = FoundationCoordinates(width, sideLength)
        return Coordinates
    }
})

export const PileLocationData = atom({
    key: 'PileLocationData',
    default: [] as {}[]
});

export const PileDegreeData = atom({
    key: 'PileDegreeData',
    default: [] as {}[]
});
// Drawing Chart 함수
// Nivo Chart에 그려주는 변수를 만들어주는 selector
export const ChartDrawing = selector({
    key: 'ChartDrawing',
    get : ({get}) => { 
        const pileName = get(PileName)
        const ChartCoordinate = []
        ChartCoordinate.push({id : 'new', data: [{x: 0, y: 0}]})
        const foundationWidth = get(FoundationWidth)
        const sideLength = get(SideLength)
        // 기초 좌표
        const Coordinates = get(FoundationCoordinate)

        const majorStartPoint = get(Major_Start_Point)
        const minorStartPoint = get(Minor_Start_Point)
        const concreteDiameter = get(Concrete_Diameter)
        const steelDiameter = get(Steel_Diameter)

        const FootingCoord: any = []
        for (let i = 0; i < Coordinates.length; i++){
            FootingCoord.push({x: Number(Coordinates[i][0]), y: Number(Coordinates[i][1])})
        }
        ChartCoordinate.push({id : 'Footing', data: FootingCoord, color : 'black'})
        
        // Table에 입력된 말뚝 좌표
        const pileTableData = get(PileTableData)
        if (pileTableData.length === 0){

        }
        else{
            const TablePileCoordinates = CalculatePileCoordinates(
                JSON.stringify(get(PileTableData)), 
                JSON.stringify(get(PileLocationData))
            )
            
            for (let i=0; i<TablePileCoordinates.length; i++){
                for (let j=0; j<TablePileCoordinates[i].length; j++){
                    const PileLoc = []
                    for (let k=0; k<TablePileCoordinates[i][j].length; k++){
                        PileLoc.push({x: Number(TablePileCoordinates[i][j][k][0]), y: Number(TablePileCoordinates[i][j][k][1])})
                    }
                    ChartCoordinate.push({id : `${i}Type${j}pile`, data:PileLoc, color : 'black'})
                }
            }
        }
    

        // 입력창에 입력된 말뚝 좌표
        
        const pileDataSelector = get(PileDataSelector)
        const InputPileCenterCoordinates = CalculatePileCenterCoordinates(pileDataSelector, foundationWidth, sideLength)
        
        
        const InputPileCoordinates = CalculatePileCoordinates(
            JSON.stringify([pileDataSelector]), 
            JSON.stringify([InputPileCenterCoordinates])
        )
        
        for (let i=0; i<InputPileCoordinates.length; i++){
            for (let j=0; j<InputPileCoordinates[i].length; j++){
                const PileLoc = []
                for (let k=0; k<InputPileCoordinates[i][j].length; k++){
                    PileLoc.push({x: Number(InputPileCoordinates[i][j][k][0]), y: Number(InputPileCoordinates[i][j][k][1])})
                }
                ChartCoordinate.push({id : `new${[j]}`, data:PileLoc , color : 'red', lineWidth : 5})
            }
        }
        
        return ChartCoordinate
        
    }
});

export const ChartDrawingData = atom({
    key: 'ChartDrawingData',
    default: [] as {}[]
});
export const TotalPileNum = atom({
    key: 'TotalPileNum',
    default: []
})
/** Pile Table variables */
export const PileTableData = atom({
    key: 'PileTableData',
    default: [] as {
        pileName: string, 
        pileLength : number, 
        pileType: string,  
        constructionMethod: string, 
        headCondition: string, 
        bottomCondition: string, 
        
        concreteDiameter: number, 
        concreteThickness: number, 
        concreteModulus: number, 
        steelDiameter: number, 
        steelThickness: number, 
        steelModulus: number, 
        steelCorThickness: number,

        compositeTypeCheck: boolean,
        compStartLength : number,
        
        compPileType: string, 
        compConcreteDiameter: number, 
        compConcreteThickness: number, 
        compConcreteModulus: number, 
        compSteelDiameter: number, 
        compSteelThickness: number, 
        compSteelModulus: number,
        compSteelCorThickness: number,

        reinforcedMethod: string,
        reinforcedStartLength: number,
        reinforcedEndLength: number,
        outerThickness: number,
        outerModulus: number,
        innerThickness: number,
        innerModulus: number,

        majorRefValue: number, 
        minorRefValue: number, 
        majorStartPoint: number, 
        minorStartPoint: number, 
        majorSpace: string
        majorDegree: string,
        minorDegree: string

        PileNums: number
    }[]    
});

export const SelectedRow = atom({
    key: 'SelectedRow',
    default: 0
});


/** Selector */
export const PileDataSelector = selector({
    key : 'PileDataSelector',
    get : ({get}) => {
        const pileName = get(PileName);
        const pileLength = get(PileLength);
        const pileType = get(PileType);
        const constructionMethod = get(ConstructionMethod);
        const headCondition = get(HeadCondition);
        const bottomCondition = get(BottomCondition);

        const concreteDiameter = get(Concrete_Diameter);
        const concreteThickness = get(Concrete_Thickness);
        const concreteModulus = get(Concrete_Modulus);
        const steelDiameter = get(Steel_Diameter);
        const steelThickness = get(Steel_Thickness);
        const steelModulus = get(Steel_Modulus);
        const steelCorThickness = get(Steel_Cor_Thickness);

        const compositeTypeCheck = get(CompositeTypeCheck);
        const compStartLength = get(CompStartLength);

        const compPileType = get(CompPileType);
        const compConcreteDiameter = get(CompConcrete_Diameter);
        const compConcreteThickness = get(CompConcrete_Thickness);
        const compConcreteModulus = get(CompConcrete_Modulus);
        const compSteelDiameter = get(CompSteel_Diameter);
        const compSteelThickness = get(CompSteel_Thickness);
        const compSteelModulus = get(CompSteel_Modulus);
        const compSteelCorThickness = get(CompSteel_Cor_Thickness);

        const reinforcedMethod = get(ReinforcedMethod);
        const reinforcedStartLength = get(ReinforcedStartLength);
        const reinforcedEndLength = get(ReinforcedEndLength);
        const outerThickness = get(OuterThickness);
        const outerModulus = get(OuterModulus);
        const innerThickness = get(InnerThickness);
        const innerModulus = get(InnerModulus);

        const majorRefValue = get(Major_Ref_Value);
        const minorRefValue = get(Minor_Ref_Value);
        const majorStartPoint = get(Major_Start_Point);
        const minorStartPoint = get(Minor_Start_Point);
        const majorSpace = get(Major_Space);
        const majorDegree = get(Major_Degree);
        const minorDegree = get(Minor_Degree);

        const PileNums = ((ExtractNumbers(majorSpace)).length+1)
        return {
            pileName,
            pileLength,
            pileType,
            constructionMethod,
            headCondition,
            bottomCondition,

            concreteDiameter,
            concreteThickness,
            concreteModulus,
            steelDiameter,
            steelThickness,
            steelModulus,
            steelCorThickness, 
            
            compositeTypeCheck,
            compStartLength,
            
            compPileType,
            compConcreteDiameter,
            compConcreteThickness,
            compConcreteModulus,
            compSteelDiameter,
            compSteelThickness,
            compSteelModulus, 
            compSteelCorThickness, 

            reinforcedMethod,
            reinforcedStartLength,
            reinforcedEndLength,
            outerThickness,
            outerModulus,
            innerThickness,
            innerModulus,

            majorRefValue,
            minorRefValue,
            majorStartPoint,
            minorStartPoint,
            majorSpace,
            majorDegree,
            minorDegree,
            
            PileNums
        }
    }
})

/** Soil Data Variables */
interface Row {
    id: number;
    LayerNo : number;
    LayerType : string;
    LayerDepth : number;
    Depth : number;
    AvgNValue : number;
    c : number;
    pi : number;
    gamma : number;
    aE0 : number;
    aE0_Seis : number;
    vd : number;
    Vsi : number;
    ED : number;
    DE : number;
    Length : number;
}

export const SoilData = atom({
    key: 'SoilData',
    default: [{ id: 1, LayerNo: 1, LayerType: '점성토', LayerDepth : 0, Depth : 10,
    AvgNValue : 10, c : 0, pi : 0, gamma : 18, aE0 : 14000, aE0_Seis : 28000, vd : 0.5, 
    Vsi : 0, ED : 0, DE : 1, Length : 1 }] as Row[]
});

export const SoilDataSelector = selector({
    key: 'SoilDataSelector',
    get: ({get}) => {
        const VsiEditable = get(CalVsiState);
        const DEEditable = get(LiquefactionState);
        const soilData = get(SoilData);
        const soilDataSelector = soilData.map((row) => {
            
            // Vsi 값 자동 계산, false일 경우 입력했던 값이 반환됨
            if (VsiEditable == true){
                let newVsi = 0
                if (row.LayerType === '점성토'){
                    newVsi = 100* Math.pow(Math.min(row.AvgNValue, 25),(1/3))
                }
                else if (row.LayerType === '사질토'){
                    newVsi = 80* Math.pow(Math.min(row.AvgNValue, 50),(1/3))
                }
                return {...row, Vsi : Number(newVsi)}
                
            }
            // DE 값 설정, false일 경우 기본값, true일 경우 입력값 반환
            else if (DEEditable == false){
                return {...row, DE : 1}
            }
            else {
                return row
            }
        })
        return soilDataSelector
    },
    set: ({ set }, newValue: Row[] | DefaultValue) => {
        // Set the value of SoilData atom with the new value
        set(SoilData, newValue);
    }
});

/** Soil Settings option */
export const CalVsiState = atom({
    key: 'CalVsiState',
    default: false
});

export const LiquefactionState = atom({
    key: 'LiquefactionState',
    default: false
});

export const SlopeEffectState = atom({
    key: 'SlopeEffectState',
    default: false
});

export const GroupEffectState = atom({
    key: 'GroupEffectState',
    default: false
});

export const GroupEffectValue = atom({
    key: 'GroupEffectValue',
    default: 1
});

/**Soil Properties option */
export const GroundLevel = atom({
    key: 'GroundLevel',
    default: 0
});

export const Waterlevel = atom({
    key: 'Waterlevel',
    default: 0
});

export const DownloadData = selector({
    key : 'DownLoadData',
    get : ({get}) => {
        const projectName = get(ProjectName);
        const piletableData = get(PileTableData);
        const soilData = get(SoilData);
        const topLevel = get(TopLevel);
        const groundLevel = get(GroundLevel);
        const waterlevel = get(Waterlevel);
        const groupEffectValue = get(GroupEffectValue);
        const slopeEffectState = get(SlopeEffectState);
        const foundationWidth = get(FoundationWidth);
        const sideLength = get(SideLength);
        const liquefactionState = get(LiquefactionState);
        const calVsiState = get(CalVsiState);
        const groupEffectState = get(GroupEffectState);
        return {projectName, piletableData, soilData, topLevel, groundLevel, waterlevel, groupEffectValue, slopeEffectState, foundationWidth, sideLength, liquefactionState, calVsiState, groupEffectState}
    }
})

interface ExcelTableRow {
    id : number;
    SheetName: string;
    AreaName: string;
    CellName: string;
    LinkedData : string;
    Value : any;
}

export const ExcelData = atom({
    key: 'ExcelData',
    default: [] as ExcelTableRow[]
});

export const ReportJsonResult = atom({
    key: 'ReportJsonResult',
    default: {} as any
});
