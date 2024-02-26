export {CreateLayout}

function CreateLayout(Node_Start, Elem_Start, alignData, segmData) {
  //************************************************
  //CreateAlignments
  //************************************************
  //Coordinates and Angle of Noes
  const Xi = [];
  const Yi = [];
  const Ti = [];
  //Start Points
  //Xi[0] = 0;
  //Yi[0] = 0;
  //Ti[0] = Math.PI / 2

  Xi[0] = 0;
  Yi[0] = 0;
  Ti[0] = Math.PI / 2;

  //Alingment Informations
  //Alin_Info[0] : Alignment Type
  //Alin_Info[1] : Alignment Length
  //Alin_Info[2] : Alignment Radius Start
  //Alin_Info[3] : Alignment Radius End
  //Alin_Info[4] : X coordinates for End points
  //Alin_Info[5] : Y coordinates for End points
  //Alin_Info[6] : Angle for End points
  const Alin_Info = Alignment(alignData);
  let TempAlin = []; //Get X,Y,T from functions
  Alin_Info[4] = [];
  Alin_Info[5] = [];
  Alin_Info[6] = [];
  for (let i = 0; i < Alin_Info[0].length; i++) {
    switch (Alin_Info[0][i]) {
      case "ST":
        if (i === 0) {
          TempAlin = Straight_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Alin_Info[1][i]
          );
        } else {
          TempAlin = Straight_Line(
            Alin_Info[4][i - 1],
            Alin_Info[5][i - 1],
            Alin_Info[6][i - 1],
            Alin_Info[1][i]
          );
        }
        break;
      case "AR":
        if (i === 0) {
          TempAlin = Arc_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Alin_Info[1][i],
            Alin_Info[2][i]
          );
        } else {
          TempAlin = Arc_Line(
            Alin_Info[4][i - 1],
            Alin_Info[5][i - 1],
            Alin_Info[6][i - 1],
            Alin_Info[1][i],
            Alin_Info[2][i]
          );
        }
        break;
      case "CL":
        if (i === 0) {
          TempAlin = Clothoid_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Alin_Info[1][i],
            Alin_Info[2][i],
            Alin_Info[3][i],
            Alin_Info[1][i]
          );
        } else {
          TempAlin = Clothoid_Line(
            Alin_Info[4][i - 1],
            Alin_Info[5][i - 1],
            Alin_Info[6][i - 1],
            Alin_Info[1][i],
            Alin_Info[2][i],
            Alin_Info[3][i],
            Alin_Info[1][i]
          );
        }
        break;
      case "CP":
        if (i === 0) {
          TempAlin = CubicParabola_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Alin_Info[1][i],
            Alin_Info[2][i],
            Alin_Info[3][i],
            Alin_Info[1][i]
          );
        } else {
          TempAlin = CubicParabola_Line(
            Alin_Info[4][i - 1],
            Alin_Info[5][i - 1],
            Alin_Info[6][i - 1],
            Alin_Info[1][i],
            Alin_Info[2][i],
            Alin_Info[3][i],
            Alin_Info[1][i]
          );
        }
        break;
      default:
        break;
    }
    Alin_Info[4][i] = TempAlin[0];
    Alin_Info[5][i] = TempAlin[1];
    Alin_Info[6][i] = TempAlin[2];
  }
  //Segment informations
  //Seg_Info[0] : Group Name
  //Seg_Info[1] : Length
  //Seg_Info[2] : Accumulate Length
  //Seg_Info[3] : Alignment number
  //Seg_Info[4] : Alignment Type
  //Seg_Info[5] : Length from each Alignment starts
  const Seg_Info = Segment(
    segmData,
    Alin_Info[0],
    Alin_Info[1],
    Node_Start,
    Elem_Start
  );
  for (let i = 0; i < Seg_Info[0].length; i++) {
    switch (Seg_Info[4][i]) {
      case "ST":
        if (Seg_Info[3][i] === 0) {
          TempAlin = Straight_Line(Xi[0], Yi[0], Ti[0], Seg_Info[5][i]);
        } else {
          TempAlin = Straight_Line(
            Alin_Info[4][Seg_Info[3][i] - 1],
            Alin_Info[5][Seg_Info[3][i] - 1],
            Alin_Info[6][Seg_Info[3][i] - 1],
            Seg_Info[5][i]
          );
        }
        break;
      case "AR":
        if (Seg_Info[3][i] === 0) {
          TempAlin = Arc_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]]
          );
        } else {
          TempAlin = Arc_Line(
            Alin_Info[4][Seg_Info[3][i] - 1],
            Alin_Info[5][Seg_Info[3][i] - 1],
            Alin_Info[6][Seg_Info[3][i] - 1],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]]
          );
        }
        break;
      case "CL":
        if (Seg_Info[3][i] === 0) {
          TempAlin = Clothoid_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]],
            Alin_Info[3][Seg_Info[3][i]],
            Alin_Info[1][Seg_Info[3][i]]
          );
        } else {
          TempAlin = Clothoid_Line(
            Alin_Info[4][Seg_Info[3][i] - 1],
            Alin_Info[5][Seg_Info[3][i] - 1],
            Alin_Info[6][Seg_Info[3][i] - 1],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]],
            Alin_Info[3][Seg_Info[3][i]],
            Alin_Info[1][Seg_Info[3][i]]
          );
        }
        break;
      case "CP":
        if (Seg_Info[3][i] === 0) {
          TempAlin = CubicParabola_Line(
            Xi[0],
            Yi[0],
            Ti[0],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]],
            Alin_Info[3][Seg_Info[3][i]],
            Alin_Info[1][Seg_Info[3][i]]
          );
        } else {
          TempAlin = CubicParabola_Line(
            Alin_Info[4][Seg_Info[3][i] - 1],
            Alin_Info[5][Seg_Info[3][i] - 1],
            Alin_Info[6][Seg_Info[3][i] - 1],
            Seg_Info[5][i],
            Alin_Info[2][Seg_Info[3][i]],
            Alin_Info[3][Seg_Info[3][i]],
            Alin_Info[1][Seg_Info[3][i]]
          );
        }
        break;
      default:
          break;
    }
    Xi[i + 1] = TempAlin[0];
    Yi[i + 1] = TempAlin[1];
    Ti[i + 1] = TempAlin[2];
  }
  const dbNODE = CreateNode(Node_Start, Xi, Yi);
  const dbELEM = CreateElem(Node_Start, Elem_Start, Seg_Info[6], Seg_Info[7]);
  const dbSKEW = CreateSkew(Node_Start, Ti);
  const dbGRUP = CreateGrup(Seg_Info[0], Seg_Info[8], Seg_Info[9], Seg_Info[10]);
  //Return Data
  return [Xi, Yi, dbNODE, dbELEM, dbSKEW, dbGRUP];
}

function CreateNode(Node_Start, Xi, Yi) {
  //Json body
  let dbNODE = { Assign: {} };
  //Assign Coordinates into Json body
  for (let i = 0; i < Xi.length; i++) {
    dbNODE.Assign[Node_Start + i] = {
      X: Xi[i],
      Y: Yi[i]
    };
  }
  return dbNODE;
}

function CreateElem(Node_Start, Elem_Start, Matl, Sect) {
  //Json body
  let dbELEM = { Assign: {} };
  //Assign Elements informations into Json body
  for (let i = 0; i < Matl.length; i++) {
    dbELEM.Assign[Elem_Start + i] = {
      TYPE: "BEAM",
      MATL: Matl[i],
      SECT: Sect[i],
      NODE: [Node_Start + i, Node_Start + i + 1]
    };
  }
  return dbELEM;
}

function CreateSkew(Node_Start, Ti) {
  //Json body
  let dbSKEW = { Assign: {} };
  //Assign Skew of nodes into Json body
  for (let i = 0; i < Ti.length; i++) {
    dbSKEW.Assign[Node_Start + i] = {
      iMETHOD: 1,
      ANGLE_X: 0,
      ANGLE_Y: 0,
      ANGLE_Z: -1 * (((Ti[i] - Math.PI / 2) * 180) / Math.PI)
    };
  }
  return dbSKEW;
}

function CreateGrup(Seg_Grup, Seg_Elem, Seg_Nodei, Seg_Nodej) {
  //Deduplication of Structure Names
  const GroupName = Seg_Grup.reduce(
      (unique, val, i, _values) =>
          _values.indexOf(val) === i ? [...unique, val] : unique,
      []
  );
  //Json body
  let dbGRUP = { Assign: {} };
  let Elem_list = [];
  let Nodei_list = [];
  let Nodej_list = [];
  let Node_list = [];

  //Assign Group into Json Body
  for (let i = 0; i < GroupName.length; i++) {
      //Write Element and Node list for each group
      Elem_list = [];
      Nodei_list = [];
      Nodej_list = [];
      Node_list = [];
      let inc = 0;
      for (let j = 0; j < Seg_Grup.length; j++) {
        if (GroupName[i] === Seg_Grup[j]) {
          Elem_list[inc] = Seg_Elem[j];
          Nodei_list[inc] = Seg_Nodei[j];
          Nodej_list[inc] = Seg_Nodej[j];
          inc++;
        }
      }
      //Deduplication of Node list
      Node_list = [...Nodei_list, ...Nodej_list];
      Node_list = Node_list.reduce(
        (unique, val, i, _values) =>
          _values.indexOf(val) === i ? [...unique, val] : unique,
        []
      );
      //Assign Group into Json Body
      dbGRUP.Assign[i + 1] = {
        NAME: GroupName[i],
        N_LIST: Node_list,
        E_LIST: Elem_list
      };
  }
  return dbGRUP;
}

function Alignment(alginData) {
  //Number of Lines
  const nbLine = alginData.length;
  //Declare variables from Input
  const type = new Array(nbLine);
  const lens = new Array(nbLine);
  const rads = new Array(nbLine);
  const rade = new Array(nbLine);
  //Assign variables
  for (let i = 0; i < nbLine; i++) {
    let tempType = alginData[i].linetype;
    switch (tempType) {
      case "Straight":
        type[i] = "ST";
        lens[i] = alginData[i].linelength;
        rads[i] = 0;
        rade[i] = 0;
        break;
      case "Arc":
        type[i] = "AR";
        lens[i] = alginData[i].linelength;
        rads[i] = alginData[i].linerads;
        rade[i] = 0;
        break;
      case "Clothoid":
        type[i] = "CL";
        lens[i] = alginData[i].linelength;
        rads[i] = alginData[i].linerads;
        rade[i] = alginData[i].linerade;
        break;
      case "Cubic Parabola":
        type[i] = "CP";
        lens[i] = alginData[i].linelength;
        rads[i] = alginData[i].linerads;
        rade[i] = alginData[i].linerade;
        break;
      default:
        break;
    }
  }
  //Return data
  return [type, lens, rads, rade];
}

function Segment(Seg_info, Alin_Type, Alin_Len, Node_Start, Elem_Start) {
  //******************************************************************
  //Return Segment Group Name/Segment Length/Segment Accumulate Length
  //******************************************************************
  //Temporary Variables
  let tmpIter;
  let inc = 0;
  const AlinAcc = [];
  //Return Variables
  const Seg_LenEach = [];
  const Seg_GrpName = [];
  const Seg_LenAccu = [];
  const Seg_AlinNum = [];
  const Seg_AlinTyp = [];
  const Seg_LenAlin = [];
  const Seg_Material = [];
  const Seg_Sections = [];
  const Seg_ElemNb = [];
  const Seg_NodeNbi = [];
  const Seg_NodeNbj = [];
  //Assign Segment Length / Segment Group Name
  for (let i = 0; i < Seg_info.length; i++) {
    tmpIter = Seg_info[i].segNumber;
    for (let j = 0; j < tmpIter; j++) {
      Seg_LenEach[inc] = Seg_info[i].seglength;
      Seg_GrpName[inc] = Seg_info[i].strgroup;
      Seg_Material[inc] = Seg_info[i].matlid;
      Seg_Sections[inc] = Seg_info[i].sectid;
      Seg_ElemNb[inc] = Elem_Start + inc;
      Seg_NodeNbi[inc] = Node_Start + inc;
      Seg_NodeNbj[inc] = Node_Start + inc + 1;
      inc++;
    }
  }
  //Assign Segment Accumulate Length
  for (let i = 0; i < Seg_LenEach.length; i++) {
    if (i === 0) {
      Seg_LenAccu[i] = Seg_LenEach[i];
    } else {
      Seg_LenAccu[i] = Seg_LenAccu[i - 1] + Seg_LenEach[i];
    }
  }
  //Assign Alignment Accumulate Length
  for (let i = 0; i < Alin_Type.length; i++) {
    if (i === 0) {
      AlinAcc[i] = Alin_Len[i];
    } else {
      AlinAcc[i] = AlinAcc[i - 1] + Alin_Len[i];
    }
  }
  //Assign Alignment number to each Segments
  for (let i = 0; i < Seg_LenAccu.length; i++) {
    for (let j = 0; j < AlinAcc.length; j++) {
      if (Seg_LenAccu[i] <= AlinAcc[j]) {
        Seg_AlinNum[i] = j;
        Seg_AlinTyp[i] = Alin_Type[j];
        break;
      }
    }
  }
  //Assign Accumulate length in each Alignment
  for (let i = 0; i < Seg_LenAccu.length; i++) {
    for (let j = 0; j < AlinAcc.length; j++) {
      if (Seg_LenAccu[i] <= AlinAcc[j] && j === 0) {
        Seg_LenAlin[i] = Seg_LenAccu[i];
        break;
      } else if (Seg_LenAccu[i] <= AlinAcc[j]) {
        Seg_LenAlin[i] = Seg_LenAccu[i] - AlinAcc[j - 1];
        break;
      }
    }
  }
  //Return data
  return [
    Seg_GrpName,
    Seg_LenEach,
    Seg_LenAccu,
    Seg_AlinNum,
    Seg_AlinTyp,
    Seg_LenAlin,
    Seg_Material,
    Seg_Sections,
    Seg_ElemNb,
    Seg_NodeNbi,
    Seg_NodeNbj
  ];
}

function Straight_Line(Xi, Yi, Ti, AccLen) {
  //******************************************
  //Calculate Coordiantes of Straight Line
  //******************************************
  const Xj = Xi + Math.sin(Ti) * AccLen;
  const Yj = Yi + Math.cos(Ti) * AccLen;
  const Tj = Ti;
  
  return [Xj, Yj, Tj];
}

function Arc_Line(Xi, Yi, Ti, AccLen, AlinRs) {
  //******************************************
  //Calculate Coordiantes of Arc Line
  //******************************************
  const Xri = 0;
  const Yri = AlinRs * -1;

  const Trj = AccLen / AlinRs;
  const Xs = 0;
  const Ys = 0;
  const Ts = Math.PI / 2;

  let Xe = Math.sin(Trj) * AlinRs + Xri;
  let Ye = Math.cos(Trj) * AlinRs + Yri;
  let Te = Ts + Trj;

  let Tse;
  if (Math.atan2(Xe, Ye) >= 0) {
    Tse = Math.atan2(Xe, Ye);
  } else {
    Tse = Math.atan2(Xe, Ye) + 2 * Math.PI;
  }

  const Tdel = Ti - Ts;
  const Tro = Tse + Tdel;
  const Lse = Math.sqrt((Xe - Xs) ** 2 + (Ye - Ys) ** 2);
  Xe = Xs + Math.sin(Tro) * Lse;
  Ye = Ys + Math.cos(Tro) * Lse;

  const Xdel = Xi - Xs;
  const Ydel = Yi - Ys;

  Xe = Xe + Xdel;
  Ye = Ye + Ydel;
  Te = Te + Tdel;

  const Xj = Xe;
  const Yj = Ye;
  const Tj = Te;

  return [Xj, Yj, Tj];
}

function Clothoid_Line(Xi, Yi, Ti, AccLen, AlinRs, AlinRe, AlinLen) {
  //******************************************
  //Calculate Coordiantes of Clothoid Line
  //******************************************
  let factor;
  let Rs, Re;

  if (AlinRs === 0) {
    factor = true;
    Rs = 0;
    Re = AlinRe * -1;
  } else if (AlinRe === 0) {
    factor = false;
    Rs = 0;
    Re = AlinRs * -1;
  } else if (Math.abs(AlinRs) > Math.abs(AlinRe)) {
    factor = true;
    Rs = AlinRs * -1;
    Re = AlinRe * -1;
  } else {
    factor = false;
    Rs = AlinRe * -1;
    Re = AlinRs * -1;
  }

  let Ls, Le;
  if (Rs === 0) {
      Ls = 0;
  } else {
      Ls = (AlinLen * Re) / (Rs - Re);
  }
  const Loe = AlinLen + Ls;
  const Asqu = Loe * Re;
  if (factor) {
    Le = AccLen + Ls;
  } else {
    Le = Loe - AccLen;
  }

  let Xo, Yo, To;
  let sinT, cosT;
  let Xom, Yom, Tom;

  if (factor) {
    Xo = Clothoid_Xc(Ls, Asqu);
    Yo = Clothoid_Yc(Ls, Asqu);
    sinT = Math.sin(Ls ** 2 / (2 * Asqu));
    cosT = Math.cos(Ls ** 2 / (2 * Asqu));
    if (Math.atan2(cosT, sinT >= 0)) {
      To = Math.atan2(cosT, sinT);
    } else {
      To = Math.atan2(cosT, sinT) + 2 * Math.PI;
    }

    Xom = Xo;
    Yom = Yo;
    Tom = To;
  } else {
    Xo = Clothoid_Xc(Loe, Asqu);
    Yo = Clothoid_Yc(Loe, Asqu);
    sinT = Math.sin(Loe ** 2 / (2 * Asqu));
    cosT = Math.cos(Loe ** 2 / (2 * Asqu));
    if (Math.atan2(cosT, sinT >= 0)) {
      To = Math.atan2(cosT, sinT);
    } else {
      To = Math.atan2(cosT, sinT) + 2 * Math.PI;
    }
    Xom = Xo * -1;
    Yom = Yo;
    Tom = Math.PI - To;
  }

  const Xdel = Xi - Xom;
  const Ydel = Yi - Yom;
  const Tdel = Ti - Tom;

  const Xe = Clothoid_Xc(Le, Asqu);
  const Ye = Clothoid_Yc(Le, Asqu);
  sinT = Math.sin(Le ** 2 / (2 * Asqu));
  cosT = Math.cos(Le ** 2 / (2 * Asqu));
  let Te;
  if (Math.atan2(cosT, sinT >= 0)) {
    Te = Math.atan2(cosT, sinT);
  } else {
    Te = Math.atan2(cosT, sinT) + 2 * Math.PI;
  }

  let Xem, Yem, Tem;
  if (factor) {
    Xem = Xe;
    Yem = Ye;
    Tem = Te;
  } else {
    Xem = Xe * -1;
    Yem = Ye;
    Tem = Math.PI - Te;
  }

  const Xot = Xom + Xdel;
  const Yot = Yom + Ydel;

  const Xt = Xem + Xdel;
  const Yt = Yem + Ydel;

  const Xot_t = Xt - Xot;
  const Yot_t = Yt - Yot;
  let Tot_t;
  if (Math.atan2(Xot_t, Yot_t) >= 0) {
    Tot_t = Math.atan2(Xot_t, Yot_t);
  } else {
    Tot_t = Math.atan2(Xot_t, Yot_t) + 2 * Math.PI;
  }

  const Tot_t_del = Tdel + Tot_t;
  const Lot = Math.sqrt(Xot_t ** 2 + Yot_t ** 2);

  const Xj = Xot + Math.sin(Tot_t_del) * Lot;
  const Yj = Yot + Math.cos(Tot_t_del) * Lot;

  let Tj;
  if (Tem + Tdel > Math.PI * 2) {
    Tj = Tem + Tdel - Math.PI * 2;
  } else if (Tem + Tdel < 0) {
    Tj = Tem + Tdel + Math.PI * 2;
  } else {
    Tj = Tem + Tdel;
  }

  return [Xj, Yj, Tj];
}

function CubicParabola_Line(Xi, Yi, Ti, AccLen, AlinRs, AlinRe, AlinLen) {
  //******************************************
  //Calculate Coordiantes of CubicParabola Line
  //******************************************
  let factor;
  let Rx;
  //Sign
  if (AlinRs === 0) {
    factor = true;
  } else if (AlinRe === 0) {
    factor = false;
  } else if (Math.abs(AlinRs) > Math.abs(AlinRe)) {
    factor = true;
  } else {
    factor = false;
  }
  if (AlinRs === 0) {
    Rx = AlinRe * -1;
  } else {
    Rx = AlinRs * -1;
  }
  //Length
  let Len;
  if (factor) {
    Len = AccLen;
  } else {
    Len = AlinLen - AccLen;
  }
  let XLen = Newton_Raphson_X(Rx, AlinLen);
  let Xo, Yo, To;
  let sinT, cosT;

  if (factor) {
    Xo = 0;
    Yo = 0;
    To = Math.PI / 2;
  } else {
    Xo = Newton_Raphson(Rx, AlinLen, XLen);
    Yo = Xo ** 3 / (6 * Rx * XLen);
    sinT = Math.sin(Math.atan(Xo ** 2 / (2 * Rx * XLen)));
    cosT = Math.cos(Math.atan(Xo ** 2 / (2 * Rx * XLen)));
    if (Math.atan2(cosT, sinT) >= 0) {
      To = Math.atan2(cosT, sinT);
    } else {
      To = Math.atan2(cosT, sinT) + 2 * Math.PI;
    }
  }

  let Xom, Yom, Tom;
  if (factor) {
    Xom = Xo;
    Yom = Yo;
    Tom = To;
  } else {
    Xom = Xo * -1;
    Yom = Yo;
    Tom = Math.PI - To;
  }

  let Xe, Ye, Te;
  Xe = Newton_Raphson(Rx, Len, XLen);
  Ye = Xe ** 3 / (6 * Rx * XLen);
  sinT = Math.sin(Xe ** 2 / (2 * Rx * XLen));
  cosT = Math.cos(Xe ** 2 / (2 * Rx * XLen));
  if (Math.atan2(cosT, sinT) >= 0) {
    Te = Math.atan2(cosT, sinT);
  } else {
    Te = Math.atan2(cosT, sinT) + 2 * Math.PI;
  }

  let Xem, Yem, Tem;
  if (factor) {
    Xem = Xe;
    Yem = Ye;
    Tem = Te;
  } else {
    Xem = Xe * -1;
    Yem = Ye;
    Tem = Math.PI - Te;
  }

  const Xdel = Xi - Xom;
  const Ydel = Yi - Yom;
  const Tdel = Ti - Tom;

  const Xot = Xom + Xdel;
  const Yot = Yom + Ydel;

  const Xt = Xem + Xdel;
  const Yt = Yem + Ydel;

  const Xot_t = Xt - Xot;
  const Yot_t = Yt - Yot;

  let Tot_t;
  if (Math.atan2(Xot_t, Yot_t) >= 0) {
    Tot_t = Math.atan2(Xot_t, Yot_t);
  } else {
    Tot_t = Math.atan2(Xot_t, Yot_t) + 2 * Math.PI;
  }
  const Tot_t_del = Tdel + Tot_t;
  const Lot = Math.sqrt(Xot_t ** 2 + Yot_t ** 2);

  const Xj = Xot + Math.sin(Tot_t_del) * Lot;
  const Yj = Yot + Math.cos(Tot_t_del) * Lot;
  let Tj;
  if (Tem + Tdel > 2 * Math.PI) {
    Tj = Tem + Tdel - 2 * Math.PI;
  } else if (Tem + Tdel < 0) {
    Tj = Tem + Tdel + 2 * Math.PI;
  } else {
    Tj = Tem + Tdel;
  }

  return [Xj, Yj, Tj];
}

function Clothoid_Xc(Len, Asqu) {
  const iter = 10;
  let Xc = 0;
  for (let i = 0; i < iter; i++) {
    Xc =
      Xc +
      ((-1) ** i / fact(2 * i)) *
      (Len ** (4 * i + 1) / (4 * i + 1)) *
      (1 / (4 ** i * Asqu ** (2 * i)));
  }
  return Xc;
}

function Clothoid_Yc(Len, Asqu) {
  const iter = 10;
  let Yc = 0;
  for (let i = 0; i < iter; i++) {
    Yc =
      Yc +
      ((-1) ** i / fact(2 * i + 1)) *
      (Len ** (4 * i + 3) / (4 * i + 3)) *
      (1 / (2 ** (2 * i + 1) * Asqu ** (2 * i + 1)));
  }
  return Yc;
}

function fact(n) {
  let result = 1;
  for (let i = n; i >= 1; i--) {
  result = result * i;
  }
  return result;
}

function Newton_Raphson(Ri, Li, XLen) {
  //Caluclate X End coordinates using Newton_Raphson Method
  let fX;
  let fXd;
  let Xi;
  let Xj;
  Xi = Li;
  //Formula
  // L = X [ 1 + (1/10)(X/2R)² - (1/72)(X/2R)?�� + ...]
  while (true) {
    fX = Xi + Xi ** 5 / (40 * Ri ** 2 * XLen ** 2) - Li;
    fXd = 1 + Xi ** 4 / (10 * Ri ** 2 * XLen ** 2);
    Xj = Xi - fX / fXd;
    if (Math.abs(Xi / Xj) < 1.0000001 && Math.abs(Xi / Xj) > 0.9999999) {
      break;
    } else if (Xi === Xj) {
      break;
    } else {
      Xi = Xj;
    }
  }
  //Return X End coordiantes
  return Xj;
}

function Newton_Raphson_X(Ri, Li) {
  //Caluclate X End coordinates using Newton_Raphson Method
  let fX;
  let fXd;
  let Xi;
  let Xj;
  Xi = Li;
  //Formula
  // L = X [ 1 + (1/10)(X/2R)² - (1/72)(X/2R)?�� + ...]
  while (true) {
    fX = Xi + Xi ** 3 / (40 * Ri ** 2) - Li;
    fXd = 1 + (3 * Xi ** 2) / (40 * Ri ** 2);
    Xj = Xi - fX / fXd;
    if (Math.abs(Xi / Xj) < 1.0000001 && Math.abs(Xi / Xj) > 0.9999999) {
      break;
    } else if (Xi === Xj) {
      break;
    } else {
      Xi = Xj;
    }
  }
  //Return X End coordiantes
  return Xj;
}

