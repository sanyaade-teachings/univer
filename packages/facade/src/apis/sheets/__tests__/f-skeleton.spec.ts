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

import type { ICellData, IStyleData, Nullable } from '@univerjs/core';
import { ICommandService, IUniverInstanceService } from '@univerjs/core';
import { SetRangeValuesCommand, SetRangeValuesMutation, SetStyleCommand } from '@univerjs/sheets';
import type { Injector } from '@wendellhu/redi';
import { beforeEach, describe, expect, it } from 'vitest';

import { IRenderManagerService } from '@univerjs/engine-render';
import { SHEET_VIEW_KEY } from '@univerjs/sheets-ui';
import type { FUniver } from '../../facade';
import { createTestBed } from '../../__tests__/create-test-bed';

describe('Test FSkeleton', () => {
    let get: Injector['get'];
    let commandService: ICommandService;
    let renderManagerService: IRenderManagerService;
    let getSheetRenderComponent: (unitId: string, viewKey: SHEET_VIEW_KEY) => Nullable<RenderComponentType>;
    let univerAPI: FUniver;
    let getValueByPosition: (
        startRow: number,
        startColumn: number,
        endRow: number,
        endColumn: number
    ) => Nullable<ICellData>;
    let getStyleByPosition: (
        startRow: number,
        startColumn: number,
        endRow: number,
        endColumn: number
    ) => Nullable<IStyleData>;

    beforeEach(() => {
        const testBed = createTestBed();
        get = testBed.get;
        univerAPI = testBed.univerAPI;

        commandService = get(ICommandService);

        renderManagerService = get(IRenderManagerService);

        commandService.registerCommand(SetRangeValuesCommand);
        commandService.registerCommand(SetRangeValuesMutation);
        commandService.registerCommand(SetStyleCommand);

        getValueByPosition = (
            startRow: number,
            startColumn: number,
            endRow: number,
            endColumn: number
        ): Nullable<ICellData> =>
            get(IUniverInstanceService)
                .getUniverSheetInstance('test')
                ?.getSheetBySheetId('sheet1')
                ?.getRange(startRow, startColumn, endRow, endColumn)
                .getValue();

        getStyleByPosition = (
            startRow: number,
            startColumn: number,
            endRow: number,
            endColumn: number
        ): Nullable<IStyleData> => {
            const value = getValueByPosition(startRow, startColumn, endRow, endColumn);
            const styles = get(IUniverInstanceService).getUniverSheetInstance('test')?.getStyles();
            if (value && styles) {
                return styles.getStyleByCell(value);
            }
        };

        getSheetRenderComponent = (unitId: string, viewKey: SHEET_VIEW_KEY): Nullable<RenderComponentType> => {
            const render = get(IRenderManagerService).getRenderById(unitId);

            if (!render) {
                throw new Error('Render not found');
            }

            const { components } = render;

            const renderComponent = components.get(viewKey);

            if (!renderComponent) {
                throw new Error('Render component not found');
            }

            return renderComponent;
        };
    });

    it('FSkeleton test', () => {
        const sheetComponent = getSheetRenderComponent('test', SHEET_VIEW_KEY.MAIN) as SheetComponent;
        // console.log(sheetComponent);
        // const activeSheet = univerAPI.getActiveWorkbook()?.getActiveSheet();

        // // A1 sets the number
        // const range1 = activeSheet?.getRange(0, 0, 1, 1);
        // range1?.setValue(1);

        // expect(activeSheet?.getRange(0, 0, 1, 1)?.getValue()).toBe(1);

        // // B1:C2 sets the string
        // const range2 = activeSheet?.getRange(0, 1, 2, 2);
        // range2?.setValue({ v: 'test' });

        // expect(activeSheet?.getRange(0, 1, 1, 1)?.getValue()).toBe('test');
        // expect(activeSheet?.getRange(0, 2, 1, 1)?.getValue()).toBe('test');
        // expect(activeSheet?.getRange(1, 1, 1, 1)?.getValue()).toBe('test');
        // expect(activeSheet?.getRange(1, 2, 1, 1)?.getValue()).toBe('test');

        // // D1:E2 sets numbers and background color
        // const range3 = activeSheet?.getRange(0, 3, 2, 2);
        // range3?.setValue({
        //     v: 2,
        //     s: {
        //         bg: { rgb: 'red' },
        //     },
        // });

        // expect(activeSheet?.getRange(0, 3, 1, 1)?.getValue()).toBe(2);
        // expect(activeSheet?.getRange(0, 4, 1, 1)?.getValue()).toBe(2);
        // expect(activeSheet?.getRange(1, 3, 1, 1)?.getValue()).toBe(2);
        // expect(activeSheet?.getRange(1, 4, 1, 1)?.getValue()).toBe(2);

        // expect(getStyleByPosition(0, 3, 0, 3)?.bg?.rgb).toBe('red');
        // expect(getStyleByPosition(0, 4, 0, 4)?.bg?.rgb).toBe('red');
        // expect(getStyleByPosition(1, 3, 1, 3)?.bg?.rgb).toBe('red');
        // expect(getStyleByPosition(1, 4, 1, 4)?.bg?.rgb).toBe('red');
    });
});
