import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';
import {Material} from './models/material.model';

@Injectable({
    providedIn: 'root'
})
export class MaterialService {
    private materialList: Material[] = [
        new Material('m1', 'Pizarra', 'Sirve Para Pintar', 2, '#'),
        new Material('m2', 'Mesa', 'Mesa de trabajo', 4, '#'),
        new Material('m3', 'Silla', 'Silla de oficina', 3, '#'),
        new Material('m4', 'Horno Electrico', 'Horno electrico', 2, '#'),
    ];

    private _materials = new BehaviorSubject<Material[]>(this.materialList);

    constructor() {}

    get materials() {
        return this._materials.asObservable();
    }
    getMaterial(id: string) {
        return this._materials.pipe(
            map(materials => {
                return materials.find(p => p.id === id);
            })
        );
    }
    updateMaterial(materialId: string, title: string, description: string, numberEl: number) {
        let updatedMaterials: Material[];
        return this.materials.pipe(
            take(1),
            tap(materials => {
                const updateMaterialIndex = materials.findIndex(
                    ml => ml.id === materialId
                );
                updatedMaterials = [...materials];
                const oldMaterial = updatedMaterials[updateMaterialIndex];
                updatedMaterials[updateMaterialIndex] = new Material(oldMaterial.id, title, description, numberEl, oldMaterial.image);
                this._materials.next(updatedMaterials);
            })
        );
    }
}
