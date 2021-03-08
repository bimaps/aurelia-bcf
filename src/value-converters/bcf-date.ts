import * as moment from 'moment';

export class BcfDateValueConverter {
  toView(value, format: string = 'DD/MM/YYYY') {
    return moment(value, 'iso-8601').format(format);
  }

  fromView(value) {
    //
  }
}
