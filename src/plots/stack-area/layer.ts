import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaViewConfig } from '../area/layer';
import './component/label/area-label';
import LineLabel from './component/label/line-label';

export interface StackAreaViewConfig extends AreaViewConfig {
  stackField: string;
}

export interface StackAreaLayerConfig extends StackAreaViewConfig, LayerConfig {}

export default class StackAreaLayer<T extends StackAreaLayerConfig = StackAreaLayerConfig> extends BaseArea<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      label: {
        visible: false,
        type: 'area',
      },
    });
  }

  public type: string = 'stackArea';

  protected label() {
    const props = this.options;
    const label = props.label as Label;

    if (label && label.visible === false) {
      this.area.label = false;
      return;
    }
    const labelType = this.getLabelType(label);

    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (labelType === 'areaLine' || labelType === 'area') {
      label.offset = 0;
    }

    if (labelType === 'area') {
      label.style = _.deepMix({}, label.style, {
        lineWidth: 0,
        stroke: 'rgba(0,0,0,0)',
      });
    }
  }

  protected adjustArea(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected adjustLine(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected adjustPoint(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  public afterRender() {
    const props = this.options;
    const visible = _.get(this.options, ['label', 'visible']);
    const type = _.get(this.options, ['label', 'type']);

    if (visible && type === 'line') {

      const label = new LineLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });

      label.render();
    }

    // TODO 运行补起来，先关闭
    props.responsive = false;
    super.afterRender();
  }

  private getLabelField(type, props) {
    const mapper = {
      point: props.yField,
      areaLine: props.stackField,
      area: props.stackField,
    };
    return mapper[type];
  }

  private getLabelType(labelProps) {
    if (labelProps.type === 'line') {
      return 'areaLine';
    }
    return labelProps.type;
  }
}

registerPlotType('stackArea', StackAreaLayer);
