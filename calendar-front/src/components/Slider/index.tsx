import React, { useState, useEffect, useRef } from 'react';
// Components
import SliderItem from './SliderItem';
// Styles
import { StyledSliderWrapper, StyledSlider } from './SliderStyles';
// Types
type SliderProps = {
  children?: any;
  zoom_factor: number;
  slide_margin: number;
  max_visible_slides: number;
  page_transition: number;
};

const numberOfSlides = (maxVisibleSlides: number, windowWidth: number) => {
  if (windowWidth > 1200) return maxVisibleSlides;
  if (windowWidth > 992) return 4;
  if (windowWidth > 768) return 3;
  return 2;
};

const Slider: React.FC<SliderProps> = ({
  children,
  zoom_factor,
  slide_margin,
  max_visible_slides,
  page_transition
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [transformValue, setTransformValue] = useState(`-${zoom_factor / 2}%`);
  const [scrollSize, setScrollSize] = useState(0);

  const sliderRef = useRef<HTMLElement>(null);

  const visible_slides = numberOfSlides(max_visible_slides, scrollSize);
  // Pages start at 0, therefore -1 at the end here
  const totalPages: number = Math.ceil(children.length / visible_slides) - 1;

  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        setScrollSize(entries[0].contentRect.width);
      });
      resizeObserver.observe(sliderRef.current);
    }
  }, [sliderRef]);

  // Position slider on resize
  useEffect(() => {
    if (sliderRef && sliderRef.current) {
      if (currentPage > totalPages) setCurrentPage(totalPages);
      sliderRef.current.style.transform = `translate3D(-${currentPage * scrollSize
        }px, 0, 0)`;
    }
  }, [sliderRef, currentPage, scrollSize, totalPages]);

  // Have to disable hover effect on slides when flipping page
  // Otherwise it will look ugly when mouse hovers over the slides
  const disableHoverEffect = () => {
    if (sliderRef.current) sliderRef.current.style.pointerEvents = 'none';
    setTimeout(() => {
      if (sliderRef.current) sliderRef.current.style.pointerEvents = 'all';
    }, page_transition);
  };

  const handleSlideMove = (forward: boolean) => {
    disableHoverEffect();
    setCurrentPage(currentPage + (forward ? 1 : -1));

    if (sliderRef.current)
      sliderRef.current.style.transform = `translate3D(-${(currentPage + (forward ? 1 : -1)) * scrollSize
        }px, 0, 0)`;
  };

  const handleMouseOver = (id: number) => {
    if (id % visible_slides === 1) setTransformValue('0%'); // left
    if (id % visible_slides === 0) setTransformValue(`-${zoom_factor}%`); // right
  };

  const handleMouseOut = () => {
    setTransformValue(`-${zoom_factor / 2}%`);
  };

  const assignSlideClass = (index: number, visibleSlides: number) => {
    const classes = ['right', 'left'];
    return classes[index % visibleSlides] || '';
  };

  return (
    <StyledSliderWrapper zoom_factor={zoom_factor} visible_slides={visible_slides}>
      <StyledSlider
        visible_slides={visible_slides}
        transform_value={transformValue}
        zoom_factor={zoom_factor}
        slide_margin={slide_margin}
        page_transition={page_transition}
        ref={sliderRef}
      >
        {children.map((child: any, i: any) => (
          <SliderItem
            key={i}
            slide_margin={slide_margin}
            visible_slides={visible_slides}
            zoom_factor={zoom_factor}
            slideClass={assignSlideClass(i + 1, visible_slides)}
            id={i + 1}
            callback={handleMouseOver}
            callbackOut={handleMouseOut}
          >
            {child}
          </SliderItem>
        ))}
      </StyledSlider>
      {currentPage > 0 && (
        <div className='button-wrapper back'>
          <button className='button back' onClick={() => handleSlideMove(false)}>
            &#8249;
          </button>
        </div>
      )}
      {currentPage !== totalPages && (
        <div className='button-wrapper forward'>
          <button className='button forward' onClick={() => handleSlideMove(true)}>
            &#8250;
          </button>
        </div>
      )}
    </StyledSliderWrapper>
  );
};

export default Slider;

