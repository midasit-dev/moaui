from base.steel.steelutil import *
import math

def calc_pressure_stress(A1, fck, Sigma):
  phi = 0.65
  A2 = 4 * A1
  Fn = 0.85 * fck * safe_divide(A2, A1)**0.5
      
  phiFn = phi * Fn
  return { "Phi" : phi, "A1" : A1, "A2" : A2, "Fn" : Fn, "phiFn" : phiFn, "Ratio" : safe_divide(Sigma, phiFn) }
  
def calc_bolt_tensile_stress(boltMatlName, Dia, Tu):
  phi = 0.75
  Fnt = get_bolt_Fnt(boltMatlName)
  Ab = math.pi * Dia**2 / 4
  Rnt = Fnt * Ab
  phiRnt = phi * Rnt
  return { "Phi" : phi, "Fnt" : Fnt, "Ab" : Ab, "Rnt" : Rnt, "phiRnt" : phiRnt, "Ratio" : safe_divide(Tu, phiRnt) }
  
def calc_baseplate(thick, Fy, Mu):
  Phi = 0.90
  dZbp = math.pow(thick, 2.0) / 4.0
  dMn = Fy * dZbp
  dPhiMn = Phi * dMn
  dRatio = safe_divide(Mu, dPhiMn)
  return { "Phi" : Phi, "Zbp" : dZbp, "Mn" : dMn, "PhiMn" : dPhiMn, "Ratio" : dRatio }
  
def calc_anchor_bolt_cast(boltMatlName, Dia, Vu, Tu, BoltNum):
  #shear
  phi = 0.75
  Ab = math.pi * Dia**2 / 4
  Vu1 = safe_divide(Vu, BoltNum)
  Fnv = get_bolt_Fnv(boltMatlName)
  Rnv = Ab * Fnv
  phiRnv = phi * Rnv
  RatioV = safe_divide(Vu1, phiRnv)
  #tension
  Fnt = get_bolt_Fnt(boltMatlName)
  fv = safe_divide(Vu1, Ab)
  Fntp = 1.3 * Fnt - safe_divide(Fnt,(phi*Fnv)) * fv
  Fntp = min(Fnt, max(0.0, Fntp))
  Rnt = Fntp * Ab
  phiRnv = phi * Rnt
  RatioT = safe_divide(Tu, phiRnv)
  return { "Phiv" : phi, "Ab" : Ab, "Vu1" : Vu1, "Fnv" : Fnv, "Rnv" : Rnv, "PhiRnv" : phiRnv, "RatioV" : RatioV, "Phit" : phi, "Fnt" : Fnt, "Fv" : fv, "Fntp" : Fntp, "Rnt" : Rnt, "PhiRnv" : phiRnv, "Ratiov" : RatioV, "Ratiot" : RatioT }

def _GetAncBoltMinEmbededLength(Dia):
  Fac = 12
  return Dia * Fac
  
def calc_anchorage_length(boltMatlName, fck, Dia, Length):
  phi = 0.75
  Ab = math.pi * Dia**2 / 4  
  Fu = get_bolt_Fu(boltMatlName)
  Ta = phi * 0.75 * Fu * Ab
  
  Lanc = Length * Dia
  Len1 = safe_divide((Ta/2), ( 0.7 * fck * Dia))
  Len2 = _GetAncBoltMinEmbededLength(Dia)
  Len0 = Len1 + Len2
  Ratio = safe_divide(Len0, Lanc)
  return { "Phi" : phi, "Ab" : Ab, "Fu" : Fu, "Ta" : Ta, "Lanc" : Lanc, "Len1" : Len1, "Len2" : Len2, "Len0" : Len0, "Ratio" : Ratio }

def calc(data):
  input = json.loads(data)
  Pu = input.get("Pu", 0)
  Mux = input.get("Mux", 0)
  Muy = input.get("Muy", 0)
  Vux = input.get("Vux", 0)
  Vuy = input.get("Vuy", 0)
  Tu = input.get("Tu", 0)
  
  Sigma_max = input.get("Sigma_max", 0)
  Sigma_min = input.get("Sigma_min", 0)
  fck = input.get("fck", 0)
  
  Area = input.get("BP_Area", 0)
  thk = input.get("BP_thick", 0)
  Fy = input.get("BP_Fy", 0)
  
  BoltDia = input.get("Bolt_Dia", 0)
  BoltLength = input.get("Bolt_Length", 0)
  BoltNum = input.get("Bolt_Num", 0)
  
  Result_Bearing = calc_pressure_stress(Area, fck, Sigma_max)
  Result_BPlate = calc_baseplate(thk, Fy, Mux)
  Result_Bolt = calc_bolt_tensile_stress("KS-B-1016-4.6", BoltDia, Tu)
  Result_AnchorLength = calc_anchorage_length("KS-B-1016-4.6", fck, BoltDia, BoltLength)
  Result_AnchorBody = calc_anchor_bolt_cast("KS-B-1016-4.6", BoltDia, Vux, Tu, BoltNum)
  
  #설계에는 안쓰이지만 계산서에서 출력해줘야 되는 데이터들이 있다.
  #전처리단에서 데이터를 좀 채워서 넘겨주면좋겠는데... 이야기를 좀 해봐야 할듯..
  result = {
      "DgnCode" : "KDS 41 30 2022",
      "DgnUnit" : "N, mm",
      "Matl_BPlate" : "SS275 ( F_y = 275 N/mm^2 )",
      "Matl_Bolt" : "KS-B-1016-4.6",
      "Matl_Conc" : "24",
      "Sect_Colm" : "H-Beam 300x300x10x15",
      "Sect_BPlate" : "240x240x15.0x15.0(사각형)",
      "Sect_Anchor" : "2-M20",
  }
  
  result.update({f"Bearing_{key}": value for key, value in Result_Bearing.items()})
  result.update({f"BPlate_{key}": value for key, value in Result_BPlate.items()})
  result.update({f"Bolt_{key}": value for key, value in Result_Bolt.items()})
  result.update({f"AnchorLength_{key}": value for key, value in Result_AnchorLength.items()})
  result.update({f"AnchorBody_{key}": value for key, value in Result_AnchorBody.items()})
  result.update(input)
  
  return result


  