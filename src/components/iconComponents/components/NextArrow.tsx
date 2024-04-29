import { FC, ReactElement } from "react";
import { IIconProps } from "../types";


export const NextArrow: FC<IIconProps> = (props): ReactElement => {

    const { fill, height, width } = props;

    return (
        <svg fill={fill} width={width} height={height} viewBox="0 0 24 24">
            <path d="M15.54,11.29,9.88,5.64a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41l4.95,5L8.46,17a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.3,1,1,0,0,0,.71-.3l5.66-5.65A1,1,0,0,0,15.54,11.29Z"/>
        </svg>
    );
}

