import styled from 'styled-components';
import { StyledSliderItem } from './SliderItemStyles';

type SliderWrapperProps = {
  zoom_factor: number;
  visible_slides: number;
};

type SliderProps = {
  visible_slides: number;
  transform_value: string;
  zoom_factor: number;
  slide_margin: number;
  page_transition: number;
  ref: any;
};

export const StyledSliderWrapper = styled.div<SliderWrapperProps>`
  overflow: hidden;
  position: relative;
  margin-bottom: 20px;
  padding: ${(props) => (props.zoom_factor / props.visible_slides) * 0.7 + '%'} 0;

  .button-wrapper {
    position: absolute;
    width: 55px;
    height: 100%;
    top: 0;
    padding: ${(props) => props.zoom_factor / 7 + '%'} 0;
    box-sizing: border-box;
  }

  .button {
    display: block;
    background: rgb(0, 0, 0, 0.3);
    border: 0;
    top: 0;
    width: 100%;
    height: 100%;
    color: #777777;
    font-size: 3rem;
    font-weight: 800;
    cursor: pointer;
    outline: none;
    transition: all 0.7s;
    user-select: none;

    :hover {
      opacity: 0.5;
    }
  }

  .back {
    left: 0;
    border-radius: 0 1.5vw 1.5vw 0;
    padding: 0;
  }

  .forward {
    right: 0;
    border-radius: 1.5vw 0 0 1.5vw;
    padding: 0;
  }
`;

export const StyledSlider = styled.div<SliderProps>`
  display: flex;
  padding: 0 55px;
  transition: transform ${(props) => props.page_transition}ms ease;

  :hover ${StyledSliderItem} {
    transform: translateX(${(props) => props.transform_value});
  }
`;
