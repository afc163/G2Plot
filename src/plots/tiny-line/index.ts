import * as _ from '@antv/util';
import TinyPlot from '../../Base/tinyPlot';
import { getGeom } from '../../geoms/factory';

export default class TinyLine extends TinyPlot {
  line: any;

  protected _setDefaultG2Config() { }

  protected _beforeInit() {
    super._beforeInit();
    this.type = 'tinyLine';
  }

  protected _addElements() {
    this.line = getGeom('line','mini',{
      plot: this
    });
    this._setConfig('element', this.line);
  }

  protected _annotation() {

  }

  protected _animation() { }

  protected _interactions() {}
}