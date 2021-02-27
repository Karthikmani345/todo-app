import { IBucket } from "../interface/IBucket";
import { BucketRepository } from "../repository/BucketRepository";

export interface IBucketService {
  get(id: string): Promise<IBucket>;
  getAll(): Promise<IBucket[]>;
  create(model: IBucket): Promise<IBucket>;
  // delete(id: number): Promise<unknown>;
  // update(id: number, model: IBucket): Promise<unknown>;
}

export class BucketService implements IBucketService {
  private bucketRepository: BucketRepository;

  constructor() {
    this.bucketRepository = new BucketRepository();
  }

  get(id: string): Promise<IBucket> {
    return this.bucketRepository.findById(id);
  }

  getAll = async (): Promise<IBucket[]> => {
    return this.bucketRepository.find();
  };

  create(model: IBucket): Promise<IBucket> {
    return this.bucketRepository.save(model);
  }

  update(id: string, model: IBucket): Promise<IBucket> {
    return this.bucketRepository.update(id, model);
  }
}
