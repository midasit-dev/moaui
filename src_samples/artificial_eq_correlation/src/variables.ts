import {atom} from 'recoil';

export const THFC_List = atom({
  key: 'THFC_List',
  default: [
    {name : 'Name', checked : false},
  ],
});

export const THFC_Data = atom({
  key: 'THFC_Data',
  default: {},
  // {
  //   Test1: {
  //     TIME: [0, 0.01, 0.02, 0.03],
  //     VALUE: [0.0021, 0.0019, 0.0017, 0.0013]
  //   }
  // }
});

export const Cor_Result = atom({
  key: 'Cor_Result',
  default: [],
});