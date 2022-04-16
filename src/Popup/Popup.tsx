import React, { RefObject, useLayoutEffect, useState } from "react";
import "./popup.css";
import { createPortal } from "react-dom";

interface PopupProps {
   /**
    * Pick position around target
    */
   position?: "left" | "right" | "top" | "bottom";
   /**
    * Target of popup
    */
   target: RefObject<HTMLElement>;
   children: React.ReactNode;
   className?: string;
}
interface IPopupStyle {
   left?: number;
   right?: number;
   top?: number;
   bottom?: number;
   height?: number;
   width: number;
}
/**
 * Popup UI component
 */
export const Popup = ({
   position = "bottom",
   target,
   className,
   ...props
}: PopupProps) => {
   const [popupStyle, setPopupStyle] = useState<IPopupStyle>();
   useLayoutEffect(() => {
      let rect;
      if (target && target.current) {
         rect = target.current.getBoundingClientRect();
      } else {
         throw new Error("Popup needs target to set up");
      }
      setPopupStyle({
         top: rect.top + (position === "bottom" ? rect.height : 0),
         left: rect.left,
         width: rect.width,
      });
   }, [position, target]); // unlikely be changed deps
   return createPortal(
      <>
         {popupStyle && (
            <div
               tabIndex={0}
               {...props}
               className={["c-Popup", className || ""].join(" ")}
               style={popupStyle}
            >
               {props.children}
            </div>
         )}
      </>,
      document.body,
   );
};
