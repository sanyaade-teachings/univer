/**
 * Copyright 2023-present DreamNum Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type { IScale } from '@univerjs/core';
import { numberToABC } from '@univerjs/core';

import { DEFAULT_FONTFACE_PLANE, FIX_ONE_PIXEL_BLUR_OFFSET, MIDDLE_CELL_POS_MAGIC_NUMBER } from '../../../basics/const';
import { getColor } from '../../../basics/tools';
import type { UniverRenderingContext } from '../../../context';
import { SheetColumnHeaderExtensionRegistry } from '../../extension';
import type { SpreadsheetSkeleton } from '../sheet-skeleton';
import type { IAColumnCfg, IAColumnCfgObj, IColumnStyleCfg } from '../interfaces';
import { SheetExtension } from './sheet-extension';

const UNIQUE_KEY = 'DefaultColumnHeaderLayoutExtension';
interface IHeaderColumnsConfig extends IColumnStyleCfg {
    columnStyle: IColumnStyleCfg;
    columnsCfg: IAColumnCfg[];
}

export class ColumnHeaderLayout extends SheetExtension {
    override uKey = UNIQUE_KEY;
    override Z_INDEX = 10;
    columnsCfg: IAColumnCfg[];
    columnStyle: Required<IColumnStyleCfg> = {
        fontSize: 13,
        fontFamily: DEFAULT_FONTFACE_PLANE,
        fontColor: '#000000',
        backgroundColor: getColor([248, 249, 250]),
        borderColor: getColor([217, 217, 217]),
        textAlign: 'center',
        textBaseline: 'middle',
    };

    constructor(cfg?: IHeaderColumnsConfig) {
        super();
        if (cfg) {
            this.configHeaderColumn(cfg);
        }
    }

    configHeaderColumn(cfg: IHeaderColumnsConfig) {
        this.columnsCfg = cfg.columnsCfg;
        this.columnStyle = { ...this.columnStyle, ...cfg.columnStyle };
    }

    getCfgOfCurrentColumn(colIndex: number) {
        let curColCfg;
        const { columnsCfg } = this;
        if (columnsCfg) {
            if (typeof columnsCfg[colIndex] == 'string') {
                columnsCfg[colIndex] = { text: columnsCfg[colIndex] } as IAColumnCfg; ;
            }
            const aColumnCfg = columnsCfg[colIndex] as IColumnStyleCfg & { text: string };
            curColCfg = { ...this.columnStyle, ...aColumnCfg };
        } else {
            curColCfg = { text: numberToABC(colIndex) };
        }
        return curColCfg as IAColumnCfgObj;
    }

    setDefaultCtxStyle(ctx: UniverRenderingContext, columnTotalWidth: number, columnHeaderHeight: number) {
        const columnStyle = this.columnStyle;
        ctx.fillStyle = columnStyle.backgroundColor!;
        ctx.fillRectByPrecision(0, 0, columnTotalWidth, columnHeaderHeight);
        ctx.textAlign = columnStyle.textAlign;
        ctx.textBaseline = columnStyle.textBaseline;
        ctx.fillStyle = columnStyle.fontColor;
        ctx.strokeStyle = columnStyle.borderColor;
        ctx.setLineWidthByPrecision(1);
        ctx.translateWithPrecisionRatio(FIX_ONE_PIXEL_BLUR_OFFSET, FIX_ONE_PIXEL_BLUR_OFFSET);
        ctx.font = `${columnStyle.fontSize}px ${DEFAULT_FONTFACE_PLANE}`;
        ctx.beginPath();
    }

    override draw(ctx: UniverRenderingContext, parentScale: IScale, spreadsheetSkeleton: SpreadsheetSkeleton) {
        const { rowColumnSegment, columnHeaderHeight = 0 } = spreadsheetSkeleton;
        const { startColumn, endColumn } = rowColumnSegment;

        if (!spreadsheetSkeleton || columnHeaderHeight === 0) {
            return;
        }

        const { rowHeightAccumulation, columnTotalWidth, columnWidthAccumulation, rowTotalHeight } = spreadsheetSkeleton;

        if (
            !rowHeightAccumulation ||
            !columnWidthAccumulation ||
            columnTotalWidth === undefined ||
            rowTotalHeight === undefined
        ) {
            return;
        }

        const scale = this._getScale(parentScale);
        this.setDefaultCtxStyle(ctx, columnTotalWidth, columnHeaderHeight);

        let preColumnPosition = 0;
        for (let c = startColumn - 1; c <= endColumn; c++) {
            if (c < 0 || c > columnWidthAccumulation.length - 1) {
                continue;
            }

            const columnEndPosition = columnWidthAccumulation[c];
            if (preColumnPosition === columnEndPosition) {
                // Skip hidden columns
                continue;
            }
            const cellBound = { left: preColumnPosition, top: 0, right: columnEndPosition, bottom: columnHeaderHeight, height: columnHeaderHeight };

            // vertical line border
            ctx.moveToByPrecision(cellBound.right, 0);
            ctx.lineToByPrecision(cellBound.right, cellBound.height);

            const curColumnCfg = this.getCfgOfCurrentColumn(c);
            // column header text
            const centerXCellRect = (() => {
                switch (curColumnCfg.textAlign) {
                    case 'center':
                        return cellBound.left + (cellBound.right - cellBound.left) / 2;
                    case 'right':
                        return cellBound.right - MIDDLE_CELL_POS_MAGIC_NUMBER;
                    case 'left':
                        return cellBound.left + MIDDLE_CELL_POS_MAGIC_NUMBER;
                    default: // center
                        return cellBound.left + (cellBound.right - cellBound.left) / 2;
                }
            })();
            const middleYCellRect = cellBound.height / 2 + MIDDLE_CELL_POS_MAGIC_NUMBER; // Magic number 1, because the vertical alignment appears to be off by 1 pixel

            const needSaveState = curColumnCfg.textAlign !== 'center';
            if (needSaveState) {
                ctx.save();
            }

            const str = curColumnCfg.text;
            ctx.fillText(str, centerXCellRect, middleYCellRect);
            if (needSaveState) {
                ctx.restore();
            }

            preColumnPosition = columnEndPosition;
        }

        // border bottom line
        const columnHeaderHeightFix = columnHeaderHeight - 0.5 / scale;
        ctx.moveToByPrecision(0, columnHeaderHeightFix);
        ctx.lineToByPrecision(columnTotalWidth, columnHeaderHeightFix);
        ctx.stroke();
    }
}

SheetColumnHeaderExtensionRegistry.add(new ColumnHeaderLayout());
