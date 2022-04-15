import React, { Ref, useEffect, useState } from "react";
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
   const defaultRect = {
      top: 50,
      left: 0,
      height: 150,
      width: 150,
   };
   useEffect(() => {
      const rect = target?.current?.getBoundingClientRect() || defaultRect;
      setPopupStyle({
         top: rect.top + (position === "bottom" ? rect.height || 150 : 0),
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
               {" "}
               {props.children}
            </div>
         )}
      </>,
      document.body,
   );
};
