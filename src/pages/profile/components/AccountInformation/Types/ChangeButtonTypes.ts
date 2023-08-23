import { InformationDialogPropTypes } from "./InformationDialogPropTypes"

export interface changeButtonPropTypes {
    setInformation: React.Dispatch<React.SetStateAction<string>>,
    Dialog: (props: InformationDialogPropTypes) => JSX.Element
}
