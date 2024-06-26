import { FC, ReactElement } from "react";
import { IIconProps } from "../types";


export const ErrorIcon: FC<IIconProps> = (props): ReactElement => {

    const { fill, height, width } = props;

    return (
        <svg fill={fill} width={width} height={height} viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet">
            <path className="clr-i-solid clr-i-solid-path-1" d="M18,2.1a16,16,0,1,0,16,16A16,16,0,0,0,18,2.1ZM16.6,8.8a1.4,1.4,0,0,1,2.8,0v12a1.4,1.4,0,0,1-2.8,0ZM18,28.6a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,18,28.6Z"></path>
            <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
        </svg>
    );
}

