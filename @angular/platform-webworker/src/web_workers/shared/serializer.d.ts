/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Type } from '@angular/core';
import { RenderStore } from './render_store';
/**
 * @experimental WebWorker support in Angular is currently experimental.
 */
export declare const PRIMITIVE: Type<any>;
export declare class Serializer {
    private _renderStore;
    constructor(_renderStore: RenderStore);
    serialize(obj: any, type: any): Object;
    deserialize(map: any, type: any, data?: any): any;
    private _serializeLocation(loc);
    private _deserializeLocation(loc);
    private _serializeRenderComponentType(obj);
    private _deserializeRenderComponentType(map);
}
export declare class RenderStoreObject {
}
