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

import { IUniverInstanceService } from '@univerjs/core';
import { fixLineWidthByScale, getCanvasOffsetByEngine, IRenderManagerService, Vector2 } from '@univerjs/engine-render';
import { getSheetObject, SheetSkeletonManagerService, VIEWPORT_KEY } from '@univerjs/sheets-ui';
import { Inject } from '@wendellhu/redi';

export class FSkeleton {
    _devDiv = window.document.createElement('div');
    constructor(
        @Inject(SheetSkeletonManagerService) private readonly _sheetSkeletonManagerService: SheetSkeletonManagerService,
        @IUniverInstanceService private readonly _currentUniverService: IUniverInstanceService,
        @IRenderManagerService private readonly _renderManagerService: IRenderManagerService
    ) {
        const div = this._devDiv;
        div.id = 'dev-float-div';
        div.style.position = 'absolute';

        setTimeout(() => {
            document.querySelector('.univer-app-container-canvas')?.appendChild(div);
        }, 2000);
    }

    private _getSheetObject() {
        return getSheetObject(this._currentUniverService, this._renderManagerService);
    }

    moveDiv(x: number, y: number, width: number, height: number) {
        this._devDiv.style.left = `${x}px`;
        this._devDiv.style.top = `${y}px`;
        this._devDiv.style.width = `${width}px`;
        this._devDiv.style.height = `${height}px`;
        this._devDiv.style.backgroundColor = '#f00';
        this._devDiv.style.zIndex = '9999';
    }

    xyToIndex(x: number, y: number): { col: number; row: number } {
        const skeleton = this._sheetSkeletonManagerService?.getCurrent()?.skeleton;
        if (!skeleton) {
            throw new Error('No skeleton found');
        }

        // mouse position + scale + overflow offset

        //  getCellPositionByOffset   calculateCellIndexByPosition
        const result = skeleton.getCellPositionByOffset(x, y, 1, 1, { x: 0, y: 0 });

        return { col: 0, row: 0 };
    }

    indexToXY(row: number, column: number): { startX: number; startY: number } | false {
        const skeleton = this._sheetSkeletonManagerService?.getCurrent()?.skeleton;

        // console.log(
        //     this._sheetSkeletonManagerService._sheetSkeletonParam,
        //     this._renderManagerService.getRenderAll()
        // );

        if (!skeleton) {
            throw new Error('No skeleton found');
        }

        // The height of each row and the width of each column
        // const { rowHeightAccumulation, columnWidthAccumulation } = skeleton;

        const { engine, scene } = getSheetObject(this._currentUniverService, this._renderManagerService) || {};

        if (!engine || !scene) {
            throw new Error('No engine or scene found');
        }

        // canvas offset of the page visible area
        // const canvasOffset = getCanvasOffsetByEngine(engine);

        // get the cell position by accumulation of do not consider merging cell scenes
        const { startX, startY, endX, endY } = skeleton.getNoMergeCellPositionByIndex(row, column);

        // const unitId = this._currentUniverService.getCurrentUniverSheetInstance().getUnitId();

        // const scene = this._renderManagerService.getRenderById(unitId)!.scene!;

        const { scaleX, scaleY } = scene.getAncestorScale();

        // final scale on this display, zoom scale * precision scale
        const { scaleX: precisionScaleX, scaleY: precisionScaleY } = scene.getPrecisionScale();

        // 根据点击坐标来获取当前的视口
        // 但这里没有点击坐标，所以直接根据当前列和固定列数量计算来获取当前的视口
        // window.viewports = scene.getViewports();
        // console.table(scene.getViewports().map((it) => {
        //     return {
        //         name: it._viewPortKey,
        //         w: it.width,
        //         h: it.height,
        //         top: it.top,
        //         left: it.left,
        //         right: it.right,
        //         bottom: it.bottom,
        //         actualScrollX: it.actualScrollX,
        //         actualScrollY: it.actualScrollY,
        //         getBounding: it.getBounding(),
        //         it,
        //     };
        // }));

        const worksheet = this._currentUniverService.getCurrentUniverSheetInstance().getActiveSheet();

        if (!worksheet) return false;

        const {
            startColumn: freezeStartColumn,
            startRow: freezeStartRow,
            ySplit: freezeYSplit,
            xSplit: freezeXSplit,
        } = worksheet.getFreeze();

        if (
            column < freezeStartColumn - freezeXSplit ||
            row < freezeStartRow - freezeYSplit
        ) {
            // in freeze area, not visible
            return false;
        }

        // const mainViewport = scene.getViewport(VIEWPORT_KEY.VIEW_MAIN);
        // if (mainViewport == null) {
        //     return false;
        // }

        // const bounds = mainViewport.getBounding();

        // get the start and end row and column of the viewport(visible area)
        // const {
        //     startRow: viewportStartRow,
        //     startColumn: viewportStartColumn,
        //     endRow: viewportEndRow,
        //     endColumn: viewportEndColumn,
        // } = skeleton.getRowColumnSegment(bounds);

        // let startSheetViewRow: number | undefined;
        // let startSheetViewColumn: number | undefined;

        // const viewports = scene.getViewports();
        // console.table(viewports.map((it) => {
        //     return {
        //         name: it._viewPortKey,
        //         ...skeleton.getRowColumnSegment(it.getBounding()),
        //         getBounding: it.getBounding(),
        //     };
        // }));

        const viewPort = scene.getViewports().find((it) => {
            const bounding = it.getBounding();
            const { startRow, startColumn, endRow, endColumn } = skeleton.getRowColumnSegment(bounding);

            if (row >= startRow
                && row <= endRow
                && column >= startColumn
                && column <= endColumn) {
                return true;
            }

            return false;
        });
        if (!viewPort) throw new Error('No viewport found');

        // console.log('found viewport', viewPort._viewPortKey, skeleton.getRowColumnSegment(viewPort.getBounding()));

        // // vertical overflow only happens when the selection's row is in not the freeze area
        // if (row >= freezeStartRow && column >= freezeStartColumn - freezeXSplit) {
        //     // top overflow
        //     if (row <= viewportStartRow) {
        //         startSheetViewRow = row;
        //     }

        //     // bottom overflow
        //     if (row >= viewportEndRow) {
        //         const minRowAccumulation = rowHeightAccumulation[row] - mainViewport.height!;
        //         for (let r = viewportStartRow; r <= row; r++) {
        //             if (rowHeightAccumulation[r] >= minRowAccumulation) {
        //                 startSheetViewRow = r + 1;
        //                 break;
        //             }
        //         }
        //     }
        // }
        // // horizontal overflow only happens when the selection's column is in not the freeze area
        // if (column >= freezeStartColumn && row >= freezeStartRow - freezeYSplit) {
        //     // left overflow
        //     if (column <= viewportStartColumn) {
        //         startSheetViewColumn = column;
        //     }

        //     // right overflow
        //     if (column >= viewportEndColumn) {
        //         const minColumnAccumulation = columnWidthAccumulation[column] - mainViewport.width!;
        //         for (let c = viewportStartColumn; c <= column; c++) {
        //             if (columnWidthAccumulation[c] >= minColumnAccumulation) {
        //                 startSheetViewColumn = c + 1;
        //                 break;
        //             }
        //         }
        //     }
        // }

        // if (startSheetViewRow || startSheetViewColumn) {
        //     // 不在视口内
        //     return false;
        // }

        // const config = worksheet.getConfig();
        // const { startRow, startColumn, ySplit, xSplit } = params;
        // config.freeze = { startRow, startColumn, ySplit, xSplit };
        const viewportMain = viewPort;
        // this._renderManagerService.getRenderById(unitId)!.scene!.getActiveViewportByCoord(
        //     Vector2.FromArray([startX, startY])
        // )!;

        const scrollXY = scene.getScrollXY(viewportMain);
        const result = {
            startX: fixLineWidthByScale(skeleton.convertTransformToOffsetX(startX, scaleX, scrollXY), precisionScaleX),
            startY: fixLineWidthByScale(skeleton.convertTransformToOffsetY(startY, scaleY, scrollXY), precisionScaleY),
            endX: fixLineWidthByScale(skeleton.convertTransformToOffsetX(endX, scaleX, scrollXY), precisionScaleX),
            endY: fixLineWidthByScale(skeleton.convertTransformToOffsetY(endY, scaleY, scrollXY), precisionScaleY),
        };

        this.moveDiv(result.startX, result.startY, result.endX - result.startX, result.endY - result.startY);

        return result;
    }
}
