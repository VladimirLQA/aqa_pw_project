import { sortByID } from '../utils';

export class StorageSingleton<T extends { _id: string }> {
  private storage: T[] = [];

  addEntity(entity: T): void {
    const entityIndex = this.findEntityIndex(entity._id);
    if (entityIndex !== 1) {
      throw new Error(`Entity with id: ${entity._id} already stored`);
    }
    this.storage.push(entity);
    // entityIndex !== -1
    //   ? this.updateEntity(entity, entity._id)
    //   : this.storage.push(entity);
  }

  updateEntity(updatedEntity: T, id: string): void {
    const entityIndex = this.findEntityIndex(id);
    if (entityIndex !== -1) {
      this.storage[entityIndex] = updatedEntity;
      return;
    }
    throw new Error(`Entity with id: ${id} was not found`);
  }

  deleteEntity(id: string): void {
    const entityIndex = this.findEntityIndex(id);
    if (entityIndex !== -1) {
      this.storage.splice(entityIndex, 1);
      return;
    }
    throw new Error(`Entity with id: ${id} was not found`);
  }

  getAllEntities(): T[] {
    return this.storage;
  }

  getAllEntitiesSortedByID(): T[] {
    return sortByID(this.storage);
  }

  getEntity(id: string) {
    const entityIndex = this.findEntityIndex(id);
    if (entityIndex !== -1) return this.storage[entityIndex];
    throw new Error(`Entity with id: ${id} was not found`);
  }

  protected findEntityIndex(id: string): number {
    return this.storage.findIndex((entity: T) => entity._id === id);
  }
}
