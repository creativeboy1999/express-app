import { BaseEntity } from '../../db/entities/base.entity';
export declare class CounterEntity extends BaseEntity {
    id: string;
    name: string;
    count: number;
}
