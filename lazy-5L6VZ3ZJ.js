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
import "./chunk-M6GAWQ5P.js";
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

// src/sheets-multi-units/lazy.ts
function getLazyPlugins() {
  return [
    [UniverSheetsDataValidationUIPlugin],
    [UniverSheetsConditionalFormattingUIPlugin],
    [UniverSheetsFilterUIPlugin, { useRemoteFilterValuesGenerator: false }],
    [UniverSheetsDrawingUIPlugin]
  ];
}
export {
  getLazyPlugins as default
};
