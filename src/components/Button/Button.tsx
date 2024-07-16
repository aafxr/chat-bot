import React, {ButtonHTMLAttributes} from "react";
import clsx from "clsx";

import Loader from "../Loader/Loader";

import './Button.css'


interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean
}

/**
 * Компонент кнопка
 * @kind component
 * @function
 * @param className css class
 * @param active boolean flag добавляет визулаьный вид как disabled-атрибут у native button
 * @param loading проп добавляет спинер загрузки
 * @param props other props
 * @param children child react elements
 * @returns {JSX.Element}
 * @category UI-Components
 * @name Button
 */
export default function Button({
                                   children,
                                   className,
                                   loading = false,
                                   ...props
                               }: ButtonPropsType) {

    return (
        <button className={clsx('button', className)} {...props}>
            {loading && <Loader />}
            {children || ''}
        </button>
    )
}