import { ValueTransformer } from 'typeorm/decorator/options/ValueTransformer';
import * as dayjs from 'dayjs';
export const DateTransformer: ValueTransformer = {
  to(value: dayjs.Dayjs | null) {
    return value ? value.toDate() : null;
  },
  from(value: Date | null) {
    return value ? dayjs(value) : null;
  },
};
