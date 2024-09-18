import { ChangeEventHandler, ReactElement } from "react";
import { ComponentAttributes } from "../atrributes";

type UploadFilesAttributes = ComponentAttributes & {
    accept?: string,
    multiple?: boolean,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    id: string,
    children?: ReactElement,
}

export function UploadFiles({className, accept, multiple, onChange, id, children, hidden}: UploadFilesAttributes) {
    return (
        <div className={className} hidden={hidden}>
            <input type="file" accept={accept} multiple={multiple} onChange={onChange} id={id} hidden/>
            <label htmlFor={id}>{children}</label>
        </div>
    )
}