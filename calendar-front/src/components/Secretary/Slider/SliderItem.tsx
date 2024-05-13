import React from 'react';
// Styles
import { StyledSliderItem } from './SliderItemStyles';

type SliderItemProps = {
  children: any
  slideClass: string;
  zoom_factor: number;
  id: number;
  callback: (id: number) => void;
  callbackOut: () => void;
  slide_margin: number;
  visible_slides: number;
};

const SliderItem: React.FC<SliderItemProps> = ({
  slide_margin,
  visible_slides,
  zoom_factor,
  slideClass,
  id,
  callback,
  callbackOut,
  children
}) => (
  <StyledSliderItem
    zoom_factor={zoom_factor}
    slide_margin={slide_margin}
    visible_slides={visible_slides}
    className={slideClass}
    onMouseOver={() => callback(id)}
    onMouseOut={callbackOut}
  >
    {children}
  </StyledSliderItem>
);

export default SliderItem;
