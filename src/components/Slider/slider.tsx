import React, { useState, useRef, useEffect } from 'react';
import './Slider.scss';

type SliderType = 'Continuous' | 'Discreet';
type SliderSubtype = 'Single' | 'Range';
type HandleSize = 'Size_24' | 'Size_32';

export interface SliderProps {
  type: SliderType;
  subtype: SliderSubtype;
  numberOfSteps?: number;
  handleSize: HandleSize;
  onChange: (value: number | [number, number]) => void;
}

const Slider: React.FC<SliderProps> = ({ type, subtype, numberOfSteps = 10, handleSize, onChange }) => {
  const [value, setValue] = useState<number | [number, number]>(subtype === 'Single' ? 0 : [0, 10]);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [draggingHandleIndex, setDraggingHandleIndex] = useState<number | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (event: React.MouseEvent | React.TouchEvent, index: number) => {
    setIsDragging(true);
    setDraggingHandleIndex(index);
    event.preventDefault();
  };

  const handleDrag = (event: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    let clientX;
    if (event.type === 'mousemove') {
      clientX = (event as MouseEvent).clientX;
    } else {
      clientX = (event as TouchEvent).touches[0].clientX;
    }

    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newPosition = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const percentage = (newPosition / rect.width) * 100;

      if (subtype === 'Single') {
        setValue(percentage);
        onChange(percentage);
      } else if (draggingHandleIndex !== null) {
        const newValues = [...(value as [number, number])] as [number, number];
        newValues[draggingHandleIndex] = percentage;

        // Ensure handles do not cross each other
        if (newValues[0] > newValues[1]) {
          if (draggingHandleIndex === 0) {
            newValues[0] = newValues[1];
          } else {
            newValues[1] = newValues[0];
          }
        }

        setValue(newValues);
        onChange(newValues);
      }
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDraggingHandleIndex(null);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('touchmove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
      document.addEventListener('touchend', handleDragEnd);
    } else {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('touchmove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
      document.removeEventListener('touchend', handleDragEnd);
    };
  }, [isDragging]);

  const handleMouseEnter = () => {
    // Handle hover state
  };

  const handleMouseLeave = () => {
    // Handle leave state
  };

  const renderHandle = () => {
    const handleClass = `slider-handle ${handleSize === 'Size_32' ? 'handle-size-32' : ''}`;

    if (subtype === 'Single') {
      return (
        <div
          className={handleClass}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseDown={(e) => handleDragStart(e, 0)}
          onTouchStart={(e) => handleDragStart(e, 0)}
          style={{ left: `${value as number}%` }}
        />
      );
    } else {
      return (
        <>
          <div
            className={handleClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={(e) => handleDragStart(e, 0)}
            onTouchStart={(e) => handleDragStart(e, 0)}
            style={{ left: `${(value as [number, number])[0]}%` }}
          />
          <div
            className={handleClass}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={(e) => handleDragStart(e, 1)}
            onTouchStart={(e) => handleDragStart(e, 1)}
            style={{ left: `${(value as [number, number])[1]}%` }}
          />
        </>
      );
    }
  };

  return (
    <div className="slider" ref={sliderRef}>
      <div className="slider-track"></div>
      {renderHandle()}
    </div>
  );
};

export default Slider;
