import { MinMaxRange } from '../../../../../../../models/common.model';
import { DualSliderColors } from '../models/dual-slider.model';

type GetSliderBackgroundType = (limits: MinMaxRange, values: MinMaxRange, colors: DualSliderColors) => string;

export const getSliderBackground: GetSliderBackgroundType = (
  limits: MinMaxRange,
  values: MinMaxRange,
  colors: DualSliderColors
) => {
  const rangeDistance: number = limits.max - limits.min;
  const fromPosition: number = values.min - limits.min;
  const toPosition: number = values.max - limits.min;

  return `linear-gradient(
    to right,
    ${colors.slider} 0%,
    ${colors.slider} ${(fromPosition / rangeDistance) * 100}%,
    ${colors.fill} ${(fromPosition / rangeDistance) * 100}%,
    ${colors.fill} ${(toPosition / rangeDistance) * 100}%,
    ${colors.slider} ${(toPosition / rangeDistance) * 100}%,
    ${colors.slider} 100%)`;
};
