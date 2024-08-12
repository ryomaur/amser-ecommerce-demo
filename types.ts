import {
  BandType,
  CaseColor,
  CaseType,
  FaceColor,
  Movement,
} from "@prisma/client";

export interface Categories {
  caseTypes: CaseType[];
  caseColors: CaseColor[];
  faceColors: FaceColor[];
  bandTypes: BandType[];
  movements: Movement[];
}
