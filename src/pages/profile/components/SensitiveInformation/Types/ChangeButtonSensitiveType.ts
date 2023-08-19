import { InformationDialogPropTypes } from "./InformationDialogPropTypes"

export interface changeButtonSensitivePropTypes {
    setInformation?: React.Dispatch<React.SetStateAction<string>>,
    Dialog: (props: InformationDialogPropTypes) => JSX.Element
}
