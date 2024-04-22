import {SetRecoilState, atom, selector,DefaultValue} from 'recoil';

export const BasePlateWidth = atom<any>({
  key: 'BasePlateWidth',
  default: 0,
});

export const BasePlateHeight = atom<any>({
  key: 'BasePlateHeight',
  default: 0,
});

export const HBeamH = atom({
  key: 'HBeamH',
  default: 0,
});

export const HBeamB = atom({
  key: 'HBeamB',
  default: 0,
});

export const HBeamtw = atom({
  key: 'HBeamtw',
  default: 0,
});

export const HBeamtf = atom({
  key: 'HBeamtf',
  default: 0,
});

export const HBeamr = atom({
  key: 'HBeamr',
  default: 0,
});

export const HBeamVertices = selector({
  key: 'HBeamVertices',
  get: ({get}) => {
    const H = get(HBeamH);
    const B = get(HBeamB);
    const tw = get(HBeamtw);
    const tf = get(HBeamtf);
    const r = get(HBeamr);
    
    //calculate vertex points from center
    const vertex = {
      vertices: [
        {x: -B/2, y: H/2},
        {x: B/2, y: H/2},
        {x: B/2, y: H/2-tf},
        {x : tw/2+r, y: H/2-tf},
        {x : tw/2, y: H/2-tf-r},
        {x : tw/2, y: -H/2+tf+r},
        {x : tw/2+r, y: -H/2+tf},
        {x: B/2, y: -H/2+tf},
        {x: B/2, y: -H/2},
        {x: -B/2, y: -H/2},
        {x: -B/2, y: -H/2+tf},
        {x: -tw/2-r, y: -H/2+tf},
        {x: -tw/2, y: -H/2+tf+r},
        {x: -tw/2, y: H/2-tf-r},
        {x: -tw/2-r, y: H/2-tf},
        {x: -B/2, y: H/2-tf},
      ],
    }
    return vertex;
  },
});

export const UserDefineState = atom({
  key: 'UserDefineState',
  default: false,
});

export const SelectedNodes = atom({
  key: 'SelectedNodes',
  default: '',
});

export const SelectedColumnList = atom({
  key: 'SelectedSectionList',
  // ['Section Name', 'Section id']
  default: [
    ['ColumnName', 0],
  ],
});

export const SelectedColumnIndex_DBName = atom<any>({
  key: 'SelectedSectionDim',
  // {section_id : 'Section DB Name'}
  default: {0 : 'H 100x50x5/7'},
});

export const DBList = atom({
  key: 'DBList',
  default: [
    ['KS', 0],
    ['ASTM', 1],
    ['JIS', 2],
    ['EN', 3],
  ],
});

export const HSectionDB = atom({
  key: 'HSectionDB',
  default: [
    ['H 100x50x5/7', 0],
    ['H 100x100x6/8', 1],
    ['H 400x200x8/13', 2],
    ['H 300x300x10/15', 3],
  ],
});

export const SelectedColumnIndex = atom({
  key: 'SelectedColumn',
  default: 0,
});

export const SelectedDBIndex = atom({
  key: 'SelectedDB',
  default: 0,
});


export const Node_BP_Data = atom<any>({
  key: 'SectionDimList',
  default: {
    1: {
      COLUMN_NAME : 'columnName',
      NODECORD : [0,0],
      BASEPLATE: {
        COLUMN : {
          MATL : '24',
          SHAPE : 'H',
          DB : "H 400x200x8/13",
        },
        PLATE : {
          MATL : "SS235",
          SHAPE : "REC",
          WIDTH : 500,
          HEIGHT : 500,
          THIK : 12
        }
      },
      PEDESTAL : {
        MATL : "SS235",
        SHAPE : "REC",
        WIDTH : 1000,
        HEIGHT : 1000,
      }
    }
  }
}
)

export const MinMaxCoordinates = atom({
  key: 'MinMaxCoordinates',
  default: [0,0,0,0]
});

export const LoadCombinations = atom({
  key: 'LoadCombinations',
  default: {
    ENV : ['ENV1', 'ENV2'],
    ADD : ['ADD1', 'ADD2'],
  }
});

export const ReactionResult = atom<any>({
  key: 'ReactionResult',
  default: {
    1 : {
      LC1 : [
        0,0,0,0,0,0
      ],
    }
  }
})

export const PlateThickness = atom({
  key: 'PlateThickness',
  default: 6,
});

export const BasePlateMaterial = atom({
  key: 'BasePlateMaterial',
  default: "SS235",
});

export const ConcreteMaterial = atom({
  key: 'ConcreteMaterial',
  default: "24",
});

export const BPName = atom({
  key: 'BPName',
  default: '',
});

export const ENVLoad = atom({
  key: 'ENVLoad',
  default: { 0 : [[0,0,0,0,0]]}
});

export const DesignResult = atom({
  key: 'DesignResult',
  default: {
    "Pu" : 0,
    "Mux" : 0,
    "Muy" : 0,
    "Vux" : 0,
    "Vuy" : 0,
    "Tu" : 0,
    "Sigma_max" : 0,
    "Sigma_min" : 0,
    "fck" : 0,
    "BP_Area" : 0,
    "BP_thick" : 0,
    "BP_Fy" : 0,
    "Bolt_Dia" : 0,
    "Bolt_Length" : 0,
    "Bolt_Num" : 0,
  }
});

export const PlanviewNodeCheck = atom({
  key: 'planviewNodeCheck',
  default: false,
});

export const PlanviewColumnNameCheck = atom({
  key: 'planviewColumnNameCheck',
  default: false,
});

export const PlanviewBPNameCheck = atom({
  key: 'planviewBPNameCheck',
  default: false,
});

export const MDResult = atom({
  key: 'MDResult',
  default: ''
});

export const ColumnData = atom<any>({
  key : 'ColumnInfo',
  default : {}
})

export const PlanViewSelectedNode = atom<any>({
  key: 'PlanViewSelectedNode',
  default: []
})

export const BP_Node = atom({
  key: 'BP_Node',
  default: {}
})

export const BP_List = atom({
  key: 'BP_List',
  default: []
});

export const SelectedBPList = atom({
  key: 'SelectedBPList',
  default: ''
});