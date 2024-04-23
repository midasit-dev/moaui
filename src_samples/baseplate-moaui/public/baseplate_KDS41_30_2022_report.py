from base.ReportUtil import *
import json

# Json읽기
def GenerateReport(JsonData):
  RptData = json.loads(JsonData)
  
  RptUtil   = CReportUtil( "test.md", f'*MEMBER NAME : BP1*', )
  
  RptUtil.add_chapter("일반 사항")
  RptUtil.add_line(f'설계 기준 : { find_data(RptData, "DgnCode") }')
  RptUtil.add_line(f'기준 단위계 : { find_data(RptData, "DgnUnit") }')
  
  RptUtil.add_chapter("재질")
  RptUtil.add_line(f'베이스 플레이트 : { find_data(RptData, "Matl_BPlate") }')
  RptUtil.add_line(f'앵커 볼트 : { find_data(RptData, "Matl_Bolt")  }')
  RptUtil.add_line(f'콘크리트 : { find_data(RptData, "Matl_Conc")  }')
  
  RptUtil.add_chapter("단면")
  RptUtil.add_line(f'기둥 : { find_data(RptData, "Sect_Colm")  }')
  RptUtil.add_line(f'베이스 플레이트 : { find_data(RptData, "Sect_BPlate")  }')
  RptUtil.add_line(f'앵커 볼트 : { find_data(RptData, "Sect_Anchor")  }')
  
  RptUtil.add_chapter("설계 부재력")
  RptUtil.add_line_fvu("P_{u}",  find_data(RptData, "Pu") , enUnit.FORCE)
  RptUtil.add_line_fvu("M_{ux}", find_data(RptData, "Mux") , enUnit.MOMENT)
  RptUtil.add_line_fvu("M_{uy}", find_data(RptData, "Muy") , enUnit.MOMENT)
  RptUtil.add_line_fvu("V_{ux}", find_data(RptData, "Vux") , enUnit.FORCE)
  RptUtil.add_line_fvu("V_{uy}", find_data(RptData, "Vuy") , enUnit.FORCE)
  
  ## 베이스 플레이트의 지압 응력 검토
  RptUtil.add_chapter("베이스 플레이트의 지압 응력 검토")
  RptUtil.add_paragraph("지압 응력")
  RptUtil.add_line_fvu("f_{max}", find_data(RptData, "f_max") , enUnit.FORCE)
  RptUtil.add_line_fvu("f_{min}", find_data(RptData, "f_min") , enUnit.FORCE)
  RptUtil.add_line_fvu("σ_{max}", find_data(RptData, "Sigma_max") , enUnit.STRESS)
  RptUtil.add_line_fvu("σ_{min}", find_data(RptData, "Sigma_min") , enUnit.STRESS)
  
  RptUtil.add_line("")
  RptUtil.add_paragraph("콘크리트의 지압 응력 계산")
  RptUtil.add_line(f'ø = { find_data(RptData, "Bearing_Phi")  }')
  RptUtil.add_line_fvu("A_1", find_data(RptData, "Bearing_A1") , enUnit.AREA)
  RptUtil.add_line_fvu("A_2", find_data(RptData, "Bearing_A2") , enUnit.AREA)
  RptUtil.add_line_fvu(r"F_n = 0.85 f_ck \\sqrt{\\frac{A_2}{A_1}}", find_data(RptData, "Bearing_Fn") , enUnit.STRESS)
  RptUtil.add_line_fvu("øF_n", find_data(RptData, "Bearing_phiFn") , enUnit.STRESS)
  
  RptUtil.add_paragraph("강도비")
  RptUtil.add_line_fvu("σ_{max}/øF_n", find_data(RptData, "Bearing_Ratio") , enUnit.NONE)
  
  ## 앵커 볼트의 인장 응력 검토
  RptUtil.add_chapter("앵커 볼트의 인장 응력 검토")
  RptUtil.add_paragraph("인장력")
  RptUtil.add_line_fvu("T_{u,max}", find_data(RptData, "Bolt_Tumax") , enUnit.FORCE)
  RptUtil.add_line_fvu("T_{u,min}", find_data(RptData, "Bolt_Tumin") , enUnit.FORCE)
  
  RptUtil.add_paragraph("인장 강도 검토")
  RptUtil.add_line(f'ø = { find_data(RptData, "Bolt_Phi")  }')
  RptUtil.add_line_fvu("F_{nt}", find_data(RptData, "Bolt_Fnt") , enUnit.STRESS)
  RptUtil.add_line_fvu("A_b", find_data(RptData, "Bolt_Ab") , enUnit.AREA)
  RptUtil.add_line_fvu("R_{nt}", find_data(RptData, "Bolt_Rnt") , enUnit.FORCE)
  RptUtil.add_line_fvu("øR_{nt}", find_data(RptData, "Bolt_PhiRnt") , enUnit.FORCE)
  
  RptUtil.add_paragraph("강도비")
  RptUtil.add_line_fvu("T_{u,max}/øR_{nt}", find_data(RptData, "Bolt_Ratio") , enUnit.NONE)
  
  ## 베이스 플레이트 검토
  RptUtil.add_chapter("베이스 플레이트의 검토")
  RptUtil.add_paragraph("설계 모멘트")
  RptUtil.add_line_fvu("M_{ux}", find_data(RptData, "BPlate_Mux") , enUnit.MOMENT)
  RptUtil.add_line_fvu("M_{uy}", find_data(RptData, "BPlate_Muy") , enUnit.MOMENT)
  RptUtil.add_line_fvu("M_u = max( M_{ux}, M_{uy})", find_data(RptData, "BPlate_Mu") , enUnit.MOMENT)
  
  RptUtil.add_paragraph("모멘트 강도 계산")
  RptUtil.add_line_fvu("ø", find_data(RptData, "BPlate_Phi") , enUnit.NONE)
  RptUtil.add_line_fvu("Z_{bp} = t_{bp}^2 / 4", find_data(RptData, "BPlate_Zbp") , enUnit.VOLUME)
  RptUtil.add_line_fvu("M_n = F_y Z_{bp}", find_data(RptData, "BPlate_Mn") , enUnit.MOMENT)
  RptUtil.add_line_fvu("øM_n", find_data(RptData, "BPlate_PhiMn") , enUnit.MOMENT)
  
  RptUtil.add_paragraph("강도비 계산")
  RptUtil.add_line_fvu("M_u / øM_n", find_data(RptData, "BPlate_Ratio") , enUnit.NONE)
  
  #앵커 볼트 검토 선설치앵커
  RptUtil.add_chapter("앵커 볼트 검토")
  RptUtil.add_paragraph("설계 부재력")
  RptUtil.add_line(f'앵커 볼트의 개수 = {find_data(RptData, "AnchorBody_Num") }EA')
  RptUtil.add_line_fvu("T_{u,max}", find_data(RptData, "AnchorBody_Tumax") , enUnit.FORCE)
  RptUtil.add_line_fvu("V_u", find_data(RptData, "AnchorBody_Vu") , enUnit.FORCE)
  RptUtil.add_line_fvu("V_{u,1}", find_data(RptData, "AnchorBody_Vu1") , enUnit.FORCE)
  
  RptUtil.add_paragraph(f'전단 강도 검토')
  RptUtil.add_line_fvu("ø", find_data(RptData, "AnchorBody_Phiv") , enUnit.NONE)
  RptUtil.add_line_fvu("A_b", find_data(RptData, "AnchorBody_Ab") , enUnit.AREA)
  RptUtil.add_line_fvu("F_{nv}", find_data(RptData, "AnchorBody_Fnv") , enUnit.STRESS)
  RptUtil.add_line_fvu("R_{nv}", find_data(RptData, "AnchorBody_Rnv") , enUnit.FORCE)
  RptUtil.add_line_fvu("øR_{nv}", find_data(RptData, "AnchorBody_PhiRnv") , enUnit.FORCE)
  RptUtil.add_line_fvu("V_u1 / øR_{nv}", find_data(RptData, "AnchorBody_Ratiov") , enUnit.NONE)
  
  RptUtil.add_paragraph(f'인장 강도 검토')
  RptUtil.add_line_fvu("ø", find_data(RptData, "AnchorBody_Phit") , enUnit.NONE)
  RptUtil.add_line_fvu("A_b", find_data(RptData, "AnchorBody_Ab") , enUnit.AREA)
  RptUtil.add_line_fvu("F_{nt}", find_data(RptData, "AnchorBody_Fnt") , enUnit.STRESS)
  RptUtil.add_line_fvu("f_v = V_{u1} / A_b", find_data(RptData, "AnchorBody_Fv") , enUnit.STRESS)
  #RptUtil.add_line("F_{nt'} = 1.3F_{nt} F_{nt} / ø F_{nv} f_v ≤ F_{nt}') 이거표현 안되는데?
  RptUtil.add_line_fvu("F_{nt}'", find_data(RptData, "AnchorBody_Fnt") , enUnit.STRESS)
  RptUtil.add_line_fvu("R_{nt} = F_{nt'} A_b", find_data(RptData, "AnchorBody_Rnt") , enUnit.FORCE)
  RptUtil.add_line_fvu("øR_{nt}", find_data(RptData, "AnchorBody_PhiRnt") , enUnit.FORCE)
  RptUtil.add_line_fvu("T_{u,max}/øR_{nt}", find_data(RptData, "AnchorBody_Ratiott") , enUnit.NONE)
  
  RptUtil.add_chapter("앵커 볼트 정착 길이 검토")
  RptUtil.add_paragraph("갈고리형 철근의 정착 길이 검토")
  RptUtil.add_line_fvu("ø", find_data(RptData, "AnchorLength_Phi") , enUnit.NONE)
  RptUtil.add_line_fvu("L_{anc}", find_data(RptData, "AnchorLength_Lanc") , enUnit.LENGTH)
  RptUtil.add_line_fvu("T_{anc} = øF_{anc} A_{anc}", find_data(RptData, "AnchorLength_Tanc") , enUnit.FORCE)
  RptUtil.add_line_fvu("L_{h1} = (T_{anc}/2) / (0.7f_{ck} d_{anc})", find_data(RptData, "AnchorLength_Lh1") , enUnit.LENGTH)
  RptUtil.add_line_fvu("L_{h2} = 12 d_{anc}", find_data(RptData, "AnchorLength_Lh2") , enUnit.LENGTH)
  RptUtil.add_line_fvu("L_{req} = L_{h1} + L_{h2}", find_data(RptData, "AnchorLength_Lreq") , enUnit.LENGTH)
  RptUtil.add_line_fvu("L_{req} / L_{anc}", find_data(RptData, "AnchorLength_Ratio") , enUnit.NONE)
  
  return RptUtil.get_md_text()






