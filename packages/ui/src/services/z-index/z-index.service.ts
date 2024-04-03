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

import { createIdentifier } from '@wendellhu/redi';

export interface IZIndexService {

    setIndex(name: string, index: number): void;

    getIndex(name: string): number | undefined;

    removeIndex(name: string): void;

    getMaxIndex(): number;
}
export const ILayoutService = createIdentifier<IZIndexService>('ui.layout-service');

export class DesktopZIndexService implements IZIndexService {
    static #MAX_INDEX = 2147483647;
    static #MIN_INDEX = -2147483647;

    private _list: Map<string, number> = new Map();

    setIndex(name: string, index: number) {
        this._list.set(name, index);
    }

    getIndex(name: string) {
        return this._list.get(name);
    }

    removeIndex(name: string) {
        this._list.delete(name);
    }

    getMaxIndex() {
        return Math.max(...Array.from(this._list.values()));
    }
}
