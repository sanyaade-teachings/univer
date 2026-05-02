import {
  UniverSheetsThreadCommentUIPlugin
} from "./chunk-H6QHAV23.js";
import {
  UniverSheetsNoteUIPlugin,
  UniverSheetsTableUIPlugin
} from "./chunk-RVOK74XG.js";
import {
  UniverDocsMentionUIPlugin
} from "./chunk-D3QPH7QN.js";
import {
  UniverThreadCommentUIPlugin
} from "./chunk-LPGYMPP7.js";
import "./chunk-GYSH6HL2.js";
import "./chunk-5LSPWM2V.js";
import "./chunk-W7EFL2EA.js";
import {
  UniverDocsDrawingUIPlugin
} from "./chunk-THXVG335.js";
import "./chunk-VVSCTRT4.js";
import {
  UniverSheetsDrawingUIPlugin
} from "./chunk-MLFBVVME.js";
import {
  UniverSheetsConditionalFormattingUIPlugin,
  UniverSheetsDataValidationUIPlugin,
  UniverSheetsFilterUIPlugin
} from "./chunk-LYCLRBFE.js";
import "./chunk-2FNOW4GK.js";
import "./chunk-AZHMLAGZ.js";
import {
  UniverSheetsNumfmtUIPlugin
} from "./chunk-FJ5MRTUM.js";
import {
  UniverSheetsFormulaUIPlugin
} from "./chunk-M6GAWQ5P.js";
import "./chunk-N2RQEFDC.js";
import "./chunk-MBZ442FO.js";
import "./chunk-PPREH44U.js";
import "./chunk-NW5FEDQC.js";
import "./chunk-5YA62WFH.js";
import "./chunk-JGEZE7BC.js";
import "./chunk-VYDPVHQH.js";
import "./chunk-UI3TUZSE.js";
import "./chunk-EQ2B2W73.js";
import "./chunk-24OICD5T.js";

// src/sheets/lazy.ts
function getLazyPlugins() {
  return [
    [UniverDocsDrawingUIPlugin],
    [UniverDocsMentionUIPlugin],
    [UniverSheetsNumfmtUIPlugin],
    [UniverThreadCommentUIPlugin],
    [UniverSheetsThreadCommentUIPlugin],
    [UniverSheetsNoteUIPlugin],
    [UniverSheetsTableUIPlugin],
    [UniverSheetsFormulaUIPlugin],
    [UniverSheetsDataValidationUIPlugin],
    [UniverSheetsConditionalFormattingUIPlugin],
    [UniverSheetsFilterUIPlugin, { useRemoteFilterValuesGenerator: false }],
    [UniverSheetsDrawingUIPlugin]
  ];
}
export {
  getLazyPlugins as default
};
