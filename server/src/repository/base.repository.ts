import * as mongoose from 'mongoose';
import {Observable} from 'rxjs/Observable';

export interface IRead<T> {
  retrieve(): Observable<T[]>;
  findById(id: string): Observable<T>;
  findOne(cond?: Object): Observable<T>;
  find(cond: Object, fields: Object, options: Object): Observable<T[]>;
}

export interface IWrite<T> {
  create(item: T): Observable<T>;
  update(_id: mongoose.Types.ObjectId, item: T): Observable<T>;
  delete(_id: string): Observable<void>;
}

export class RepositoryBase<T extends mongoose.Document> implements IRead<T>, IWrite<T> {

  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  createOrUpdate(item: T): Observable<T> {
    return item._id ? this.update(item._id, item) : this.create(item);
  }

  create(item: T | T[]): Observable<T> {
    return Observable.create(observer => {
      this._model.create(item, (error: any, result: T) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  retrieve(): Observable<T[]> {
    return Observable.create(observer => {
      this._model.find({}, (error: any, result: T[]) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  update(_id: mongoose.Types.ObjectId, item: T): Observable<T> {
    return Observable.create(observer => {
      this._model.update({ _id: _id }, item, (error: any, result: T) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  delete(_id: string): Observable<void> {
    return Observable.create(observer => {
      this._model.remove({ _id: this.toObjectId(_id) }, (error) => {
        observer.next(error);
        observer.complete();
      });
    });
  }

  deleteAll(): Observable<void> {
    return Observable.create(observer => {
      this._model.remove({}, (error) => {
        observer.next(error);
        observer.complete();
      });
    });
  }

  findById(_id: string): Observable<T> {
    return Observable.create(observer => {
      this._model.findById(_id, (error: any, result: T) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  findOne(cond?: Object): Observable<T> {
    return Observable.create(observer => {
      this._model.findOne(cond, (error, result: T) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  find(cond?: Object, fields?: Object, options?: Object): Observable<T[]> {
    return Observable.create(observer => {
      this._model.find(cond, options, (error: any, result: T[]) => {
        observer.next(error ? error : result);
        observer.complete();
      });
    });
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

}
