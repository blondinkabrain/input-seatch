import React, { Ref, useLayoutEffect, useState } from "react";
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
   target: Ref<ReactDOM.Container>;
   children: React.ReactNode;
   className?: string;
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
   const [popupStyle, setPopupStyle] = useState();
   useLayoutEffect(() => {
      let rect;
      try {
         rect = target.current?.getBoundingClientRect();
      } catch (e) {
         throw new Error("Popup needs target to set up");
      }

      setPopupStyle({
         top: rect.top + (position === "bottom" ? rect.height : 0),
         left: rect.left,
         width: rect.width,
      });
   }, []);
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
