import { FC, ReactElement } from "react";
import { IIconProps } from "../types";


export const DoubleBackArrowIcon: FC<IIconProps> = (props): ReactElement => {

    const { fill, height, width } = props;

    return (
        <svg fill={fill} width={width} height={height} viewBox="0 0 24 24">
            <path d="M21,11H9.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H21a1,1,0,0,0,0-2ZM3,3A1,1,0,0,0,2,4V20a1,1,0,0,0,2,0V4A1,1,0,0,0,3,3Z"/>
        </svg>
    );
}

